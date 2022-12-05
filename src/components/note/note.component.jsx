import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "./note.style.css";
export const Note = ({ data, onDelete, archived = false }) => {
  return (
    <div className="note-container">
      <span>
        <Link to={`detail-note/${data.id}`}>{data.title}</Link>
      </span>
      <span>{data.body}</span>
      <div>
        {archived ? (
          <button type="">unarchive</button>
        ) : (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(data.id);
            }}
          >
            delete
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
};
