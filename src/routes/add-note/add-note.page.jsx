import { AddNoteInput } from "../../components/add-note-input/add-note-input.component";
import { useNavigate } from "react-router-dom";
import { addNote } from "../../utils/public-api";
export const AddNote = () => {
  const navigate = useNavigate();
  const addNoteHandler = async (data) => {
    await addNote(data);
    navigate("/");
  };
  return (
    <div>
      im add note page
      <AddNoteInput addNote={addNoteHandler} />
    </div>
  );
};
