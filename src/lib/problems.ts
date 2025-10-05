import { lazy, type LazyExoticComponent, type ReactElement } from "react";

export interface Problem {
  id: string;
  title: string;
  description?: string;
  path: string;
  theme: string;
  component: LazyExoticComponent<() => ReactElement>;
}

export const problems: Problem[] = [
  {
    id: "memory-game",
    title: "Memory Game",
    description: "A simple card-matching memory game",
    path: "/problems/memory-game",
    theme: "bubblegum",
    component: lazy(() => import("../pages/problems/MemoryGame")),
  },
];
