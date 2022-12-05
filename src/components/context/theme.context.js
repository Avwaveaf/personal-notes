import { createContext, useEffect, useState } from "react";
import { darkTheme, lightTheme, cardLight, cardDark } from "../../utils/theme";

export const ThemeContext = createContext({
  currTheme: false,
  setCurrTheme: () => {},
  theme: "",
  setTheme: () => {},
});

export const ThemeContextProvider = ({ children }) => {
  const [currTheme, setCurrTheme] = useState(false);
  const [theme, setTheme] = useState({});
  useEffect(() => {
    if (currTheme) {
      setTheme({ theme: lightTheme, card: cardLight });
    } else {
      setTheme({ theme: darkTheme, card: cardDark });
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
