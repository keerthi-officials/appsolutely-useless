"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8 text-center">
      <div className="text-6xl mb-4">🤔</div>
      <h1 className="text-2xl font-bold mb-4">404 - Not Found</h1>
      <p className="text-muted-foreground mb-6">
        The page you are looking for does not exist.
      </p>
      <Button onClick={() => router.push("/games")}>
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Games
      </Button>
    </div>
  );
}
