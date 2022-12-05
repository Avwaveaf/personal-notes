import { useEffect, useState } from "react";
import { getArchivedNotes } from "../../utils/public-api";
import { Note } from "../../components/note/note.component";
import PropTypes from "prop-types";
import { useSearchParams } from "react-router-dom";
export const Archived = ({ searchString }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchNote = searchParams.get("search") || "";
  const [archivedNotes, setArchivedNotes] = useState(null);
  const [filteredArchiveNotes, setFilteredArchiveNotes] = useState(null);
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
        <div>
          {archivedNotes.map((e) => {
            return <Note key={e.id} data={e} archived={true} />;
          })}
        </div>
      );
    }
    if (filteredArchiveNotes && !filteredArchiveNotes.length) {
      return <div>no notes found</div>;
    }
    return (
      <div>
        {filteredArchiveNotes.map((e) => {
          return <Note key={e.id} data={e} archived={true} />;
        })}
      </div>
    );
  }
  return <div>archived note not found please add first</div>;
};
Archived.propTypes = {
  searchString: PropTypes.string,
};
