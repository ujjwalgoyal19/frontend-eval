// src/lib/theme.tsx
import React, { useEffect } from "react";
import { applyThemeMap, ThemeContext, type ThemeMap } from "../hooks/useTheme";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeName, setThemeName] = React.useState<string>(() => {
    try {
      return localStorage.getItem("theme") ?? "default";
    } catch {
      return "default";
    }
  });

  const [isDark, setIsDark] = React.useState<boolean>(() => {
    try {
      const stored = localStorage.getItem("darkMode");
      if (stored !== null) {
        return stored === "true";
      }
      // Default to dark mode
      return true;
    } catch {
      return true;
    }
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try {
      localStorage.setItem("darkMode", String(isDark));
    } catch {
      // ignore
    }
  }, [isDark]);

  useEffect(() => {
    let mounted = true;
    // dynamic import theme JSON (so bundle doesn't include all themes)
    import(`../themes/${themeName}.json`)
      .then((m) => {
        if (!mounted) return;
        const theme = (m.default || m) as ThemeMap;
        applyThemeMap(theme);
        try {
          localStorage.setItem("theme", themeName);
        } catch {
          // ignore
        }
      })
      .catch(() => {
        // fallback or handle missing theme
      });
    return () => {
      mounted = false;
    };
  }, [themeName]);

  return (
    <ThemeContext.Provider
      value={{ themeName, setTheme: setThemeName, isDark, setIsDark }}
    >
      {children}
    </ThemeContext.Provider>
  );
}
