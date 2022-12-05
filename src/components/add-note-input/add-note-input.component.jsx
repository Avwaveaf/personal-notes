import { useState } from "react";
import PropTypes from "prop-types";

export const AddNoteInput = ({ addNote }) => {
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
    <div>
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
          onChange={(e) => {
            e.preventDefault();
            inputChangeHandler(e.target.name, e.target.value);
          }}
        />
        <input
          type=""
          name="body"
          value={noteData.body}
          onChange={(e) => {
            e.preventDefault();
            inputChangeHandler(e.target.name, e.target.value);
          }}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

AddNoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};
