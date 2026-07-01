"use client";

import { incrementTaps } from "@/lib/storage";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Volume2, VolumeX } from "lucide-react";
import { playSound } from "@/lib/sounds";

const screamTypes = [
  {
    emoji: "😱",
    name: "Classic Scream",
    description: "The timeless human scream",
  },
  { emoji: "🐐", name: "Goat Scream", description: "BAAAHHHHH!" },
  {
    emoji: "👶",
    name: "Baby Scream",
    description: "Ear-piercing infant wails",
  },
  { emoji: "🦅", name: "Eagle Scream", description: "SCREEEEEECH!" },
  { emoji: "🐷", name: "Pig Scream", description: "Squealing swine sounds" },
  { emoji: "🤖", name: "Robot Scream", description: "ERROR ERROR ERROR" },
  {
    emoji: "👻",
    name: "Ghost Scream",
    description: "Spooky supernatural wails",
  },
  { emoji: "🦖", name: "Dinosaur Scream", description: "ROAAAAAR!" },
];

const achievements = [
  { threshold: 1, label: "First Scream" },
  { threshold: 10, label: "Loud & Proud" },
  { threshold: 25, label: "Noise Maker" },
  { threshold: 50, label: "Scream Master" },
  { threshold: 100, label: "Legendary" },
];

export function TapToScreamGame() {
  const [screamCount, setScreamCount] = useState(0);
  const [currentScream, setCurrentScream] = useState<typeof screamTypes[0] | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const scream = () => {
    incrementTaps();

    const randomScream =
      screamTypes[Math.floor(Math.random() * screamTypes.length)];
    setCurrentScream(randomScream);
    setScreamCount((prev) => prev + 1);

    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 500);

    if (soundEnabled) {
      playSound("scream");
    }
  };

  const toggleSound = () => {
    incrementTaps();
    setSoundEnabled((prev) => !prev);
    playSound("click");
  };

  const reset = () => {
    incrementTaps();
    setScreamCount(0);
    setCurrentScream(null);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-between">
          <CardTitle>😱 Tap to Scream</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSound}
            className="p-2"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center space-y-4">
          {currentScream ? (
            <div
              className={`transition-all duration-500 ${isAnimating ? "scale-125 rotate-12" : "scale-100"}`}
            >
              <div className="text-8xl mb-2">{currentScream.emoji}</div>
              <div className="text-lg font-semibold">{currentScream.name}</div>
              <div className="text-sm text-muted-foreground">
                {currentScream.description}
              </div>
            </div>
          ) : (
            <div>
              <div className="text-8xl mb-2">🤐</div>
              <div className="text-lg">Ready to scream?</div>
            </div>
          )}

          <Button
            onClick={scream}
            size="lg"
            className={`w-32 h-32 rounded-full text-4xl transition-all duration-300 ${
              isAnimating ? "scale-110" : "scale-100"
            } bg-linear-to-br from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 shadow-lg`}
          >
            😱
          </Button>

          <div>
            <div className="text-4xl font-bold">{screamCount}</div>
            <div className="text-sm text-muted-foreground">Total Screams</div>
          </div>

          {screamCount > 0 && (
            <div className="flex flex-wrap gap-2 justify-center">
              {achievements
                .filter((a) => screamCount >= a.threshold)
                .map((a) => (
                  <span
                    key={a.label}
                    className="text-xs px-2 py-1 border rounded-full bg-muted"
                  >
                    {a.label}
                  </span>
                ))}
            </div>
          )}

          {screamCount > 0 && (
            <Button variant="outline" onClick={reset} className="w-full">
              🔄 Reset Scream Counter
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
