import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import Stack from "@mui/material/Stack/Stack";
import TextField from "@mui/material/TextField/TextField";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import noteService from "../../services/notes.services";
import { Note } from "../AllNotesPage/NotesListType";
import axios from "axios";

type Inputs = {
  title: string;
  content: string;
};

function index() {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;
  const { id } = useParams();
  const [note, setNote] = useState<Note>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const updateNote = async () => {
      try {
        const response = await noteService.updateNote(
          id,
          data.title,
          data.content
        );
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {}
    };
    updateNote();
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
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} sx={{ width: "500px" }}>
          <TextField
            id="title"
            placeholder="Title"
            multiline
            variant="filled"
            defaultValue={note?.title}
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title", {
              required: { value: true, message: "Title is required" },
            })}
          />
          <TextField
            id="content"
            multiline
            rows={6}
            placeholder="Write a note..."
            variant="filled"
            defaultValue={note?.content}
            error={!!errors.content}
            helperText={errors.content?.message}
            {...register("content", { required: "Content is required" })}
          />
          <Button variant="contained" type="submit">
            Update Note
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default index;
