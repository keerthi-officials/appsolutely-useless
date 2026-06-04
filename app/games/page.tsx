"use client";

import { GameCard } from "@/components/game-card";
import { Input } from "@/components/ui/input";
import { Game, games } from "@/lib/game-data";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function GamePage() {
  const [filteredGames, setFilteredGames] = useState<Game[]>(games);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let filtered = games;

    if (searchTerm) {
      filtered = filtered.filter(
        (game) =>
          game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          game.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredGames(filtered);
  }, [searchTerm]);

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">🎮 Useless Games Collection</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Carefully curated pointless entertainment for your viewing pleasure
        </p>
      </div>

      <div className="mb-8 space-y-4">
        <div className="relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Search for useless games..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {filteredGames.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2">No games found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGames.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}

      <div className="mt-12 text-center text-muted-foreground">
        <p>
          Showing {filteredGames.length} of {games.length} incredibly useless
          games
        </p>
      </div>
    </div>
  );
}
