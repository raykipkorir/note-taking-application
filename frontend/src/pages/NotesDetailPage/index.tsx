import PushPinIcon from "@mui/icons-material/PushPin";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router";
import { Link } from "react-router-dom";
import noteService from "../../services/notes.services";
import { Note } from "../AllNotesPage/NotesListType";

function index() {
  const [note, setNote] = useState<Note>();
  const { id } = useParams();
  const {
    state: { from },
  } = useLocation();
  const navigate = useNavigate();

  const handlePinClick = async () => {
    try {
      const response = await noteService.pinNote(note?.id, !note?.pinned);
      if (response.status === 200) {
        if (from === "pinned") {
          navigate(`/dashboard/pinned`);
        } else {
          setNote(response.data);
        }
      }
    } catch (error) {}
  };

  const handleTrashClick = async () => {
    try {
      const response = await noteService.throwNoteToTrash(
        note?.id,
        !note?.trash
      );
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {}
  };

  const handlePublishDraft = async () => {
    try {
      const response = await noteService.draftNote(note?.id, !note?.draft);
      if (response.status === 200) {
        navigate("/dashboard");
      }
    } catch (error) {}
  };
  const handleDeleteClick = async () => {
    try {
      const response = await noteService.deleteNote(note?.id);
      if (response.status === 204) {
        navigate("/dashboard/trash");
      }
    } catch (error) {}
  };

  useEffect(() => {
    const getNote = async () => {
      try {
        const response = await noteService.getNoteById(id);
        if (response.status === 200) {
          setNote(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 404) {
            navigate("/dashboard");
          }
        }
      }
    };
    getNote();
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component="h1" variant="h5">
          {note?.title}
        </Typography>
        <Box sx={{ display: "flex", gap: "5px" }}>
          <Button type="submit" onClick={handlePinClick}>
            <Tooltip title={note?.pinned ? "Unpin" : "Pin"}>
              <PushPinIcon />
            </Tooltip>
          </Button>
          <Link to={`/dashboard/${note?.id}/update`}>
            <Button
              variant="contained"
              type="submit"
              size="small"
              sx={{ marginRight: "5px" }}
            >
              Edit
            </Button>
          </Link>
        </Box>
      </Box>

      <p>{note?.content}</p>
      <Button
        variant="contained"
        color="error"
        size="small"
        sx={{ marginTop: "15px", marginRight: "8px" }}
        onClick={note?.trash ? handleDeleteClick : handleTrashClick}
      >
        {note?.trash ? "Delete note" : "Throw in trash"}
      </Button>
      {note?.draft && (
        <Button
          variant="contained"
          size="small"
          onClick={handlePublishDraft}
          sx={{ marginTop: "15px" }}
        >
          Publish
        </Button>
      )}
    </div>
  );
}

export default index;
