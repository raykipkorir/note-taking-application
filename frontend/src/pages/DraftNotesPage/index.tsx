import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const retrieveDraftNotes = async () => {
      const response = await noteService.getDraftNotes();
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    };
    retrieveDraftNotes();
  }, []);
  return (
    <div>
      {notes.map((note: Note) => {
        return <p>{note.title}</p>;
      })}
    </div>
  );
}

export default index;
