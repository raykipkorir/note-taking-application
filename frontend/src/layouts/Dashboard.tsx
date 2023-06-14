import { styled } from "@mui/material/styles";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import NoteSidebar from "../components/NoteSidebar";

function Dashboard() {
  const NotesBox = styled("div")(({ theme }) => ({
    marginLeft: "6px",
    [theme.breakpoints.up("sm")]: {
      marginLeft: "50px",
    },
  }));

  return (
    <div style={{ display: "flex" }}>
      <NoteSidebar />
      <NotesBox>
        <Navbar />
        <div style={{ height: "100vh", marginTop: "30px" }}>
          <Outlet />
        </div>
      </NotesBox>
    </div>
  );
}

export default Dashboard;
