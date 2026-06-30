# 🥔 Appsolutely Useless

A website where you can play 14 very pointless games. This app exists purely for chaos and fun. Nothing else.

Built with Next.js. Includes an AI-powered "Uselessness Predictor" that uses real AI to scientifically* rate how useless anything is.

\* not really scientific.

## Games

| Game                                     | What it does                                  |
| ---------------------------------------- | --------------------------------------------- |
| 🤖 AI Predicts Uselessness               | AI rates how useless anything is, 0-100       |
| 🍲 Is it Soup or Soap?                   | Tell soup from soap in blurry images          |
| 👊 Punch Yourself Simulator              | Virtually punch yourself, dramatically        |
| 🐔 Chicken or CEO?                       | Guess if a quote came from a chicken or a CEO |
| 🔘 The Button That Does Nothing          | A button. It counts. That's it.               |
| 😸 Pet the Invisible Cat                 | Pet nothing, watch the purr meter rise        |
| 🍌 Guess the Banana's Mood               | This banana has feelings                      |
| 🪦 F to Pay Respects                     | Press F for the global respect counter        |
| 🦟 Virtual Mosquito Slap                 | Hunt the mosquito before it ecapes            |
| 💩 Daily Shitpost Generator              | Generate maximally random posts               |
| 😱 Tap to Scream                         | Increaingly absurd screaming                  |
| ⌛ How Long Can You Wait?                | Do nothing. See how long you last.            |
| 🥠 Fortune Cookie That Tells You to Quit | Brutally honest life advice                   |
| 🪨 Buy a Rock NFT (Fake)                 | Mint worthless digital rocks                  |

## Tech Stack

- Next.js (App Router)
- Typescript
- Tailwindcss CSS + shadcn/ui components
- lucide-react for icons
- Hack Club AI for the Uselessness Predictor

## Getting started

To run the site in local, follow these steps

### 1. Install

```bash
npm install
```

### 2. Add your Hack Club AI key

The Uselessness Predictor needs an API key. It's free.

1. Sign in at [ai.hackclub.com](https://ai.hackclub.com) with your Hack Club account.
2. Create an API key in the dashboard.
3. Make a `.env.local` file in the project root:

```bash
HACKCLUB_AI_KEY=your_key_here
```

The key is read **server-side only** (in `app/api/uselessness/route.ts`), so it never ships to the browser. Don't paste it into any client component.

### 3. Run it

```bash
npm run dev
```

Open [http://localhost:300](http://localhost:300).

> The other games don't need a key. Only the Uselessness Predictor does. If you skip the key, everything else still works.

## Product structure

```
app/
  page.tsx                  # Home page
  games/                    # Games list + individual games
  random/                   # Sends you to a random game
  api/
    uselessness/route.ts    # Server route — holds the AI key, returns a 0–100 score
components/
  games/                    # has the game components
  ui/                       # shadcn/ui components
lib/
  game-data.ts                  # Game registry (id, title, category, etc.)
  sounds.ts                 # Sound effects
  storage.ts                # Tap counting / local state
```
