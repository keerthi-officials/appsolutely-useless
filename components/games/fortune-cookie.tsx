"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { incrementTaps } from "@/lib/storage";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { playSound } from "@/lib/sounds";

const brutallyhonestFortunes = [
  "Give up.",
  "This site is your peak.",
  "Your potential is limited.",
  "Lower your expectations.",
  "You're exactly where you belong.",
  "Stop trying so hard.",
  "Mediocrity suits you.",
  "Your dreams are unrealistic.",
  "You peaked in high school.",
  "This is as good as it gets.",
  "You're not the main character.",
  "Your horoscope is lying to you.",
  "That 'great idea' isn't that great.",
  "You're procrastinating right now.",
  "Your phone battery will die at the worst moment.",
  "You'll never finish that project.",
  "Your WiFi will fail during important calls.",
  "You're overthinking this fortune.",
  "Your socks will always go missing.",
  "You'll forget why you opened the fridge.",
  "Your favorite show will get canceled.",
  "You'll always be 5 minutes late.",
  "Your earphones will tangle themselves.",
  "You'll never find the perfect playlist.",
  "Your food will always be too hot or too cold.",
  "You'll step on a LEGO barefoot.",
  "Your phone will update at the worst time.",
  "You'll always choose the slowest checkout line.",
  "Your favorite restaurant will close down.",
  "You'll never remember where you put your keys.",
  "Your autocorrect will betray you.",
  "You'll always get the broken shopping cart.",
  "Your favorite song will get overplayed.",
  "You'll never win an argument with your GPS.",
  "Your ice cream will fall off the cone.",
  "You'll always sit behind the tall person at movies.",
  "Your printer will jam when you're in a hurry.",
  "You'll never find matching Tupperware lids.",
  "Your favorite meme will become cringe.",
  "You'll always forget what you came upstairs for.",
  "Your delivery will arrive when you're in the shower.",
  "You'll never untangle Christmas lights easily.",
  "Your favorite parking spot will always be taken.",
  "You'll always get the squeaky shopping cart wheel.",
  "Your phone will die right before you need directions.",
  "You'll never remember if you locked the door.",
  "Your favorite TV character will be killed off.",
  "You'll always get the middle seat on flights.",
  "Your coffee will always be either too weak or too strong.",
  "You'll never find the end of the tape roll.",
];

export function FortuneCookieGame() {
  const [currentFortune, setCurrentFortune] = useState<string | null>(null);
  const [isOpening, setIsOpening] = useState(false);

  const openCookie = () => {
    incrementTaps();
    setIsOpening(true);

    setTimeout(() => {
      const randomFortune =
        brutallyhonestFortunes[
          Math.floor(Math.random() * brutallyhonestFortunes.length)
        ];
      setCurrentFortune(randomFortune);
      setIsOpening(false);
      playSound("success");
    }, 1500);
  };

  const getNewCookie = () => {
    incrementTaps();
    setCurrentFortune(null);
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle>🥠 Fortune Cookie</CardTitle>
        <p className="text-sm text-muted-foreground">
          Get brutally honest life advice from our wisdom cookies
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {!currentFortune && !isOpening ? (
          <div className="text-center space-y-4">
            <div className="text-8xl">🥠</div>
            <div className="text-lg">Crack open your fortune!</div>
            <Button onClick={openCookie} size="lg" className="w-full">
              Open Fortune Cookie
            </Button>
          </div>
        ) : isOpening ? (
          <div className="text-center space-y-4">
            <div className="text-8xl">💥</div>
            <div className="text-lg">Cracking open wisdom...</div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-center space-y-3">
              <div className="text-6xl">📜</div>
              <div className="p-4 bg-linear-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-lg">
                <div className="text-lg font-medium italic text-center">
                  &quot;{currentFortune}&quot;
                </div>
              </div>
            </div>

            <Button onClick={getNewCookie} className="w-full">
              Get Another Dose of Reality
            </Button>
          </div>
        )}

        <div className="text-xs text-muted-foreground text-center space-y-1">
          <p>🥠 These cookies contain 0% sugar, 100% harsh reality</p>
        </div>
      </CardContent>
    </Card>
  );
}
