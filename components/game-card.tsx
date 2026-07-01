"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, Play } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Game } from "@/lib/game-data";
import {
  getStats,
  addToFavorites,
  removeFromFavorites,
  UserStats,
  DEFAULT_STATS,
} from "@/lib/storage";

interface GameCardProps {
  game: Game;
  showFavoriteButton?: boolean;
}

export function GameCard({ game, showFavoriteButton = true }: GameCardProps) {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStats(getStats());
    setLoaded(true);
  }, []);

  const isFavorite = stats.favorites.includes(game.id);
  const timesPlayed = stats.gameStats[game.id]?.timesPlayed || 0;

  function toggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();

    if (isFavorite) {
      removeFromFavorites(game.id);
    } else {
      addToFavorites(game.id);
    }
    setStats(getStats());
  }

  function getCategoryColor(category: string) {
    if (category === "pointless") return "bg-purple-100 text-purple-800";
    if (category === "annoying") return "bg-orange-100 text-orange-800";
    if (category === "weird") return "bg-teal-100 text-teal-800";
    if (category === "confusing") return "bg-pink-100 text-pink-800";
    return "bg-gray-100 text-gray-800";
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] relative overflow-hidden">
      <Link href={`/${game.id}`}>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-2xl">{game.emoji}</span>
                <Badge className={getCategoryColor(game.category)}>
                  {game.category}
                </Badge>
              </div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {game.title}
              </CardTitle>
            </div>
            {showFavoriteButton && (
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleFavorite}
                className="p-2 h-auto"
              >
                <Heart
                  className={`w-4 h-4 ${
                    loaded && isFavorite
                      ? "fill-red-500 text-red-500"
                      : "text-gray-400"
                  }`}
                />
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="mb-3">{game.description}</CardDescription>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>⏱️ {game.estimatedTime}</span>
            {loaded && timesPlayed > 0 && <span>🎮 Played {timesPlayed}x</span>}
          </div>
          <Button className="w-full mt-3 group-hover:bg-primary/90 transition-colors">
            <Play className="w-4 h-4 mr-2" />
            Play Now
          </Button>
        </CardContent>
      </Link>
    </Card>
  );
}
