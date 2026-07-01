"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StatsCard } from "@/components/stats-card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  getStats,
  clearAllData,
  getMostPlayedGame,
  UserStats,
  GameStats,
  DEFAULT_STATS,
} from "@/lib/storage";
import { getGameById } from "@/lib/game-data";
import { Trash2, Trophy } from "lucide-react";

export default function ProfilePage() {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);
  const [mostPlayedGame, setMostPlayedGame] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStats(getStats());
    setMostPlayedGame(getMostPlayedGame());
    setMounted(true);
  }, []);

  const handleClearData = () => {
    clearAllData();
    setStats(getStats());
    setMostPlayedGame(null);
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
      return `${minutes}m ${secs}s`;
    } else {
      return `${secs}s`;
    }
  };

  const getRegretDescription = (level: number) => {
    if (level < 10) return "Blissfully unaware";
    if (level < 25) return "Slight concern";
    if (level < 50) return "Moderate regret";
    if (level < 75) return "Significant remorse";
    if (level < 90) return "Deep existential crisis";
    return "Complete life reevaluation needed";
  };

  const getAchievements = () => {
    if (!stats) return [];

    const achievements = [];

    if (stats.totalGamesPlayed >= 1) achievements.push("First Game");
    if (stats.totalGamesPlayed >= 10) achievements.push("Game Explorer");
    if (stats.totalGamesPlayed >= 50) achievements.push("Dedicated Player");
    if (stats.totalGamesPlayed >= 100) achievements.push("Game Master");

    if (stats.totalTaps >= 100) achievements.push("Clicker");
    if (stats.totalTaps >= 1000) achievements.push("Tap Master");
    if (stats.totalTaps >= 5000) achievements.push("Finger Athlete");

    if (stats.totalTimeWasted >= 300) achievements.push("Time Waster");
    if (stats.totalTimeWasted >= 1800) achievements.push("Procrastinator");
    if (stats.totalTimeWasted >= 3600) achievements.push("Time Lord");

    if (stats.favorites.length >= 3) achievements.push("Curator");
    if (stats.favorites.length >= 7) achievements.push("Collector");

    if (stats.regretLevel >= 50) achievements.push("Regret Specialist");
    if (stats.regretLevel >= 90) achievements.push("Existential Crisis");

    return achievements;
  };

  if (!mounted) {
    return (
      <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <div className="text-lg">Loading your profile...</div>
        </div>
      </div>
    );
  }

  const achievements = getAchievements();
  const mostPlayedGameData = mostPlayedGame
    ? getGameById(mostPlayedGame)
    : null;

  return (
    <div className="max-w-7xl sm:px-6 lg:px-8 mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">📊 Your Useless Profile</h1>
        <p className="text-lg text-muted-foreground mb-6">
          A comprehensive analysis of your time-wasting achievements
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Games Played"
          value={stats.totalGamesPlayed}
          icon="🎮"
          description="Games you've opened"
        />

        <StatsCard
          title="Total Time Wasted"
          value={formatTime(stats.totalTimeWasted)}
          icon="⏰"
          description="Time you'll never get back"
          trend={stats.totalTimeWasted > 3600 ? "down" : "neutral"}
        />

        <StatsCard
          title="Total Taps"
          value={stats.totalTaps.toLocaleString()}
          icon="👆"
          description="Finger exercises completed"
        />

        <StatsCard
          title="Regret Level"
          value={`${Math.round(stats.regretLevel)}%`}
          icon="😔"
          description={getRegretDescription(stats.regretLevel)}
          trend={stats.regretLevel > 50 ? "down" : "neutral"}
        />

        <StatsCard
          title="Favorite Games"
          value={stats.favorites.length}
          icon="❤️"
          description="Games you actually enjoyed"
        />

        <StatsCard
          title="Most Played Game"
          value={mostPlayedGameData ? mostPlayedGameData.title : "None"}
          icon={mostPlayedGameData ? mostPlayedGameData.emoji : "🤷"}
          description={
            mostPlayedGameData
              ? `${stats.gameStats[mostPlayedGame!]?.timesPlayed || 0} times`
              : "Start playing!"
          }
        />
      </div>

      {Object.keys(stats.gameStats).length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Game-Specific Stats</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.gameStats)
                .sort(
                  ([, a]: [string, GameStats], [, b]: [string, GameStats]) =>
                    b.timesPlayed - a.timesPlayed,
                )
                .slice(0, 5)
                .map(([gameId, gameStats]: [string, GameStats]) => {
                  const game = getGameById(gameId);
                  if (!game) return null;
                  return (
                    <div
                      key={gameId}
                      className="flex items-center justify-between bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{game.emoji}</span>
                        <div>
                          <div className="font-medium">{game.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {gameStats.timesPlayed} plays •{" "}
                            {formatTime(gameStats.timeSpent)} spent
                          </div>
                        </div>
                      </div>
                      <Badge variant="secondary">
                        {gameStats.timesPlayed}x
                      </Badge>
                    </div>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {achievements.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Trophy className="w-5 h-5" />
              <span>Achievements Unlocked</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="p-3 border border-yellow-300 rounded-lg"
                >
                  <div className="text-lg mb-1">🏆</div>
                  <div className="text-sm font-medium">{achievement}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>About This App</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Version</span>
            <Badge>0.0.1</Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            This app exists purely for chaos and fun. Nothing else.
          </div>
          <div className="text-xs text-muted-foreground">
            <p>• All data is stored locally on your device</p>
            <p>• No accounts, no tracking, no purpose</p>
            <p>• Created with love and questionable judgment</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-destructive">
            <Trash2 className="w-5 h-5" />
            <span>Danger Zone</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Clear all your stats, achievements, and favorites. This action
              cannot be undone.
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="w-full">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All Data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all your stats, achievements,
                    favorites, and game progress. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleClearData}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  >
                    Yes, delete everything
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
