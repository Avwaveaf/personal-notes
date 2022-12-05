import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import "./navbar.style.css";
import { useContext } from "react";
import { LanguageContext } from "../context/language.context";
import { ThemeContext } from "../context/theme.context";
export const Navigation = ({ logOut, name }) => {
  const { langAsset, language, setLanguage } = useContext(LanguageContext);
  const { setCurrTheme, currTheme } = useContext(ThemeContext);
  const languageHandler = () => {
    setLanguage(!language);
  };
  const themeHandler = () => {
    setCurrTheme(!currTheme);
  };

  return (
    <nav className="navbar-container">
      <span>{name}</span>
      <Link to="/">{langAsset.home}</Link>

      <Link to="/add-note">{langAsset.addNote}</Link>
      <Link to="/archived">{langAsset.archived}</Link>
      <button onClick={languageHandler}>{langAsset.language}</button>
      <button onClick={themeHandler}>{langAsset.theme}</button>
      <button type="" onClick={logOut}>
        {langAsset.logOut}
      </button>
    </nav>
  );
};
Navigation.propTypes = {
  logOut: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
