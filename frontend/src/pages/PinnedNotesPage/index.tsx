import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    const retrievePinnedNotes = async () => {
      const response = await noteService.getPinnedNotes();
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
        console.log(data);
      }
    };
    retrievePinnedNotes();
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
