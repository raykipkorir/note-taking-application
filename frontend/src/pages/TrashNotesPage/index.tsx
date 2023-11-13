import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import noteService from "../../api/services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState<[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const retrieveTrashNotes = async () => {
      setIsLoading(true);
      const response = await noteService.getTrashNotes();
      setIsLoading(false);
      if (response.status === 200) {
        const data = response.data;
        if (data.length >= 1) {
          setNotes(data);
        }
      }
    };
    retrieveTrashNotes();
  }, []);
  return (
    <div>
      <p>Notes thrown in the trash</p>
      {isLoading ? (
        <CircularProgress />
      ) : notes ? (
        notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
      ) : (
        <p>No notes in the trash</p>
      )}
    </div>
  );
}

export default index;
