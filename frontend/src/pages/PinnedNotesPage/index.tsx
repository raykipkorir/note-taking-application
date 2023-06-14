import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState<[]>();
  useEffect(() => {
    const retrievePinnedNotes = async () => {
      const response = await noteService.getPinnedNotes();
      if (response.status === 200) {
        const data = response.data;
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
      {notes ? (
        notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
      ) : (
        <p>No pinned notes</p>
      )}
    </>
  );
}

export default index;
