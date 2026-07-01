"use client";

import { incrementTaps } from "@/lib/storage";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import { playSound } from "@/lib/sounds";

export function PayRespectsGame() {
  const [personalRespects, setPersonalRespects] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  const pressF = () => {
    incrementTaps();

    setPersonalRespects((prev) => prev + 1);

    setIsAnimating(true);
    setShowRipple(true);

    setTimeout(() => {
      setIsAnimating(false);
      setShowRipple(false);
    }, 600);

    playSound("respect");
  };

  const reset = () => {
    incrementTaps();
    setPersonalRespects(0);
  };

  const getRespectLevel = (count: number) => {
    if (count === 0)
      return { level: "Disrespectful", emoji: "😐", color: "text-gray-600" };
    if (count < 10)
      return { level: "Novice Respecter", emoji: "🙏", color: "text-blue-600" };
    if (count < 25)
      return {
        level: "Respectful Citizen",
        emoji: "🎖️",
        color: "text-green-600",
      };
    if (count < 50)
      return { level: "Honor Guard", emoji: "⭐", color: "text-purple-600" };
    if (count < 100)
      return {
        level: "Respect Warrior",
        emoji: "🏆",
        color: "text-orange-600",
      };
    return {
      level: "Legendary Respecter",
      emoji: "👑",
      color: "text-yellow-600",
    };
  };

  const respectLevel = getRespectLevel(personalRespects);

  const getMotivationalMessage = () => {
    if (personalRespects === 0)
      return "Press F to start paying respects to... something.";
    if (personalRespects < 5)
      return "Your respectfulness is growing. F for effort!";
    if (personalRespects < 15) return "The respect is flowing through you.";
    if (personalRespects < 30)
      return "You're becoming quite the respectful individual.";
    if (personalRespects < 60) return "Your respect levels are off the charts!";
    return "You are the embodiment of respect itself. F for legendary status!";
  };

  const achievements = [
    { threshold: 1, label: "First F" },
    { threshold: 10, label: "Respectful" },
    { threshold: 25, label: "Honor Guard" },
    { threshold: 50, label: "Respect Master" },
    { threshold: 100, label: "F Legend" },
  ];

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🪦 F to Pay Respects</CardTitle>
        <p className="text-sm text-muted-foreground">
          Join millions of people in pressing F to pay respects to...
          everything.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center relative">
          <Button
            onClick={pressF}
            className={`w-32 h-32 rounded-full text-6xl font-bold transition-all duration-300 ${
              isAnimating ? "scale-110" : "scale-100"
            } bg-linear-to-br from-gray-700 to-gray-900 hover:from-gray-600 shadow-xl relative overflow-hidden`}
          >
            F
            {showRipple && (
              <div className="absolute inset-0 bg-white/30 animate-ping rounded-full" />
            )}
          </Button>

          {isAnimating && (
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4 animate-bounce">
              <div className="text-2xl">🙏</div>
            </div>
          )}
        </div>

        <div className="text-center space-y-2">
          <div className="text-4xl font-bold">
            {personalRespects.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Personal Respect Paid
          </div>

          <div className={`text-lg font-semibold ${respectLevel.color}`}>
            {respectLevel.emoji} {respectLevel.level}
          </div>
        </div>

        <div className="p-4 bg-linear-to-r from-gray-100 to-gray-200 border border-gray-300 rounded-lg text-center">
          <p className="text-sm text-center italic">
            {getMotivationalMessage()}
          </p>
        </div>

        {personalRespects > 0 && (
          <div>
            <div className="text-sm font-medium mb-2">
              🏆 Respect achievements:
            </div>
            <div className="flex flex-wrap gap-2">
              {achievements
                .filter((a) => personalRespects >= a.threshold)
                .map((a) => (
                  <span
                    key={a.label}
                    className="text-xs px-2 py-1 border rounded-full bg-muted"
                  >
                    {a.label}
                  </span>
                ))}
            </div>
          </div>
        )}

        {personalRespects > 0 && (
          <Button variant="outline" onClick={reset} className="w-full">
            🔄 Reset Personal Respects
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
