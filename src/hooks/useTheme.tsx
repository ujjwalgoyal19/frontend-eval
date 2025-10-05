import { createContext, useContext } from "react";

export type ThemeMap = Record<string, string>;

export const ThemeContext = createContext({
  themeName: "default",
  setTheme: (name: string) => {
    console.log(name);
  },
  isDark: true,
  setIsDark: (dark: boolean) => {
    console.log(dark);
  },
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function applyThemeMap(
  theme: ThemeMap,
  root: HTMLElement = document.documentElement
) {
  Object.entries(theme).forEach(([k, v]) => root.style.setProperty(k, v));
}
