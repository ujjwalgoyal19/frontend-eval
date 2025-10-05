import { useEffect } from "react";
import MemoryGameCore from "../../features/memory-game/MemoryGameCore";
import { useTheme } from "../../hooks/useTheme";

export default function MemoryGame() {
  const { setTheme } = useTheme();

  useEffect(() => {
    setTheme("bubblegum");

    return () => setTheme("default");
  }, [setTheme]);

  return (
    <div className="min-h-screen">
      <MemoryGameCore />
    </div>
  );
}
