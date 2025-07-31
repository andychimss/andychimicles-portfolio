"use client";

import { useEffect, useRef } from "react";
import { useMathGame } from "../lib/stores/useMathGame";
import { useAudio } from "../lib/stores/useAudio";
import GameCanvas from "./GameCanvas";
import GameUI from "./GameUI";

const MathGame = () => {
  const { gameState, isVictoryAnimating, startGame, restartGame } = useMathGame();
  const { backgroundMusic, isMuted, playVictory } = useAudio();
  const musicStartedRef = useRef(false);
  const victoryPlayedRef = useRef(false);

  // Start background music when game starts
  useEffect(() => {
    if (backgroundMusic && !isMuted && !musicStartedRef.current && gameState === 'playing') {
      backgroundMusic.play().catch(error => {
        console.log("Background music play prevented:", error);
      });
      musicStartedRef.current = true;
    }
  }, [backgroundMusic, isMuted, gameState]);

  // Play victory sound when victory animation starts
  useEffect(() => {
    if (isVictoryAnimating && !victoryPlayedRef.current) {
      playVictory();
      victoryPlayedRef.current = true;
    }
    // Reset flag when not animating
    if (!isVictoryAnimating) {
      victoryPlayedRef.current = false;
    }
  }, [isVictoryAnimating, playVictory]);

  // Handle keyboard input for starting/restarting game
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        if (gameState === 'ready') {
          startGame();
        } else if (gameState === 'victory' || gameState === 'gameOver') {
          restartGame();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, startGame, restartGame]);

  return (
    <div className="relative w-full h-full">
      <GameCanvas />
      <GameUI />
    </div>
  );
};

export default MathGame;