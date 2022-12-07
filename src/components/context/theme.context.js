import { createContext, useState } from "react";

export const ThemeContext = createContext({
  theme: null,
  setTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    () => localStorage.getItem("darkMode") || false
  );

  const value = {
    theme,
    setTheme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
