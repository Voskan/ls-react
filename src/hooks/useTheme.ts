import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";

export function useTheme() {
  // Use the useContext hook to get the current context value
  const context = useContext(ThemeContext);

  // If the context is undefined, throw an error
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  // Return the context value
  return context;
}
