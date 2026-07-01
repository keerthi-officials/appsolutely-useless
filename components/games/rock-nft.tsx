"use client";

import { incrementTaps } from "@/lib/storage";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Coins, Gem, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { playSound } from "@/lib/sounds";

interface Rock {
  id: string;
  name: string;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  price: number;
  description: string;
  traits: string[];
}

const rockTypes: Omit<Rock, "id">[] = [
  {
    name: "Basic Boulder",
    emoji: "🪨",
    rarity: "common",
    price: 0.001,
    description: "A perfectly ordinary rock. Nothing special about it.",
    traits: ["Gray", "Round-ish", "Rocky"],
  },
  {
    name: "Smooth Pebble",
    emoji: "🔘",
    rarity: "common",
    price: 0.002,
    description: "Worn smooth by time and water. Still just a rock.",
    traits: ["Smooth", "Small", "Zen-like"],
  },
  {
    name: "Angry Rock",
    emoji: "😠",
    rarity: "rare",
    price: 0.01,
    description: "This rock has seen things. It's not happy about it.",
    traits: ["Grumpy", "Weathered", "Attitude"],
  },
  {
    name: "Happy Rock",
    emoji: "😊",
    rarity: "rare",
    price: 0.015,
    description: "Somehow this rock achieved enlightenment. Good for it.",
    traits: ["Cheerful", "Optimistic", "Blessed"],
  },
  {
    name: "Diamond Rock",
    emoji: "💎",
    rarity: "epic",
    price: 0.1,
    description: "Shiny and expensive-looking. Still worthless.",
    traits: ["Sparkly", "Pretentious", "Overpriced"],
  },
  {
    name: "Golden Rock",
    emoji: "🟡",
    rarity: "epic",
    price: 0.08,
    description: "Painted gold to look valuable. Fooled you!",
    traits: ["Shiny", "Fake Gold", "Deceptive"],
  },
  {
    name: "Rainbow Rock",
    emoji: "🌈",
    rarity: "legendary",
    price: 1.0,
    description:
      "Defies physics with its rainbow properties. Probably radioactive.",
    traits: ["Colorful", "Impossible", "Radioactive"],
  },
  {
    name: "Cosmic Rock",
    emoji: "✨",
    rarity: "legendary",
    price: 2.5,
    description:
      "From the depths of space. Contains stardust and disappointment.",
    traits: ["Cosmic", "Ancient", "Mysterious"],
  },
];

const STORAGE_KEY = "rock-nft-collection";

export function RockNftGame() {
  const [selectedRock, setSelectedRock] = useState<Omit<Rock, "id"> | null>(
    null,
  );
  const [isMinting, setIsMinting] = useState(false);
  const [collection, setCollection] = useState<Rock[]>([]);
  const [balance, setBalance] = useState(10);
  const [totalSpent, setTotalSpent] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as {
          collection?: Rock[];
          balance?: number;
          totalSpent?: number;
        };
        setCollection(data.collection ?? []);
        setBalance(data.balance ?? 10);
        setTotalSpent(data.totalSpent ?? 0);
      }
    } catch (err) {
      console.error("Failed to load rock collection:", err);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ collection, balance, totalSpent }),
    );
  }, [collection, balance, totalSpent, loaded]);

  const selectRandomRock = () => {
    incrementTaps();

    const weights = { common: 60, rare: 25, epic: 12, legendary: 3 };
    const totalWeight = Object.values(weights).reduce((a, b) => a + b, 0);
    const random = Math.random() * totalWeight;

    let currentWeight = 0;
    let selectedRarity: keyof typeof weights = "common";

    for (const [rarity, weight] of Object.entries(weights)) {
      currentWeight += weight;
      if (random <= currentWeight) {
        selectedRarity = rarity as keyof typeof weights;
        break;
      }
    }

    const rocksOfRarity = rockTypes.filter(
      (rock) => rock.rarity === selectedRarity,
    );
    const randomRock =
      rocksOfRarity[Math.floor(Math.random() * rocksOfRarity.length)];

    setSelectedRock(randomRock);
  };

  const mintRock = () => {
    if (!selectedRock || balance < selectedRock.price) return;

    incrementTaps();
    setIsMinting(true);

    setTimeout(() => {
      const newRock: Rock = {
        ...selectedRock,
        id: `rock-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };

      setCollection((prev) => [...prev, newRock]);
      setBalance((prev) => prev - selectedRock.price);
      setTotalSpent((prev) => prev + selectedRock.price);

      setSelectedRock(null);
      setIsMinting(false);
      playSound("success");
    }, 2000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300";
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300";
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300";
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300";
      default:
        return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const rarityStats = { common: 0, rare: 0, epic: 0, legendary: 0 };
  collection.forEach((rock) => rarityStats[rock.rarity]++);

  const reset = () => {
    incrementTaps();
    setCollection([]);
    setBalance(10);
    setTotalSpent(0);
    setSelectedRock(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-4">
      <Card className="flex-1">
        <CardHeader className="text-center">
          <CardTitle>Buy a Rock NFT (Fake)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Mint and collect completely worthless digital rocks!
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Coins className="w-4 h-4" />
              <span>{balance.toFixed(3)} ETH</span>
            </div>
            <div>Collection: {collection.length}</div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {!selectedRock && !isMinting ? (
            <div className="text-center space-y-4">
              <div className="text-6xl">🪨</div>
              <div className="text-lg">Discover Your Next Rock!</div>
              <div className="text-sm text-muted-foreground">
                Each rock is unique and completely worthless
              </div>
              <Button onClick={selectRandomRock} size="lg" className="w-full">
                <Gem className="w-4 h-4 mr-2" />
                Discover Rock
              </Button>
            </div>
          ) : isMinting ? (
            <div className="text-center space-y-4">
              <div className="text-6xl">⚡</div>
              <div className="text-lg">Minting Your Rock...</div>
              <div className="text-sm text-muted-foreground">
                Adding to the blockchain of disappointment...
              </div>
            </div>
          ) : selectedRock ? (
            <div className="space-y-4">
              <div className="text-center p-4 bg-linear-to-br from-gray-50 to-gray-100 border-2 border-gray-200 rounded-lg">
                <div className="text-6xl mb-2">{selectedRock.emoji}</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center space-x-2">
                    <h3 className="text-lg font-semibold">
                      {selectedRock.name}
                    </h3>
                    <Badge className={getRarityColor(selectedRock.rarity)}>
                      {selectedRock.rarity}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {selectedRock.description}
                  </p>
                  <div className="text-lg font-bold">
                    {selectedRock.price} ETH
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {selectedRock.traits.map((trait, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {trait}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2">
                <Button
                  onClick={mintRock}
                  disabled={balance < selectedRock.price}
                  className="w-full"
                >
                  <Star className="w-4 h-4 mr-2" />
                  {balance >= selectedRock.price
                    ? "Mint Rock NFT"
                    : "Insufficient Funds"}
                </Button>

                <Button
                  onClick={() => setSelectedRock(null)}
                  variant="outline"
                  className="w-full"
                >
                  Find Different Rock
                </Button>
              </div>
            </div>
          ) : null}

          {collection.length > 0 && (
            <Button variant="outline" onClick={reset} className="w-full">
              🗑️ Sell All Rocks (Reset Collection)
            </Button>
          )}

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>⚠️ These NFTs have no real value</p>
            <p>🪨 Rocks are stored in localStorage, not blockchain</p>
          </div>
        </CardContent>
      </Card>

      {collection.length > 0 && (
        <div className="w-full md:w-64 flex flex-col gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">🖼️ My Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto">
                {collection.slice(-6).map((rock) => (
                  <div
                    key={rock.id}
                    className="p-2 bg-linear-to-br from-gray-50 to-gray-100 border border-gray-200 rounded text-center"
                  >
                    <div className="text-2xl">{rock.emoji}</div>
                    <div className="text-xs font-medium truncate">
                      {rock.name}
                    </div>
                  </div>
                ))}
              </div>
              {collection.length > 6 && (
                <div className="text-xs text-muted-foreground mt-2">
                  Latest 6 of {collection.length}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm">📊 Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2 bg-gray-100 rounded text-center">
                  <div className="font-semibold">{rarityStats.common}</div>
                  <div>Common</div>
                </div>
                <div className="p-2 bg-blue-100 rounded text-center">
                  <div className="font-semibold">{rarityStats.rare}</div>
                  <div>Rare</div>
                </div>
                <div className="p-2 bg-purple-100 rounded text-center">
                  <div className="font-semibold">{rarityStats.epic}</div>
                  <div>Epic</div>
                </div>
                <div className="p-2 bg-yellow-100 rounded text-center">
                  <div className="font-semibold">{rarityStats.legendary}</div>
                  <div>Legendary</div>
                </div>
              </div>
              <div className="text-sm mt-3">
                Spent:{" "}
                <span className="font-bold">{totalSpent.toFixed(3)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
