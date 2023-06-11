import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const retrieveTrashNotes = async () => {
      const response = await noteService.getTrashNotes();
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    };
    retrieveTrashNotes();
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
