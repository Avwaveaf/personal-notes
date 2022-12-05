import { useContext, useEffect, useState } from "react";
import { getArchivedNotes, unarchiveNote } from "../../utils/public-api";
import { Note } from "../../components/note/note.component";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
import { LanguageContext } from "../../components/context/language.context";
import { Loading } from "../../components/loading/loading.component";
import "./archived.style.css";
export const Archived = ({ searchString }) => {
  const { langAsset } = useContext(LanguageContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchNote = searchParams.get("search") || "";
  const [archivedNotes, setArchivedNotes] = useState(null);
  const [filteredArchiveNotes, setFilteredArchiveNotes] = useState(null);
  const onUnArchiveHandler = async (id) => {
    await unarchiveNote(id);
    const { data } = await getArchivedNotes();
    setArchivedNotes(data);
  };
  useEffect(() => {
    if (archivedNotes) {
      const a = archivedNotes.filter((note) => {
        return note.title.toLocaleLowerCase().includes(searchNote);
      });
      setFilteredArchiveNotes(a);
    }
  }, [archivedNotes]);

  useEffect(() => {
    const fetchArchivedNotes = async () => {
      const { data } = await getArchivedNotes();
      setArchivedNotes(data);
    };
    fetchArchivedNotes();
  }, []);
  useEffect(() => {
    if (archivedNotes) {
      const filteredArchive = archivedNotes.filter((note) =>
        note.title.toLocaleLowerCase().includes(searchString)
      );
      setFilteredArchiveNotes(filteredArchive);
      setSearchParams({ search: searchString });
    }
  }, [searchString]);
  if (archivedNotes) {
    if (!filteredArchiveNotes) {
      return (
        <div className="archive-notes-container">
          {archivedNotes.map((e) => {
            return (
              <Note
                key={e.id}
                data={e}
                archived={true}
                onUnArchive={onUnArchiveHandler}
              />
            );
          })}
        </div>
      );
    }
    if (filteredArchiveNotes && !filteredArchiveNotes.length) {
      return <div>{langAsset.searchNotFound}</div>;
    }
    return (
      <div className="archive-notes-container">
        {filteredArchiveNotes.map((e) => {
          return (
            <Note
              key={e.id}
              data={e}
              archived={true}
              onUnArchive={onUnArchiveHandler}
            />
          );
        })}
      </div>
    );
  }
  return <Loading />;
};
Archived.propTypes = {
  searchString: PropTypes.string,
};
