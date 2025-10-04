import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { CardType } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const generateRandomNumber = (min: number, max: number) => {
  return Math.round(Math.random() * (max - min) + min);
};

export const generateCardSet = (): Map<number, CardType> => {
  const cards = Array.from({ length: 36 }, () => 0);
  const alreadyGeneratedNumbers = new Set();
  const alreadyAssignedCards = new Set();
  let numbersGenerated = 0;
  while (numbersGenerated < 18) {
    const newGeneratedNumber = generateRandomNumber(1, 18);
    const newAssignedCardFirst = generateRandomNumber(0, 35);
    const newAssignedCardSecond = generateRandomNumber(0, 35);
    if (
      !alreadyGeneratedNumbers.has(newGeneratedNumber) &&
      newAssignedCardFirst !== newAssignedCardSecond &&
      !alreadyAssignedCards.has(newAssignedCardFirst) &&
      !alreadyAssignedCards.has(newAssignedCardSecond)
    ) {
      numbersGenerated++;
      alreadyGeneratedNumbers.add(newGeneratedNumber);
      alreadyAssignedCards.add(newAssignedCardFirst);
      alreadyAssignedCards.add(newAssignedCardSecond);
      cards[newAssignedCardFirst] = newGeneratedNumber;
      cards[newAssignedCardSecond] = newGeneratedNumber;
    }
  }
  const cardSet = new Map<number, CardType>();
  cards.forEach((card, idx) => {
    cardSet.set(idx, {
      id: idx,
      cardNumber: card,
      isFlipped: false,
      isMatched: false,
    });
  });
  return cardSet;
};
