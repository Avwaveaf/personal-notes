import { useState } from "react";
import { Outlet } from "react-router-dom";
import PropTypes from "prop-types";

export const SeachBar = ({ searchQuery }) => {
  const onChangeHandler = (value) => {
    searchQuery(value);
  };

  return (
    <div>
      <input
        type="search"
        placeholder="search your notes"
        onChange={(e) => {
          const searchText = e.target.value;
          onChangeHandler(searchText);
        }}
      />
      <Outlet />
    </div>
  );
};
SeachBar.propTypes = {
  searchQuery: PropTypes.func,
};
