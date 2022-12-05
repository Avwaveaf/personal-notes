import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LanguageContext } from "../../components/context/language.context";
import { getNote, unarchiveNote } from "../../utils/public-api";
export const ArchivedDetail = () => {
  const { langAsset } = useContext(LanguageContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [noteDetail, setNoteDetail] = useState(null);
  const onArchiveHandler = async () => {
    await unarchiveNote(id);
    navigate("/");
  };
  useEffect(() => {
    const fetchNote = async () => {
      const { data } = await getNote(id);
      setNoteDetail(data);
    };
    fetchNote();
  }, []);
  if (noteDetail) {
    return (
      <div>
        <h1>{noteDetail.title}</h1>
        <div>{noteDetail.body}</div>
        <button
          onClick={(e) => {
            e.preventDefault();
            onArchiveHandler(id);
          }}
        >
          {langAsset.unarchive}
        </button>
      </div>
    );
  }
  return <div>Loading ....</div>;
};
