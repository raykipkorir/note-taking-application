import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState<[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrievePinnedNotes = async () => {
      setIsLoading(true);
      const response = await noteService.getPinnedNotes();
      if (response.status === 200) {
        const data = response.data;
        setIsLoading(false);
        if (data.length >= 1) {
          setNotes(data);
        }
      }
    };
    retrievePinnedNotes();
  }, []);
  return (
    <>
      <p>Pinned notes</p>
      {isLoading ? (
        <CircularProgress />
      ) : notes ? (
        notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
      ) : (
        <p>No pinned notes</p>
      )}
    </>
  );
}

export default index;
