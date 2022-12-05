import { AddNoteInput } from "../../components/add-note-input/add-note-input.component";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../utils/public-api";
import { useContext } from "react";
import { LanguageContext } from "../../components/context/language.context";
import "./add-note.style.css";
export const AddNote = () => {
  const { langAsset } = useContext(LanguageContext);
  const navigate = useNavigate();
  const addNoteHandler = async (data) => {
    await addNote(data);
    navigate("/");
  };
  return (
    <div className="add-note-container">
      {langAsset.addNoteTitle}
      <AddNoteInput addNote={addNoteHandler} />
    </div>
  );
};
