import { useContext, useEffect, useState } from "react";
import { getActiveNotes, deleteNote } from "../../utils/public-api";
import "./home.style.css";
import { Note } from "../../components/note/note.component";

import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { LanguageContext } from "../../components/context/language.context";
import { ThemeContext } from "../../components/context/theme.context";

export const Home = ({ searchString }) => {
  const { langAsset } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
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
      <div className={`home-container ${theme}`}>
        <h1>{langAsset.activeNotesTitle}</h1>
        <div className="notes-container">
          {notes.map((e) => {
            return <Note key={e.id} data={e} onDelete={onDeleteHandler} />;
          })}
        </div>
      </div>
    );
  }
  if (filteredNotes && !filteredNotes.length) {
    return <div>{langAsset.notFound}</div>;
  }
  if (filteredNotes) {
    return (
      <div className={`home-container ${theme}`}>
        <h1>{langAsset.activeNotesTitle}</h1>
        <div className="notes-container">
          {filteredNotes.map((e) => {
            return <Note key={e.id} data={e} onDelete={onDeleteHandler} />;
          })}
        </div>
      </div>
    );
  }
  return <div>Loading ...</div>;
};
Home.propTypes = {
  searchString: PropTypes.string,
};
