"use client";

import { useState, useEffect } from "react";
import { useMathGame } from "../lib/stores/useMathGame";
import { useAudio } from "../lib/stores/useAudio";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

const GameUI = () => {
  const { 
    gameState, 
    selectedAnimal,
    currentProblem, 
    score, 
    animalPosition,
    setSelectedAnimal,
    startGame, 
    restartGame, 
    submitAnswer 
  } = useMathGame();
  
  const { toggleMute, isMuted, playSuccess, playHit } = useAudio();
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState("");

  // Handle answer submission
  const handleSubmit = () => {
    const answer = parseInt(userAnswer);
    if (isNaN(answer)) return;

    const isCorrect = answer === currentProblem.answer;
    
    // Play appropriate sound effect
    if (isCorrect) {
      playSuccess();
    } else {
      playHit();
    }
    
    submitAnswer(isCorrect);
    
    setFeedback(isCorrect ? "Correct! 🎉" : "Try again! 🤔");
    setUserAnswer("");
    
    // Clear feedback after 2 seconds
    setTimeout(() => setFeedback(""), 2000);
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      const target = event.target as HTMLElement;
      
      // Allow Enter key to submit regardless of focus
      if (event.key === 'Enter') {
        handleSubmit();
        return;
      }
      
      // Don't handle other input if an input field is focused
      if (target.tagName === 'INPUT') return;
      
      if (event.key >= '0' && event.key <= '9') {
        setUserAnswer(prev => prev + event.key);
      } else if (event.key === 'Backspace') {
        setUserAnswer(prev => prev.slice(0, -1));
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameState, userAnswer, currentProblem]);

  // Ready state
  if (gameState === 'ready') {
    const animals = [
      { type: 'dog' as const, emoji: '🐕', name: 'Dog' },
      { type: 'cat' as const, emoji: '🐱', name: 'Cat' },
      { type: 'hamster' as const, emoji: '🐹', name: 'Hamster' },
      { type: 'bunny' as const, emoji: '🐰', name: 'Bunny' }
    ];

    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Card className="w-96 bg-white">
          <CardContent className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4 text-blue-800">Math Rescue!</h1>
            <p className="text-lg mb-4">Choose an animal to save from the tree!</p>
            
            {/* Animal selection */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {animals.map((animal) => (
                <Button
                  key={animal.type}
                  onClick={() => setSelectedAnimal(animal.type)}
                  variant={selectedAnimal === animal.type ? "default" : "outline"}
                  className={`p-4 h-auto flex flex-col items-center gap-2 ${
                    selectedAnimal === animal.type 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white' 
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-2xl">{animal.emoji}</span>
                  <span className="text-sm font-medium">{animal.name}</span>
                </Button>
              ))}
            </div>
            
            <p className="text-sm mb-6 text-gray-600">
              Answer math problems correctly to bring the {selectedAnimal} down.
              Wrong answers make the {selectedAnimal} climb back up!
            </p>
            <Button 
              onClick={startGame}
              className="text-lg px-6 py-3 bg-green-500 hover:bg-green-600"
            >
              Start Game (Press Enter)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Victory state
  if (gameState === 'victory') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Card className="w-96 bg-white">
          <CardContent className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4 text-green-600">You Did It! 🎉</h1>
            <p className="text-lg mb-4">The {selectedAnimal} is safe on the ground!</p>
            <p className="text-sm mb-6">Final Score: {score}</p>
            <Button 
              onClick={restartGame}
              className="text-lg px-6 py-3 bg-blue-500 hover:bg-blue-600"
            >
              Play Again (Press Enter)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Game over state
  if (gameState === 'gameOver') {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <Card className="w-96 bg-white">
          <CardContent className="p-6 text-center">
            <h1 className="text-3xl font-bold mb-4 text-red-600">Oh No! 😞</h1>
            <p className="text-lg mb-4">The {selectedAnimal} climbed too high!</p>
            <p className="text-sm mb-6">Final Score: {score}</p>
            <Button 
              onClick={restartGame}
              className="text-lg px-6 py-3 bg-orange-500 hover:bg-orange-600"
            >
              Try Again (Press Enter)
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Playing state
  return (
    <>
      {/* Top UI elements */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex justify-between items-start">
          {/* Score and progress */}
          <Card className="bg-white bg-opacity-90">
            <CardContent className="p-4">
              <div className="text-lg font-bold">Score: {score}</div>
              <div className="text-sm text-gray-600">
                {selectedAnimal.charAt(0).toUpperCase() + selectedAnimal.slice(1)} Progress: {Math.round(animalPosition * 100)}%
              </div>
            </CardContent>
          </Card>

          {/* Sound toggle */}
          <Button
            onClick={toggleMute}
            variant="outline"
            className="bg-white bg-opacity-90"
          >
            {isMuted ? "🔇" : "🔊"}
          </Button>
        </div>
      </div>

      {/* Math problem - positioned at bottom-left of game area */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="text-left max-w-xs">
          <h2 className="text-lg font-bold mb-2 text-white bg-black bg-opacity-80 px-3 py-2 rounded">
            What is {currentProblem.num1} + {currentProblem.num2}?
          </h2>
          
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value.replace(/[^0-9]/g, ''))}
              className="text-lg text-center border-2 border-gray-300 rounded px-2 py-1 w-14 bg-white text-black font-bold"
              placeholder="?"
              maxLength={2}
              autoFocus
            />
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer}
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 text-sm"
            >
              Submit
            </Button>
          </div>

          {feedback && (
            <div className={`text-sm font-bold px-3 py-1 rounded bg-black bg-opacity-80 mb-1 ${
              feedback.includes('Correct') ? 'text-green-400' : 'text-red-400'
            }`}>
              {feedback}
            </div>
          )}

          <p className="text-xs text-white bg-black bg-opacity-80 px-2 py-1 rounded">
            Type answer and press Enter
          </p>
        </div>
      </div>
    </>
  );
};

export default GameUI;