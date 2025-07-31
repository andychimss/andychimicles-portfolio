"use client";

import { useEffect, useRef } from "react";
import { useMathGame, AnimalType } from "../lib/stores/useMathGame";

// Function to draw different animals
const drawAnimal = (ctx: CanvasRenderingContext2D, animalType: AnimalType, y: number) => {
  const baseX = 320;
  
  switch (animalType) {
    case "dog":
      // Dog body
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(baseX, y, 40, 25);
      // Dog head
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(baseX - 5, y - 15, 25, 20);
      // Dog ears
      ctx.fillStyle = '#E0E0E0';
      ctx.fillRect(baseX - 10, y - 12, 8, 15);
      ctx.fillRect(baseX + 22, y - 12, 8, 15);
      // Dog eyes (blue)
      ctx.fillStyle = '#0066FF';
      ctx.fillRect(baseX - 2, y - 10, 3, 3);
      ctx.fillRect(baseX + 8, y - 10, 3, 3);
      // Dog nose
      ctx.fillStyle = '#000000';
      ctx.fillRect(baseX + 2, y - 5, 2, 2);
      // Dog tail
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(baseX + 38, y + 5, 15, 8);
      break;
      
    case "cat":
      // Cat body
      ctx.fillStyle = '#FFA500';
      ctx.fillRect(baseX, y, 40, 25);
      // Cat head
      ctx.fillStyle = '#FFA500';
      ctx.fillRect(baseX - 5, y - 15, 25, 20);
      // Cat ears (triangular)
      ctx.fillStyle = '#FFA500';
      ctx.fillRect(baseX - 8, y - 15, 6, 8);
      ctx.fillRect(baseX + 17, y - 15, 6, 8);
      // Cat eyes (green)
      ctx.fillStyle = '#00FF00';
      ctx.fillRect(baseX - 2, y - 10, 3, 3);
      ctx.fillRect(baseX + 8, y - 10, 3, 3);
      // Cat nose
      ctx.fillStyle = '#FF69B4';
      ctx.fillRect(baseX + 2, y - 5, 2, 2);
      // Cat tail
      ctx.fillStyle = '#FFA500';
      ctx.fillRect(baseX + 38, y + 3, 18, 6);
      break;
      
    case "hamster":
      // Hamster body (smaller)
      ctx.fillStyle = '#DEB887';
      ctx.fillRect(baseX + 5, y + 5, 30, 20);
      // Hamster head
      ctx.fillStyle = '#DEB887';
      ctx.fillRect(baseX + 2, y - 10, 20, 18);
      // Hamster ears (small)
      ctx.fillStyle = '#CD853F';
      ctx.fillRect(baseX - 1, y - 8, 4, 6);
      ctx.fillRect(baseX + 17, y - 8, 4, 6);
      // Hamster eyes (black)
      ctx.fillStyle = '#000000';
      ctx.fillRect(baseX + 3, y - 5, 2, 2);
      ctx.fillRect(baseX + 13, y - 5, 2, 2);
      // Hamster nose
      ctx.fillStyle = '#FF69B4';
      ctx.fillRect(baseX + 8, y - 2, 2, 1);
      break;
      
    case "bunny":
      // Bunny body
      ctx.fillStyle = '#F5F5F5';
      ctx.fillRect(baseX, y, 40, 25);
      // Bunny head
      ctx.fillStyle = '#F5F5F5';
      ctx.fillRect(baseX - 5, y - 15, 25, 20);
      // Bunny ears (long)
      ctx.fillStyle = '#F5F5F5';
      ctx.fillRect(baseX - 7, y - 25, 5, 18);
      ctx.fillRect(baseX + 17, y - 25, 5, 18);
      // Bunny eyes (black)
      ctx.fillStyle = '#000000';
      ctx.fillRect(baseX - 2, y - 10, 3, 3);
      ctx.fillRect(baseX + 8, y - 10, 3, 3);
      // Bunny nose
      ctx.fillStyle = '#FF69B4';
      ctx.fillRect(baseX + 2, y - 5, 2, 2);
      // Bunny tail (small puff)
      ctx.fillStyle = '#F5F5F5';
      ctx.beginPath();
      ctx.arc(baseX + 42, y + 10, 6, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
};

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { animalPosition, selectedAnimal, gameState, victoryJumpOffset, isVictoryAnimating } = useMathGame();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to match container
    const container = canvas.parentElement;
    const rect = container?.getBoundingClientRect();
    if (rect) {
      canvas.width = rect.width;
      canvas.height = rect.height;
    } else {
      // Fallback to default size
      canvas.width = 800;
      canvas.height = 600;
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw sky background
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, '#87CEEB');
    gradient.addColorStop(1, '#98D8E8');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw ground
    ctx.fillStyle = '#228B22';
    ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

    // Draw tree trunk
    ctx.fillStyle = '#8B4513';
    ctx.fillRect(350, 200, 50, 300);

    // Draw tree leaves (simple circles for 8-bit style)
    ctx.fillStyle = '#228B22';
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 3; j++) {
        ctx.beginPath();
        ctx.arc(320 + i * 30, 150 + j * 30, 20, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Draw animal based on position (0 = top of tree, 1 = ground)
    let animalY = 180 + (animalPosition * 280); // Move from top (180) to ground (460)
    
    // Add victory jump offset when animating
    if (isVictoryAnimating) {
      animalY -= victoryJumpOffset;
    }
    
    // Draw selected animal
    drawAnimal(ctx, selectedAnimal, animalY);

    // Add some 8-bit style clouds
    ctx.fillStyle = '#FFFFFF';
    // Cloud 1
    ctx.fillRect(100, 80, 20, 10);
    ctx.fillRect(105, 70, 10, 10);
    ctx.fillRect(110, 90, 10, 10);
    
    // Cloud 2
    ctx.fillRect(600, 60, 25, 12);
    ctx.fillRect(605, 50, 15, 12);
    ctx.fillRect(615, 72, 15, 10);

  }, [animalPosition, selectedAnimal, gameState, victoryJumpOffset, isVictoryAnimating]);

  return (
    <div className="w-full h-full">
      <canvas
        ref={canvasRef}
        className="pixel-art"
        style={{
          imageRendering: 'pixelated',
        }}
      />
    </div>
  );
};

export default GameCanvas;