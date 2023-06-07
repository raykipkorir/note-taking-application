import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import NoteSidebar from "../components/NoteSidebar";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      <NoteSidebar />
      <div style={{ marginLeft: "50px" }}>
        <Navbar />
        <div style={{ height: "100vh", marginTop: "30px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
