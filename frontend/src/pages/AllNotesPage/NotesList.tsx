import { Box } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect, useState } from "react";
import noteService from "../../services/notes.services";
import NotesDetail from "./NotesDetail";
import { Note } from "./NotesListType";

function NotesList() {
  const [notes, setNotes] = useState<[]>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getNotes = async () => {
      try {
        setIsLoading(true);
        const response = await noteService.getAllNotes();
        setIsLoading(false);
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
        {isLoading ? (
          <CircularProgress />
        ) : notes ? (
          notes.map((note: Note) => <NotesDetail key={note.id} note={note} />)
        ) : (
          <p>No notes</p>
        )}
      </Box>
    </>
  );
}

export default NotesList;
