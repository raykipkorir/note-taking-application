import NotesDetail from "./NotesDetail";
import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import { Note } from "./NotesListType";

function NotesList() {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await noteService.getAllNotes();
        if (response.status === 200) {
          const data = response.data;
          setNotes(data);
        }
      } catch (error) {}
    };
    getNotes();
  }, []);
  return (
    <div>
      {notes ? (
        <ul>
          {notes.map((note: Note) => {
            return <li key={note.id}>{<NotesDetail note={note} />}</li>;
          })}
        </ul>
      ) : (
        <p>No notes</p>
      )}
    </div>
  );
}

export default NotesList;
