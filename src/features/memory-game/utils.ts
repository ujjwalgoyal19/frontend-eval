import type { CardType } from "./types";

export const generateCardSet = (): Map<number, CardType> => {
  const numbers: number[] = Array.from({ length: 18 }, (_, i) => i + 1).flatMap(
    (n) => [n, n]
  );

  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  const cardSet = new Map<number, CardType>();
  numbers.forEach((cardNumber, idx) => {
    cardSet.set(idx, {
      id: idx,
      cardNumber,
      isFlipped: false,
      isMatched: false,
    });
  });

  return cardSet;
};
