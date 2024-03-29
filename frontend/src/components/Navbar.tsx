import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const user = useAuth();

  return (
    <Grid
      container
      spacing={2}
      sx={{
        display: "flex",
        width: "65vw",
        justifyContent: "space-between",
      }}
    >
      {/* <nav
        style={{
          display: "flex",
          // flexDirection: "column",
          width: "60vw",
          justifyContent: "space-between",
        }}
      > */}
      <Grid item xs={12} md={8}>
        <Typography
          component="h1"
          variant="h5"
          gutterBottom
          fontSize="30px"
          fontFamily="Caveat"
        >
          Note taking application
        </Typography>
      </Grid>
      {user?.token?.access && (
        <Grid item xs={12} md={4} sx={{ paddingTop: "0px" }}>
          <Button variant="contained" size="small">
            <Link to={"/dashboard/new"} style={{ fontSize: "13px" }}>
              Add note
            </Link>
          </Button>
        </Grid>
      )}

      {/* </nav> */}
    </Grid>
  );
}

export default Navbar;
