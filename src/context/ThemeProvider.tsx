import { createContext, useState, useEffect, ReactNode } from "react";

// Define the type for the ThemeContext
interface ThemeContextType {
  mode: string;
  setMode: (mode: string) => void;
}

// Create the ThemeContext with an initial value of undefined
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Define the ThemeProvider component
function ThemeProvider({ children }: { children: ReactNode }) {
  // Fetch the initial theme mode from local storage or default to "system"

  const initialMode =
    typeof window !== "undefined"
      ? window.localStorage.getItem("theme") || "system"
      : "system";

  // Set the initial state based on the stored mode or "system"
  const [mode, setMode] = useState(initialMode);

  // Effect to handle changes in the theme
  useEffect(() => {
    const handleThemeChange = async () => {
      // Fetch actual mode based on system preference or user selection
      const actualMode =
        mode === "system"
          ? window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light"
          : mode;

      // Remove previous theme class and add the new one
      document.documentElement.classList.remove(
        actualMode === "dark" ? "light" : "dark"
      );
      document.documentElement.classList.add(actualMode);

      // Update local storage
      localStorage.setItem("theme", actualMode);
    };

    handleThemeChange();
  }, [mode]);

  // Effect to handle changes in system mode
  useEffect(() => {
    const mediaQuery =
      window && window.matchMedia("(prefers-color-scheme: dark)");
    const systemModeListener = (e: MediaQueryListEvent) => {
      if (mode === "system") {
        setMode(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", systemModeListener);
    return () => {
      mediaQuery.removeEventListener("change", systemModeListener);
    };
  }, [mode]);

  // Render the ThemeContext.Provider with the current mode and setMode function
  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export { ThemeProvider, ThemeContext };
