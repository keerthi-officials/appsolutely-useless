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
        title: "Punch Yourself Simulator",
        description: "Virtually punch yourself with increasingly dramatic pain levels!",
        emoji: "👊",
        category: "weird",
        estimatedTime: "5 min"
    },
    {
        id: "uselessness-predictor",
        title: "AI Predicts Uselessness",
        description: "Our AI will scientifically determine how useless anything is.",
        emoji: "🤖",
        category: "confusing",
        estimatedTime: "3 min"
    },
    {
        id: "waiting-game",
        title: "How long can you wait?",
        description: "Just wait. See how long you can last doing absolutely nothing.",
        emoji: "⏳",
        category: "pointless",
        estimatedTime: "???"
    }
]

export const getGameById = (id: string): Game | undefined => {
    return games.find(game => game.id === id);
}

export const getRandomGame = (): Game => {
    return games[Math.floor(Math.random() * games.length)];
}