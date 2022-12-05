import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import "./search-bar.style.css";
import { useContext } from "react";
import { LanguageContext } from "../context/language.context";

export const SeachBar = ({ searchQuery }) => {
  const { langAsset } = useContext(LanguageContext);
  const onChangeHandler = (value) => {
    searchQuery(value);
  };

  return (
    <div>
      <div className="input-container">
        <input
          type="search"
          placeholder={langAsset.searchNote}
          onChange={(e) => {
            const searchText = e.target.value;
            onChangeHandler(searchText);
          }}
        />
      </div>
      <Outlet />
    </div>
  );
};
SeachBar.propTypes = {
  searchQuery: PropTypes.func,
};
