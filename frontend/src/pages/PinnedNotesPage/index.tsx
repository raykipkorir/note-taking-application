import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const retrievePinnedNotes = async () => {
      const response = await noteService.getPinnedNotes();
      if (response.status === 200) {
        const data = response.data;
        setNotes(data);
      }
    };
    retrievePinnedNotes();
  }, []);
  return (
    <>
      <p>Pinned notes</p>
      {notes ? (
        <ul>
          {notes.map((note: Note) => {
            return <li key={note.id}>{<NotesDetail note={note} />}</li>;
          })}
        </ul>
      ) : (
        <p>No pinned notes</p>
      )}
    </>
  );
}

export default index;
