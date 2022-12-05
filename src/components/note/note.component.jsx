import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { LanguageContext } from "../context/language.context";
import "./note.style.css";
export const Note = ({ data, onDelete, archived = false, onUnArchive }) => {
  const { langAsset } = useContext(LanguageContext);
  return (
    <div className="note-container">
      <span>
        <Link
          to={!archived ? `detail-note/${data.id}` : `detail-note/${data.id}`}
        >
          {data.title}
        </Link>
      </span>
      <span>{data.body}</span>
      <div>
        {archived ? (
          <button
            onClick={(e) => {
              e.preventDefault();
              onUnArchive(data.id);
            }}
          >
            {langAsset.unarchive}
          </button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(data.id);
            }}
          >
            {langAsset.delete}
          </button>
        )}
      </div>
    </div>
  );
};

Note.propTypes = {
  data: PropTypes.object.isRequired,
  onDelete: PropTypes.func,
  archived: PropTypes.bool,
  onUnArchive: PropTypes.func,
};
