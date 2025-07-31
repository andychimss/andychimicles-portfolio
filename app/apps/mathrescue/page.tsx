"use client";

import { Suspense, useEffect } from "react";
import { useAudio } from "./lib/stores/useAudio";
import MathGame from "./components/MathGame";

export default function MathRescuePage() {
  const { setBackgroundMusic, setHitSound, setSuccessSound, setVictorySound } = useAudio();

  // Initialize audio assets
  useEffect(() => {
    const bgMusic = new Audio("/mathrescue/sounds/background.mp3");
    const hitAudio = new Audio("/mathrescue/sounds/hit.mp3");
    const successAudio = new Audio("/mathrescue/sounds/success.mp3");
    const victoryAudio = new Audio("/mathrescue/sounds/success.mp3"); // Use success sound for victory for now

    bgMusic.loop = true;
    bgMusic.volume = 0.3;

    setBackgroundMusic(bgMusic);
    setHitSound(hitAudio);
    setSuccessSound(successAudio);
    setVictorySound(victoryAudio);
  }, [setBackgroundMusic, setHitSound, setSuccessSound, setVictorySound]);

  return (
    <section>
      <h1 className="mb-4 text-2xl font-semibold tracking-tighter">
        Math Rescue Game
      </h1>
      <div className="w-full aspect-[4/3] max-w-2xl mx-auto relative overflow-hidden bg-[#87CEEB] rounded-lg border-4 border-black">
        <Suspense fallback={
          <div className="flex items-center justify-center h-full bg-blue-200">
            <div className="text-xl font-bold text-blue-800">Loading Math Rescue...</div>
          </div>
        }>
          <MathGame />
        </Suspense>
      </div>
      <div className="mt-4 text-sm text-neutral-600 dark:text-neutral-400 text-center">
        Choose an animal and solve math problems to save them from the tree!
      </div>
    </section>
  );
}