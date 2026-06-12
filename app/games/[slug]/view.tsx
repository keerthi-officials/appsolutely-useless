"use client";
import { BananaMoodGame } from "@/components/games/banana-mood";
import { ChickenOrCeoGame } from "@/components/games/chicken-or-ceo";
import { FortuneCookieGame } from "@/components/games/fortune-cookie";
import { PunchSimulatorGame } from "@/components/games/punch-simulator";
import { SoupOrSoapGame } from "@/components/games/soup-or-soap";
import { TapToScreamGame } from "@/components/games/tap-to-scream";
import { UselessButtonGame } from "@/components/games/useless-button";
import { WaitingGame } from "@/components/games/waiting-game";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { getGameById } from "@/lib/game-data";
import { updateGameStats } from "@/lib/storage";
import { ArrowLeft, RotateCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GamePageClientProps {
  slug: string;
}

export function GamePageClient({ slug }: GamePageClientProps) {
  const router = useRouter();
  const [gameKey, setGameKey] = useState<number>(0);

  const game = getGameById(slug);

  useEffect(() => {
    if (!game) return;

    const now = Date.now();

    updateGameStats(game.id, {
      timesPlayed: 1,
      timeSpent: 0,
    });

    return () => {
      const timeSpent = Math.floor((Date.now() - now) / 1000);
      updateGameStats(game.id, {
        timesPlayed: 0,
        timeSpent,
      });
    };
  }, [game, gameKey]);

  const resetGame = () => {
    setGameKey((prev) => prev + 1);
  };

  if (!game) {
    return (
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8 text-center">
        <div className="text-6xl mb-4">🤔</div>
        <h1 className="text-2xl font-bold mb-4">Game not found</h1>
        <p className="text-muted-foreground mb-6">
          This game doesn't exist. Maybe it was too useless even for us?
        </p>
        <Button onClick={() => router.push("/games")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>
    );
  }

  const renderGame = () => {
    switch (game.id) {
      case "soup-or-soap":
        return <SoupOrSoapGame key={gameKey} />;
      case "punch-simulator":
        return <PunchSimulatorGame key={gameKey} />;
      case "waiting-game":
        return <WaitingGame key={gameKey} />;
      case "chicken-or-ceo":
        return <ChickenOrCeoGame key={gameKey} />;
      case "banana-mood":
        return <BananaMoodGame key={gameKey} />;
      case "tap-to-scream":
        return <TapToScreamGame key={gameKey} />;
      case "fortune-cookie":
        return <FortuneCookieGame key={gameKey} />;
      case "useless-button":
        return <UselessButtonGame key={gameKey} />;
      default:
        return <div>Game component not found</div>;
    }
  };

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => router.push("/games")}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{game.emoji}</span>
                  <span>{game.title}</span>
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1">
                  {game.description}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={resetGame}
              className="flex items-center space-x-2"
            >
              <RotateCw className="w-4 h-4" />
              <span>Reset</span>
            </Button>
          </div>
        </CardHeader>
      </Card>
      <div className="game-container">{renderGame()}</div>
    </div>
  );
}
