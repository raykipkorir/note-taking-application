import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type Inputs = {
  userType: string;
  name: string;
  email: string;
  password: string;
  re_password: string;
};

function index() {
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} sx={{ width: "300px" }}>
            <TextField
              label="Name"
              id="name"
              size="small"
              error={!!errors.name}
              required
              helperText={errors.name?.message}
              {...register("name", { required: "Name is required" })}
            />
            <TextField
              type="text"
              id="email"
              label="Email"
              size="small"
              error={!!errors.email}
              helperText={errors.email?.message}
              required
              {...register("email", {
                required: { value: true, message: "Email is required" },
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Invalid email format",
                },
              })}
            />
            <TextField
              id="password"
              label="Password"
              type="password"
              size="small"
              required
              error={!!errors.password}
              helperText={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />
            <TextField
              id="re_password"
              label="Confirm password"
              type="password"
              size="small"
              error={!!errors.re_password}
              helperText={errors.re_password?.message}
              required
              {...register("re_password", {
                required: "Confirm password is required",
                // validate: {},
              })}
            />
            <Button variant="contained" type="submit">
              Sign up
            </Button>
          </Stack>
        </form>
        <p>
          Already have an account? <Link to={"/"}>Login</Link>
        </p>
      </Box>
    </>
  );
}

export default index;
