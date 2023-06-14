import NotesDetail from "./NotesDetail";
import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import { Note } from "./NotesListType";
import { Box } from "@mui/material";

function NotesList() {
  const [notes, setNotes] = useState<[]>();

  useEffect(() => {
    const getNotes = async () => {
      try {
        const response = await noteService.getAllNotes();
        if (response.status === 200) {
          const data = response.data;
          if (data.length >= 1) {
            setNotes(data);
          }
        }
      } catch (error) {}
    };
    getNotes();
  }, []);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        {notes ? (
          notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
        ) : (
          <p>No notes</p>
        )}
      </Box>
    </>
  );
}

export default NotesList;
