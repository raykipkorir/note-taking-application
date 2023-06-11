import Box from "@mui/material/Box/Box";
import { Link } from "react-router-dom";
import { Note } from "./NotesListType";

type NotesDetailProps = {
  note: Note;
};

function NotesDetail({ note }: NotesDetailProps) {
  return (
    <Box sx={{ border: "1px solid black", borderRadius: "5px" }}>
      <h4>
        <Link to={`/dashboard/${note.id}`} state={{ note }}>
          {note.title}
        </Link>
      </h4>
      <p>{note.content}...</p>
    </Box>
  );
}

export default NotesDetail;
