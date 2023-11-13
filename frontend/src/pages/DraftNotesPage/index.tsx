import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import noteService from "../../api/services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState<[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrieveDraftNotes = async () => {
      setIsLoading(true);
      const response = await noteService.getDraftNotes();
      setIsLoading(false);
      if (response.status === 200) {
        const data = response.data;
        if (data.length >= 1) {
          setNotes(data);
        }
      }
    };
    retrieveDraftNotes();
  }, []);
  return (
    <div>
      <p>Draft notes</p>
      {isLoading ? (
        <CircularProgress />
      ) : notes ? (
        notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
      ) : (
        <p>No draft notes</p>
      )}
    </div>
  );
}

export default index;
