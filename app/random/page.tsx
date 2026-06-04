"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getRandomGame } from "@/lib/game-data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RandomPage() {
  const router = useRouter();

  useEffect(() => {
    const randomGame = getRandomGame();
    const timer = setTimeout(() => {
      router.push(`/games/${randomGame.id}`);
    }, 2000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
      <Card className="max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle>🎲 Random Game Loading...</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="text-6xl animate-spin">🎮</div>
          <div className="text-lg">
            Selecting a perfectly useless game for you...
          </div>
          <div className="text-sm text-muted-foreground">
            Prepare for maximum pointlessness
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
