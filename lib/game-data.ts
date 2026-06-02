export interface Game {
    id: string;
    title: string;
    description: string;
    emoji: string;
    category: 'pointless' | 'annoying' | "weird" | "confusing";
    estimatedTime: string;
}

export const games: Game[] = [
    {
        id: 'soup-or-soap',
        title: "Is it Soup or Soap?",
        description: "Can you tell the difference between soup and soap from blurry images?",
        emoji: '🍲',
        category: "annoying",
        estimatedTime: "2 min"
    },
    {
        id: "punch-simulator",
        title: "Punch Yourself simulator",
        description: "Virtually punch yourself with increasingly dramatic pain levels!",
        emoji: "👊",
        category: "weird",
        estimatedTime: "5 min"
    }
]