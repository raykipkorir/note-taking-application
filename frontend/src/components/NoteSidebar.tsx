import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotesIcon from "@mui/icons-material/Notes";
import PushPinIcon from "@mui/icons-material/PushPin";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Typography from "@mui/material/Typography";
import { useState, useEffect } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import authService from "../api/services/auth.services";

function NoteSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const [isSmallViewport, setIsSmallViewport] = useState(
    window.innerWidth > 600
  );

  const updateMedia = () => {
    setIsSmallViewport(window.innerWidth > 600);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });

  return (
    <>
      <Sidebar
        collapsed={isSmallViewport ? isCollapsed : true}
        backgroundColor="rgb(169,169,169)"
      >
        <Menu>
          <MenuItem
            icon={<MenuIcon />}
            onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Notes
            </Typography>
          </MenuItem>

          <MenuItem icon={<NotesIcon />} component={<Link to="/dashboard" />}>
            All
          </MenuItem>

          <MenuItem
            icon={<PushPinIcon />}
            component={<Link to={"/dashboard/pinned"} />}
          >
            Pinned
          </MenuItem>

          <MenuItem
            icon={<SaveAsIcon />}
            component={<Link to={"/dashboard/draft"} />}
          >
            Draft
          </MenuItem>

          <MenuItem
            icon={<RestoreFromTrashIcon />}
            component={<Link to={"/dashboard/trash"} />}
          >
            Trash
          </MenuItem>

          <button type="submit" onClick={authService.logout}>
            <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
          </button>
        </Menu>
      </Sidebar>
    </>
  );
}

export default NoteSidebar;
