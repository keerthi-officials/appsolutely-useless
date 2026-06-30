"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { incrementTaps } from "@/lib/storage";
import { playSound } from "@/lib/sounds";

interface Medal {
  name: string;
  emoji: string;
  description: string;
  timeRequired: number;
}

const medals: Medal[] = [
  {
    name: "Impatient",
    emoji: "😤",
    description: "Lasted less than 10 seconds",
    timeRequired: 0,
  },
  {
    name: "Restless",
    emoji: "😅",
    description: "Made it to 10 seconds",
    timeRequired: 10,
  },
  {
    name: "Patient Grasshopper",
    emoji: "🦗",
    description: "Waited 30 seconds",
    timeRequired: 30,
  },
  {
    name: "Zen Apprentice",
    emoji: "🧘",
    description: "Meditated for 1 minute",
    timeRequired: 60,
  },
  {
    name: "Boredom Warrior",
    emoji: "⚔️",
    description: "Survived 2 minutes",
    timeRequired: 120,
  },
  {
    name: "Time Waster",
    emoji: "⏰",
    description: "Wasted 5 minutes",
    timeRequired: 300,
  },
  {
    name: "Patience Master",
    emoji: "🏆",
    description: "Endured 10 minutes",
    timeRequired: 600,
  },
  {
    name: "Boredom God",
    emoji: "👑",
    description: "Transcended 15 minutes",
    timeRequired: 900,
  },
  {
    name: "Legendary Waiter",
    emoji: "✨",
    description: "Achieved 30 minutes",
    timeRequired: 1800,
  },
  {
    name: "Time Lord",
    emoji: "🌟",
    description: "Conquered 1 hour",
    timeRequired: 3600,
  },
];

export function WaitingGame() {
  const [isWaiting, setIsWaiting] = useState(false);
  const [timeWaited, setTimeWaited] = useState(0);
  const [currentMedal, setCurrentMedal] = useState<Medal | null>(null);
  const [earnedMedals, setEarnedMedals] = useState<Medal[]>([]);
  const [motivationalMessage, setMotivationalMessage] = useState("");
  const [bestTime, setBestTime] = useState(() => {
    if (typeof window === "undefined") return 0;

    const saved = localStorage.getItem("waiting-game-best");
    return saved ? parseInt(saved, 10) : 0;
  });

  const intervalRef = useRef<NodeJS.Timeout>(setInterval(() => {}));
  const startTimeRef = useRef<number>(0);

  const updateMotivationalMessage = (seconds: number) => {
    const messages = [
      "You're doing great! Keep waiting!",
      "This is definitely a productive use of time.",
      "The art of doing nothing is underrated.",
      "You're building character through boredom.",
      "Patience is a virtue... or so they say.",
      "Think of all the things you could be doing instead!",
      "This is meditation for the digital age.",
      "You're becoming one with the void.",
      "Time is an illusion anyway.",
      "You're winning at not winning!",
      "The longer you wait, the more impressive it becomes.",
      "You're setting a personal record in pointlessness!",
    ];

    if (seconds % 15 === 0 && seconds > 0) {
      setMotivationalMessage(
        messages[Math.floor(Math.random() * messages.length)],
      );
    }
  };

  useEffect(() => {
    if (isWaiting) {
      intervalRef.current = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setTimeWaited(elapsed);

        const availableMedal = medals
          .filter((medal) => elapsed >= medal.timeRequired)
          .pop();

        if (availableMedal && availableMedal !== currentMedal) {
          setCurrentMedal(availableMedal);
          if (!earnedMedals.includes(availableMedal)) {
            setEarnedMedals((prev) => [...prev, availableMedal]);
            playSound("success");
          }
        }

        updateMotivationalMessage(elapsed);
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isWaiting, currentMedal, earnedMedals]);

  const startWaiting = () => {
    incrementTaps();
    setIsWaiting(true);
    setTimeWaited(0);
    startTimeRef.current = Date.now();
    setMotivationalMessage("The waiting begins... How long can you last?");
    playSound("click");
  };

  const stopWaiting = () => {
    incrementTaps();
    setIsWaiting(false);
    if (timeWaited > bestTime) {
      setBestTime(timeWaited);
      localStorage.setItem("waiting-game-best", timeWaited.toString());
    }

    playSound("fail");
  };

  const reset = () => {
    incrementTaps();
    setIsWaiting(false);
    setTimeWaited(0);
    setCurrentMedal(null);
    setMotivationalMessage("");
  };

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const min = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hrs > 0) {
      return `${hrs}h ${min}m ${secs}s`;
    } else if (min > 0) {
      return `${min}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getWaitingEmoji = () => {
    if (timeWaited < 30) return "😐";
    if (timeWaited < 60) return "😑";
    if (timeWaited < 120) return "😴";
    if (timeWaited < 300) return "🥱";
    if (timeWaited < 600) return "😵‍💫";
    return "💀";
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>⏰ How Long Can You Wait?</CardTitle>
        <p className="text-sm text-muted-foreground">
          The ultimate test of patience and boredom tolerance
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isWaiting && timeWaited === 0 ? (
          <div className="text-center space-y-4">
            <div className="text-6xl">⏰</div>
            <div className="text-lg">Ready to test your patience?</div>
            <div className="text-sm text-muted-foreground">
              See how long you can stay on this page without doing anything else
            </div>
            <Button onClick={startWaiting} size="lg" className="w-full">
              Start Waiting
            </Button>
          </div>
        ) : (
          <>
            <div className="text-center space-y-2">
              <div className="text-6xl">{getWaitingEmoji()}</div>
              <div className="text-4xl font-bold font-mono">
                {formatTime(timeWaited)}
              </div>
              <div className="text-sm text-muted-foreground">
                {isWaiting ? "Currently waiting..." : "Final time"}
              </div>
            </div>
            {currentMedal && (
              <div className="text-center p-4 bg-linear-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
                <div className="text-3xl mb-2">{currentMedal.emoji}</div>
                <div className="font-semibold">{currentMedal.name}</div>
                <div className="text-sm text-muted-foreground">
                  {currentMedal.description}
                </div>
              </div>
            )}

            {motivationalMessage && (
              <div className="text-center p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-sm italic">{motivationalMessage}</div>
              </div>
            )}

            <div className="space-y-3">
              {isWaiting ? (
                <Button
                  onClick={stopWaiting}
                  variant="destructive"
                  className="w-full"
                >
                  I Give Up! (Stop Waiting)
                </Button>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Button onClick={startWaiting} className="w-full">
                    Wait Again
                  </Button>
                  <Button onClick={reset} variant="outline" className="w-full">
                    Reset
                  </Button>
                </div>
              )}
            </div>
          </>
        )}

        {(bestTime > 0 || timeWaited > 0) && (
          <div className="grid grid-cols-2 gap-4 text-center">
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Current</div>
              <div className="font-bold">{formatTime(timeWaited)}</div>
            </div>
            <div className="p-3 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground">Best</div>
              <div className="font-bold">{formatTime(bestTime)}</div>
            </div>
          </div>
        )}

        {earnedMedals.length > 0 && (
          <div className="space-y-2">
            <div className="text-sm font-medium">🏆 Medals Earned:</div>
            <div className="grid grid-cols-2 gap-2">
              {earnedMedals.map((medal, index) => (
                <div
                  key={index}
                  className="p-2 bg-linear-to-r from-yellow-100 to-orange-100 border border-yellow-300 rounded text-center"
                >
                  <div className="text-lg">{medal.emoji}</div>
                  <div className="text-xs font-medium">{medal.name}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {isWaiting && currentMedal && (
          <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="text-sm text-muted-foreground">Next Medal:</div>
            {(() => {
              const nextMedal = medals.find(
                (medal) => medal.timeRequired > timeWaited,
              );
              if (nextMedal) {
                const timeLeft = nextMedal.timeRequired - timeWaited;
                return (
                  <div>
                    <div className="font-medium">
                      {nextMedal.emoji} {nextMedal.name}
                    </div>
                    <div className="text-xs">in {formatTime(timeLeft)}</div>
                  </div>
                );
              } else {
                return (
                  <div className="text-sm">You&apos;ve earned all medals! 🎉</div>
                );
              }
            })()}
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>📱 Stay on this page to keep the timer running</p>
          <p>⏰ Switching tabs or apps will pause your progress</p>
          <p>🏆 Earn medals for reaching time milestones</p>
        </div>
      </CardContent>
    </Card>
  );
}
