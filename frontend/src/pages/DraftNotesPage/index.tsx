import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState<[]>();

  useEffect(() => {
    const retrieveDraftNotes = async () => {
      const response = await noteService.getDraftNotes();
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
      {notes ? (
        notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
      ) : (
        <p>No draft notes</p>
      )}
    </div>
  );
}

export default index;
