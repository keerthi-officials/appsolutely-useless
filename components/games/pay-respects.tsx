"use client";

import { incrementTaps } from "@/lib/storage";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useEffect, useState } from "react";

const RESPECT_STORAGE_KEY = "global-respect-count";

export function PayRespectsGame() {
  const [personalRespects, setPersonalRespects] = useState(0);
  const [globalRespects, setGlobalRespects] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(RESPECT_STORAGE_KEY);
      setGlobalRespects(stored ? parseInt(stored, 10) : 0);
    }
  }, []);

  const saveGlobalRespects = (count: number) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(RESPECT_STORAGE_KEY, count.toString());
    }
  };

  const pressF = () => {
    incrementTaps();

    const newPersonal = personalRespects + 1;
    const newGlobal = globalRespects + 1;

    setPersonalRespects(newPersonal);
    setGlobalRespects(newGlobal);
    saveGlobalRespects(newGlobal);

    setIsAnimating(true);
    setShowRipple(true);

    setTimeout(() => {
      setIsAnimating(false);
      setShowRipple(false);
    }, 600);
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
          <div className="space-y-2">
            <div className="text-sm font-medium">🏆 Respect Achievements:</div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {personalRespects >= 1 && (
                <div className="p-2 bg-blue-100 border border-blue-300 rounded text-center">
                  First F!
                </div>
              )}
              {personalRespects >= 10 && (
                <div className="p-2 bg-green-100 border border-green-300 rounded text-center">
                  Respectful
                </div>
              )}
              {personalRespects >= 25 && (
                <div className="p-2 bg-purple-100 border border-purple-300 rounded text-center">
                  Honor Guard
                </div>
              )}
              {personalRespects >= 50 && (
                <div className="p-2 bg-orange-100 border border-orange-300 rounded text-center">
                  Respect Master
                </div>
              )}
              {personalRespects >= 100 && (
                <div className="p-2 bg-yellow-100 border border-yellow-300 rounded text-center">
                  F Legend
                </div>
              )}
              {globalRespects >= 1000 && (
                <div className="p-2 bg-red-100 border border-red-300 rounded text-center">
                  Global Impact
                </div>
              )}
            </div>
          </div>
        )}

        <div className="text-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
          <div className="text-sm font-medium mb-2">
            Currently Paying Respects To:
          </div>
          <div className="text-xs text-muted-foreground space-y-1">
            <div>• The time you spent clicking this button</div>
            <div>• Your productivity that died today</div>
            <div>• The meaning of pressing F</div>
            <div>• Everything and nothing simultaneously</div>
          </div>
        </div>

        {personalRespects > 0 && (
          <Button variant="outline" onClick={reset} className="w-full">
            🔄 Reset Personal Respects
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
