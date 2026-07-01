"use client";

import { useState } from "react";
import { Search, Shuffle } from "lucide-react";
import { GameCard } from "@/components/game-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { games } from "@/lib/game-data";
import { useRouter } from "next/navigation";
import { getRandomGame } from "@/lib/game-data";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const filteredGames = games.filter((game) => {
    if (!searchTerm) return true;
    const query = searchTerm.toLowerCase();
    return (
      game.title.toLowerCase().includes(query) ||
      game.description.toLowerCase().includes(query)
    );
  });

  const randomGen = () => {
    const randomGame = getRandomGame();
    const timer = setTimeout(() => {
      router.push(`/${randomGame.id}`);
    }, 200);
    return () => clearTimeout(timer);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <header className="mb-8 text-center">
        <span className="text-6xl">🥔</span>
        <h1 className="mt-4 text-4xl font-bold text-[#2a2929] md:text-6xl">
          Appsolutely Useless
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          A collection of pointless mini-games. No purpose, no point, just
          chaos.
        </p>
      </header>

      <div className="mb-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search for useless games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button
          size="lg"
          variant="outline"
          onClick={randomGen}
          className="flex items-center gap-2"
        >
          <Shuffle className="h-5 w-5" />
          Random Game
        </Button>
      </div>

      {filteredGames.length === 0 ? (
        <div className="py-12 text-center">
          <div className="mb-4 text-6xl">🔍</div>
          <h3 className="mb-2 text-xl font-semibold">No games found</h3>
          <p className="text-muted-foreground">Try a different search term.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      <p className="mt-12 text-center text-sm text-muted-foreground">
        Showing {filteredGames.length} of {games.length} games.
      </p>
    </div>
  );
}
