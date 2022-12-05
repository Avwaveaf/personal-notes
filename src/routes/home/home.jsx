import { useEffect, useState } from "react";
import { getActiveNotes, deleteNote } from "../../utils/public-api";
import { Note } from "../../components/note/note.component";

import PropTypes from "prop-types";
import { useParams, useSearchParams } from "react-router-dom";

export const Home = ({ searchString }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchNote = searchParams.get("search") || "";
  const [notes, setNotes] = useState(null);
  const [filteredNotes, setFilteredNotes] = useState(null);
  const onDeleteHandler = async (id) => {
    await deleteNote(id);
    const { data } = await getActiveNotes();
    setNotes(data);
  };

  useEffect(() => {
    if (notes) {
      const a = notes.filter((note) => {
        return note.title.toLocaleLowerCase().includes(searchNote);
      });
      setFilteredNotes(a);
    }
  }, [notes]);
  useEffect(() => {
    if (notes) {
      const filteredNote = notes.filter((note) =>
        note.title
          .toLocaleLowerCase()
          .includes(searchString.toLocaleLowerCase())
      );
      setFilteredNotes(filteredNote);
      setSearchParams({ search: searchString });
    }
  }, [searchString]);

  useEffect(() => {
    const fetchNotes = async () => {
      const { data } = await getActiveNotes();
      setNotes(data);
    };
    fetchNotes();
  }, []);
  if (notes && !filteredNotes) {
    return (
      <div>
        <h1>Your Notes</h1>
        {notes.map((e) => {
          return <Note key={e.id} data={e} onDelete={onDeleteHandler} />;
        })}
      </div>
    );
  }
  if (filteredNotes && !filteredNotes.length) {
    return <div>no notes found</div>;
  }
  if (filteredNotes) {
    return (
      <div>
        <h1>Your Notes</h1>
        {filteredNotes.map((e) => {
          return <Note key={e.id} data={e} onDelete={onDeleteHandler} />;
        })}
      </div>
    );
  }
  return <div>Loading ...</div>;
};
Home.propTypes = {
  searchString: PropTypes.string,
};
