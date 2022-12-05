import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  currTheme: false,
  setCurrTheme: () => {},
  theme: "",
  setTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [currTheme, setCurrTheme] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    if (currTheme) {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }, [currTheme]);
  const value = {
    currTheme,
    setCurrTheme,
    theme,
  };
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
