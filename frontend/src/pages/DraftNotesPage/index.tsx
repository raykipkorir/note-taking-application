import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "../AllNotesPage/NotesDetail";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const retrieveDraftNotes = async () => {
      const response = await noteService.getDraftNotes();
      if (response.status === 200) {
        const data = response.data;
        setNotes(data);
      }
    };
    retrieveDraftNotes();
  }, []);
  return (
    <div>
      <p>Draft notes</p>
      {notes ? (
        <ul>
          {notes.map((note: Note) => {
            return <li key={note.id}>{<NotesDetail note={note} />}</li>;
          })}
        </ul>
      ) : (
        <p>No draft notes</p>
      )}
    </div>
  );
}

export default index;
