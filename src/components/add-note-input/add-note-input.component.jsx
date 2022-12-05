import { useContext, useState } from "react";
import PropTypes from "prop-types";
import { LanguageContext } from "../context/language.context";

import "./add-note-input.style.css";

export const AddNoteInput = ({ addNote }) => {
  const { langAsset } = useContext(LanguageContext);
  const [noteData, setNoteData] = useState({
    title: "",
    body: "",
  });
  const inputChangeHandler = (name, value) => {
    setNoteData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  return (
    <div className="add-note-input-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addNote(noteData);
        }}
      >
        <input
          type=""
          name="title"
          value={noteData.title}
          placeholder={langAsset.addNoteInfoTitle}
          onChange={(e) => {
            e.preventDefault();
            inputChangeHandler(e.target.name, e.target.value);
          }}
        />
        <input
          type=""
          name="body"
          value={noteData.body}
          placeholder={langAsset.addNoteInfoBody}
          onChange={(e) => {
            e.preventDefault();
            inputChangeHandler(e.target.name, e.target.value);
          }}
        />
        <button type="submit">{langAsset.addButton}</button>
      </form>
    </div>
  );
};

AddNoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};
