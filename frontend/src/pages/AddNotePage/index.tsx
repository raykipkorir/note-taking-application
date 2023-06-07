import { useForm, SubmitHandler } from "react-hook-form";
import TextField from "@mui/material/TextField/TextField";
import Button from "@mui/material/Button/Button";
import Box from "@mui/material/Box/Box";
import Stack from "@mui/material/Stack/Stack";
type Inputs = {
  title: string;
  content: string;
};

function index() {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
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
          <Button variant="contained" type="submit">
            Add Note
          </Button>
        </Stack>
      </form>
    </Box>
  );
}

export default index;
