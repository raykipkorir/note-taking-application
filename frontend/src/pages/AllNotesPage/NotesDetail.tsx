import Paper from "@mui/material/Paper/Paper";
import Typography from "@mui/material/Typography/Typography";
import { Link } from "react-router-dom";
import { Note } from "./NotesListType";

type NotesDetailProps = {
  note: Note;
};

function NotesDetail({ note }: NotesDetailProps) {
  const url = window.location.href;
  const previousUrl = url.split("/").slice(-1)[0];

  return (
    <>
      <Link to={`/dashboard/${note.id}`} state={{ from: `${previousUrl}` }}>
        <Paper
          sx={{
            padding: "8px",
            maxWidth: 400,
            marginBottom: "8px",
          }}
          elevation={3}
        >
          <Typography
            variant="h5"
            component="h2"
            fontSize="20px"
            fontWeight="bold"
            sx={{ marginBottom: "3px" }}
          >
            {note.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{ whiteSpace: "pre-line" }}
            fontSize="17px"
            fontWeight="5px"
          >
            {note.content}
          </Typography>
        </Paper>
      </Link>
    </>
  );
}

export default NotesDetail;
