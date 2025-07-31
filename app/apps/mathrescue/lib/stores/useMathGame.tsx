"use client";

import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import { generateMathProblem, MathProblem } from "../gameLogic";

export type GameState = "ready" | "playing" | "victory" | "gameOver";
export type AnimalType = "dog" | "cat" | "hamster" | "bunny";

interface MathGameState {
  gameState: GameState;
  selectedAnimal: AnimalType;
  currentProblem: MathProblem;
  animalPosition: number; // 0 = top of tree, 1 = ground
  targetAnimalPosition: number; // Target position for smooth animation
  isAnimating: boolean;
  isVictoryAnimating: boolean;
  victoryJumpOffset: number; // Offset for victory jump animation
  score: number;
  consecutiveWrong: number;
  
  // Actions
  setSelectedAnimal: (animal: AnimalType) => void;
  startGame: () => void;
  restartGame: () => void;
  submitAnswer: (isCorrect: boolean) => void;
  updateAnimalPosition: (newPosition: number) => void;
  startVictoryAnimation: () => void;
}

export const useMathGame = create<MathGameState>()(
  subscribeWithSelector((set, get) => ({
    gameState: "ready",
    selectedAnimal: "dog",
    currentProblem: generateMathProblem(),
    animalPosition: 0, // Start at top of tree
    targetAnimalPosition: 0,
    isAnimating: false,
    isVictoryAnimating: false,
    victoryJumpOffset: 0,
    score: 0,
    consecutiveWrong: 0,
    
    setSelectedAnimal: (animal: AnimalType) => {
      set({ selectedAnimal: animal });
    },
    
    startGame: () => {
      set({
        gameState: "playing",
        currentProblem: generateMathProblem(),
        animalPosition: 0,
        targetAnimalPosition: 0,
        isAnimating: false,
        isVictoryAnimating: false,
        victoryJumpOffset: 0,
        score: 0,
        consecutiveWrong: 0
      });
    },
    
    restartGame: () => {
      set({
        gameState: "ready",
        currentProblem: generateMathProblem(),
        animalPosition: 0,
        targetAnimalPosition: 0,
        isAnimating: false,
        isVictoryAnimating: false,
        victoryJumpOffset: 0,
        score: 0,
        consecutiveWrong: 0
      });
    },
    
    updateAnimalPosition: (newPosition: number) => {
      set({ animalPosition: newPosition });
    },
    
    startVictoryAnimation: () => {
      set({ isVictoryAnimating: true });
      
      let jumpCount = 0;
      const maxJumps = 5;
      let startTime = Date.now();
      
      const jumpAnimation = () => {
        const state = get();
        if (!state.isVictoryAnimating) return;
        
        const elapsed = Date.now() - startTime;
        const jumpDuration = 500; // 500ms per jump
        const currentJump = Math.floor(elapsed / jumpDuration);
        
        if (currentJump >= maxJumps) {
          set({ 
            isVictoryAnimating: false, 
            victoryJumpOffset: 0,
            gameState: "victory"
          });
          return;
        }
        
        const progress = (elapsed % jumpDuration) / jumpDuration;
        const jumpHeight = Math.sin(progress * Math.PI) * 30; // 30 pixel jump height
        
        set({ victoryJumpOffset: jumpHeight });
        
        requestAnimationFrame(jumpAnimation);
      };
      
      requestAnimationFrame(jumpAnimation);
    },
    
    submitAnswer: (isCorrect: boolean) => {
      const state = get();
      
      if (state.gameState !== "playing" || state.isAnimating) return;
      
      let newTargetPosition = state.animalPosition;
      let newScore = state.score;
      let newConsecutiveWrong = state.consecutiveWrong;
      let newProblem = state.currentProblem;
      
      if (isCorrect) {
        // Move animal down 1/5 of the way
        newTargetPosition = Math.min(1, state.animalPosition + 0.2);
        newScore = state.score + 10;
        newConsecutiveWrong = 0;
        // Generate new problem only when correct
        newProblem = generateMathProblem();
      } else {
        // Move animal up 1/5 of the way
        newTargetPosition = Math.max(0, state.animalPosition - 0.2);
        newConsecutiveWrong = state.consecutiveWrong + 1;
        // Keep the same problem when wrong
      }
      
      // Start animation
      set({
        targetAnimalPosition: newTargetPosition,
        isAnimating: true,
        score: newScore,
        consecutiveWrong: newConsecutiveWrong,
        currentProblem: newProblem
      });
      
      // Animate to target position
      const animateStep = () => {
        const currentState = get();
        const diff = currentState.targetAnimalPosition - currentState.animalPosition;
        
        if (Math.abs(diff) < 0.01) {
          // Animation complete
          const finalPosition = currentState.targetAnimalPosition;
          
          // Check win condition
          if (finalPosition >= 1) {
            set({
              animalPosition: 1,
              isAnimating: false
            });
            // Start victory animation
            get().startVictoryAnimation();
            return;
          }
          
          // Check lose condition (animal back at top)
          if (finalPosition <= 0 && currentState.animalPosition > 0) {
            set({
              gameState: "gameOver",
              animalPosition: 0,
              isAnimating: false
            });
            return;
          }
          
          // Continue playing
          set({
            animalPosition: finalPosition,
            isAnimating: false
          });
        } else {
          // Continue animation
          const newPosition = currentState.animalPosition + (diff * 0.1);
          set({ animalPosition: newPosition });
          requestAnimationFrame(animateStep);
        }
      };
      
      requestAnimationFrame(animateStep);
    }
  }))
);