import { Button } from "@/components/ui/button";
import { Gamepad2, Shuffle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
      <div className="text-center mb-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <span className="text-6xl">🥔</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-[#2a2929]">
          Appsolutely Useless
        </h1>
      </div>

      <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-center">
        Welcome to the world's most comprehensive collection of pointless
        mini-games. This app eists purely for chaos and fun. Nothing Else.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button size="lg" asChild>
          <Link href="/games" className="flex items-center space-x-2">
            <Gamepad2 className="w-5 h-5" />
            <span>Explore Games</span>
          </Link>
        </Button>

        <Button size="lg" variant="outline" asChild>
          <Link href="/random" className="flex items-center space-x-2">
            <Shuffle className="w-5 h-5" />
            <span>Random Game</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
