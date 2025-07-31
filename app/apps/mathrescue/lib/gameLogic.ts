export interface MathProblem {
  num1: number;
  num2: number;
  answer: number;
}

export function generateMathProblem(): MathProblem {
  // Generate addition problems with numbers 0-10
  const num1 = Math.floor(Math.random() * 11); // 0-10
  const num2 = Math.floor(Math.random() * 11); // 0-10
  
  return {
    num1,
    num2,
    answer: num1 + num2
  };
}

export function checkAnswer(problem: MathProblem, userAnswer: number): boolean {
  return problem.answer === userAnswer;
}

// Utility function to clamp values
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}