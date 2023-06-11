import NotesDetail from "./NotesDetail";
import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import { Note } from "./NotesListType";

function NotesList() {
  const [notes, setNotes] = useState([]);
  console.log(notes);
  useEffect(() => {
    const getNotes = async () => {
      const response = await noteService.getAllNotes();
      if (response.ok) {
        const data = await response.json();
        setNotes(data);
      }
    };
    getNotes();
  }, []);
  return (
    <div>
      {notes ? (
        <ul>
          {notes.map((note: Note) => {
            return <li>{<NotesDetail key={note.id} note={note} />}</li>;
          })}
        </ul>
      ) : (
        <p>No notes</p>
      )}
    </div>
  );
}

export default NotesList;
