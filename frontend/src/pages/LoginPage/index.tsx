import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header";
import authService from "../../services/auth.services";

type Inputs = {
  email: string;
  password: string;
};

function index() {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState } = useForm<Inputs>();
  const { errors } = formState;

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await authService.login(data.email, data.password);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      localStorage.setItem("user", JSON.stringify(data));
      window.location.reload();
      navigate("/dashboard");
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
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
        <Header />
        <Typography gutterBottom variant="h4" component="h1">
          Welcome
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={2} sx={{ width: "300px" }}>
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

            <Stack>
              <FormControl
                variant="outlined"
                size="small"
                error={!!errors.password}
                required
              >
                <InputLabel htmlFor="outlined-adornment-password">
                  Password
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-password"
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </FormControl>
              <Typography color="error" fontSize="12px">
                {errors.password?.message}
              </Typography>
            </Stack>
            <Button variant="contained" type="submit">
              Login
            </Button>
          </Stack>
        </form>
        <p>
          Don't have an account? <Link to={"/signup"}>Sign up</Link>
        </p>
      </Box>
    </>
  );
}

export default index;
