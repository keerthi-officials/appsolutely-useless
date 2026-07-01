import { GamePageClient } from "./view";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GamePage({ params }: PageProps) {
  return <GamePageClient slug={(await params).slug} />;
}
