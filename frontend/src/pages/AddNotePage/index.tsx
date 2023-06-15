import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack/Stack";
import TextField from "@mui/material/TextField/TextField";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import noteService from "../../services/notes.services";

type Inputs = {
  title: string;
  content: string;
};

function index() {
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  const navigate = useNavigate();

  const onSubmit = (data: Inputs, event: any) => {
    const clickedButtonName = event?.nativeEvent.submitter.name;

    const createNote = async () => {
      try {
        setIsLoading(true);
        const response = await noteService.createNote(
          data.title,
          data.content,
          clickedButtonName === "draftNote" && true
        );
        setIsLoading(false);
        if (response.status === 201) {
          clickedButtonName === "draftNote"
            ? navigate("/dashboard/draft")
            : navigate("/dashboard");
        }
      } catch (error) {}
    };
    createNote();
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={2} sx={{ width: "500px" }}>
          <TextField
            id="title"
            label="Title"
            error={!!errors.title}
            helperText={errors.title?.message}
            {...register("title", { required: "Title is required" })}
          />
          <TextField
            id="content"
            label="Note"
            multiline
            rows={6}
            placeholder="Write a note..."
            variant="filled"
            error={!!errors.content}
            helperText={errors.content?.message}
            {...register("content", { required: "Content is required" })}
          />
          <Box sx={{ display: "flex", gap: "8px" }}>
            <Button variant="contained" type="submit" name="addNote">
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Add Note"
              )}
            </Button>
            <Button
              variant="contained"
              size="small"
              name="draftNote"
              type="submit"
            >
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Draft Note"
              )}
            </Button>
          </Box>
        </Stack>
      </form>
    </Box>
  );
}

export default index;
