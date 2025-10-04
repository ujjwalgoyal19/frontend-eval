import { useEffect, useRef, useState } from "react";
import { Card } from "./components/ui/card";
import { cn, generateCardSet } from "./lib/utils";
import type { CardType } from "./types";

const Game = () => {
  const timeoutId = useRef<number | null>(null);
  const [cardSet, setCardSet] = useState<Map<number, CardType>>(new Map());
  const [flippedCard, setFlippedCard] = useState<CardType[]>([]);

  useEffect(() => {
    const newGameSet = generateCardSet();
    setCardSet(newGameSet);
  }, []);

  useEffect(() => {
    if (flippedCard.length === 0) return;
    clearTimeout(timeoutId.current!);
    timeoutId.current = setTimeout(() => {
      flippedCard.forEach((fc) => {
        setCardSet((prev) => {
          const next = new Map(prev);
          const existing = next.get(fc.id);
          if (existing) {
            next.set(fc.id, {
              ...existing,
              isFlipped: false,
              isMatched:
                flippedCard.length === 2 &&
                flippedCard[0].cardNumber === flippedCard[1].cardNumber,
            });
          }
          return next;
        });
      });
      setFlippedCard([]);
    }, 3000);
  }, [flippedCard]);

  return (
    <div className="flex flex-col justify-center items-center gap-12 pt-20">
      <h1>Game</h1>
      <Card className="grid grid-cols-6 gap-4 px-10 py-10">
        {Array.from(cardSet.values()).map((card: CardType) => {
          return (
            <Card
              key={card.id}
              className={cn(
                "flex items-center justify-center w-20 h-20 relative transition-all duration-500 [transform-style:preserve-3d] select-auto *:select-none cursor-pointer",
                {
                  "opacity-0 pointer-events-none": card.isMatched,
                  "[transform:rotateY(180deg)]": card.isFlipped,
                }
              )}
              onClick={() => {
                if (card.isFlipped || card.isMatched || flippedCard.length >= 2)
                  return;

                setCardSet((prev) => {
                  const next = new Map(prev);
                  const existing = next.get(card.id);
                  if (existing) {
                    next.set(card.id, { ...existing, isFlipped: true });
                  }
                  return next;
                });
                setFlippedCard((prev) => [...prev, card]);
              }}
            >
              <div className="absolute inset-0 h-full w-full flex justify-center items-center rounded-xl bg-gray-200 p-4 text-center [backface-visibility:hidden]">
                Flip
              </div>

              {/* Back side */}
              <div className="absolute inset-0 h-full w-full rounded-xl bg-slate-900 p-4 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)] flex justify-center items-center">
                {card.cardNumber}
              </div>
            </Card>
          );
        })}
      </Card>
    </div>
  );
};

export default Game;
