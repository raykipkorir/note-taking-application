import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const retrieveTrashNotes = async () => {
      const response = await noteService.getTrashNotes();
      if (response.status === 200) {
        const data = response.data;
        setNotes(data);
      }
    };
    retrieveTrashNotes();
  }, []);
  return (
    <div>
      <p>Notes throw in trash</p>
      {notes ? (
        <ul>
          {notes.map((note: Note) => {
            return <li key={note.id}>{<NotesDetail note={note} />}</li>;
          })}
        </ul>
      ) : (
        <p>No notes in the trash</p>
      )}
    </div>
  );
}

export default index;
