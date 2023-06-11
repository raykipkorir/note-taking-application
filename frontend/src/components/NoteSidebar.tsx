import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import NotesIcon from "@mui/icons-material/Notes";
import PushPinIcon from "@mui/icons-material/PushPin";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { Menu, MenuItem, Sidebar } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import authService from "../services/auth.services";

function NoteSidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <>
      <Sidebar collapsed={isCollapsed} backgroundColor="rgb(169,169,169)">
        <Menu>
          <MenuItem
            icon={<MenuIcon />}
            onClick={() => setIsCollapsed((isCollapsed) => !isCollapsed)}
          >
            <Typography variant="h5" component="h1" gutterBottom>
              Notes
            </Typography>
          </MenuItem>
          <Link to={"/dashboard"}>
            <MenuItem icon={<NotesIcon />}>All</MenuItem>
          </Link>
          <Link to={"/dashboard/pinned"}>
            <MenuItem icon={<PushPinIcon />}>Pinned</MenuItem>
          </Link>
          <Link to={"/dashboard/draft"}>
            <MenuItem icon={<SaveAsIcon />}>Draft</MenuItem>
          </Link>
          <Link to={"/dashboard/trash"}>
            <MenuItem icon={<RestoreFromTrashIcon />}>Trash</MenuItem>
          </Link>
          <button type="submit" onClick={authService.logout}>
            <MenuItem icon={<LogoutIcon />}>Logout</MenuItem>
          </button>
        </Menu>
      </Sidebar>
    </>
  );
}

export default NoteSidebar;
