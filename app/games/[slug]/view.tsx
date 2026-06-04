"use client";
import { PunchSimulatorGame } from "@/components/games/punch-simulator";
import { SoupOrSoapGame } from "@/components/games/soup-or-soap";
import { WaitingGame } from "@/components/games/waiting-game";
import { Button } from "@/components/ui/button";
import { getGameById } from "@/lib/game-data";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface GamePageClientProps {
  slug: string;
}

export function GamePageClient({ slug }: GamePageClientProps) {
  const router = useRouter();
  const [startTime, setStartTime] = useState<number>(0);
  const [gameKey, setGameKey] = useState<number>(0);

  const game = getGameById(slug);

  useEffect(() => {
    if (!game) return;

    const now = Date.now();
    setStartTime(now);

    return () => {
      const timeSpent = Math.floor((Date.now() - now) / 1000);
      // store data
    };
  }, [game, gameKey]);

  const resetGame = () => {
    setGameKey((prev) => prev + 1);
    setStartTime(Date.now());
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
      default:
        return <div>Game component not found</div>;
    }
  };

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
      <div className="game-container">{renderGame()}</div>
    </div>
  );
}
