import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
export const Navigation = ({ logOut, name }) => {
  return (
    <nav>
      <span>{name}</span>
      <Link to="/">Home</Link>
      <button type="" onClick={logOut}>
        Log Out
      </button>
      <Link to="/add-note">Add Note</Link>
      <Link to="/archived">Archived</Link>
    </nav>
  );
};
Navigation.propTypes = {
  logOut: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};
