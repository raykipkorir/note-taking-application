import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.services";

type Inputs = {
  name: string;
  email: string;
  password: string;
  re_password: string;
};

function index() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const createUser = async () => {
      try {
        setIsLoading(true);
        const response = await authService.signUp(
          data.name,
          data.email,
          data.password,
          data.re_password
        );
        if (response.status === 201) {
          // login the user
          const loginResponse = await authService.login(
            data.email,
            data.password
          );
          if (loginResponse.status === 200) {
            setIsLoading(false);
            localStorage.setItem("user", JSON.stringify(loginResponse.data));
            window.location.reload();
            navigate("/dashboard");
          }
        }
      } catch (error) {
        setIsLoading(false);
        if (axios.isAxiosError(error)) {
          if (
            error.response?.status === 400 &&
            error.response.data.email?.[0] ===
              "user with this email already exists."
          ) {
            setError("email", {
              message: "User with this email address already exists",
            });
          }
          if (
            error.response?.status === 400 &&
            error.response.data.non_field_errors?.[0] ===
              "The two password fields didn't match."
          ) {
            setError("re_password", { message: "Password mismatch" });
          }
        }
      }
    };
    createUser();
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
              })}
            />
            <Button variant="contained" type="submit">
              {isLoading ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Sign up"
              )}
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
