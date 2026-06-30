import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { thing } = await req.json();

    if (!thing || typeof thing !== "string") {
      return NextResponse.json({ error: "Missing input" }, { status: 400 });
    }

    const res = await fetch(
      "https://ai.hackclub.com/proxy/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.HACKCLUB_AI_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "qwen/qwen3-32b",
          messages: [
            {
              role: "system",
              content:
                "You rate how useless something is on a scale from 0 to 100. " +
                "0 means extremely useful and valuable to a person or to society. " +
                "100 means completely pointless, with no value at all. " +
                "Judge the real-world usefulness of whatever the user names " +
                "(an activity, object, habit, job, app, idea, etc.). " +
                "Reply with ONLY the integer score and nothing else.",
            },
            { role: "user", content: thing },
          ],
          temperature: 0.3,
          stream: false,
        }),
      },
    );

    if (!res.ok) {
      return NextResponse.json({ error: "AI request failed" }, { status: 502 });
    }

    const data = await res.json();
    const raw = data?.choices?.[0]?.message?.content ?? "";

    const match = String(raw).match(/\d+/);
    if (!match) {
      return NextResponse.json({ error: "No score returned" }, { status: 502 });
    }
    const score = Math.max(0, Math.min(100, parseInt(match[0], 10)));

    return NextResponse.json({ score });
  } catch {
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}
