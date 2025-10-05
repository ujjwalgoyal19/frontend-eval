import { useEffect, useRef, useState } from "react";
import { Card } from "../../components/ui/card";
import { cn } from "../../lib/utils";
import type { CardType } from "./types";
import { generateCardSet } from "./utils";

export default function MemoryGameCore() {
  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockRef = useRef(false);
  const [cardSet, setCardSet] = useState<Map<number, CardType>>(new Map());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);

  useEffect(() => {
    const newGameSet = generateCardSet();
    setCardSet(newGameSet);
  }, []);

  useEffect(() => {
    if (flippedIds.length !== 2) return;

    lockRef.current = true;
    if (timeoutId.current) clearTimeout(timeoutId.current);

    const [firstId, secondId] = flippedIds;
    timeoutId.current = setTimeout(() => {
      setCardSet((prev) => {
        const next = new Map(prev);
        const first = next.get(firstId);
        const second = next.get(secondId);
        const isMatch =
          !!first && !!second && first.cardNumber === second.cardNumber;

        if (first) {
          next.set(firstId, {
            ...first,
            isFlipped: false,
            isMatched: isMatch ? true : first.isMatched,
          });
        }
        if (second) {
          next.set(secondId, {
            ...second,
            isFlipped: false,
            isMatched: isMatch ? true : second.isMatched,
          });
        }
        return next;
      });

      setFlippedIds([]);
      lockRef.current = false;
    }, 1000);

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
        lockRef.current = false;
      }
    };
  }, [flippedIds]);

  useEffect(() => {
    return () => {
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-12 pt-20">
      <h1 className="text-4xl font-bold">Memory Game</h1>
      <div className="grid grid-cols-6 gap-4 px-10 py-10">
        {Array.from(cardSet.values()).map((card: CardType) => (
          <Card
            key={card.id}
            role="button"
            tabIndex={0}
            aria-pressed={card.isFlipped}
            aria-label={`Card ${card.id}`}
            className={cn(
              "flex items-center justify-center w-20 h-20 relative transition-all duration-500 [transform-style:preserve-3d] select-auto *:select-none cursor-pointer",
              {
                "opacity-0 pointer-events-none": card.isMatched,
                "[transform:rotateY(180deg)]": card.isFlipped,
              }
            )}
            onClick={() => {
              if (
                lockRef.current ||
                card.isFlipped ||
                card.isMatched ||
                flippedIds.length >= 2
              )
                return;

              setCardSet((prev) => {
                const next = new Map(prev);
                const existing = next.get(card.id);
                if (existing)
                  next.set(card.id, { ...existing, isFlipped: true });
                return next;
              });
              setFlippedIds((prev) => [...prev, card.id]);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                if (
                  lockRef.current ||
                  card.isFlipped ||
                  card.isMatched ||
                  flippedIds.length >= 2
                )
                  return;
                setCardSet((prev) => {
                  const next = new Map(prev);
                  const existing = next.get(card.id);
                  if (existing)
                    next.set(card.id, { ...existing, isFlipped: true });
                  return next;
                });
                setFlippedIds((prev) => [...prev, card.id]);
              }
            }}
          >
            <div className="absolute inset-0 h-full w-full flex justify-center items-center rounded-xl bg-inherit p-4 text-center [backface-visibility:hidden]">
              Flip
            </div>

            {/* Back side */}
            <div className="absolute inset-0 h-full w-full rounded-xl bg-inherit [backface-visibility:hidden] [transform:rotateY(180deg)] flex justify-center items-center text-2xl font-bold">
              {card.cardNumber}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
