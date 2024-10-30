import {
  AppBar,
  Backdrop,
  Box,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/color";
import {
  Add as AddIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import NotificationsIcon from '@mui/icons-material/NotificationsNone';
// import SearchDialoge from '../specific/Search'

const SearchDialoge = lazy(() => import("../specific/Search"));
const NotificationDialoge = lazy(() => import("../specific/Notifications"));
const NewGroupDialog = lazy(() => import("../specific/NewGroup"));

function Header() {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
    console.log("Mobile Menu");
  };

  const openSearchDialoge = () => {
    setIsSearch((prev) => !prev);
    console.log("Search Dialogue",isSearch,isNotification);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
    console.log("New Group");
  };

  const navigateToGroup = () => {
    console.log("Navigate to Group");
    navigate("/groups");
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
    console.log("Notification Clicked",isNotification);
  };

  const logoutHandler = () => {
    // TODO: Implement logout logic
    console.log("User logged out");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              chattu
            </Typography>
            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn
                title={"search"}
                onClick={openSearchDialoge}
                icon={<SearchIcon />}
              />

              <IconBtn
                title={"new group"}
                onClick={openNewGroup}
                icon={<AddIcon />}
              />

              <IconBtn
                title={"manage groups"}
                onClick={navigateToGroup}
                icon={<GroupIcon />}
              />

              <IconBtn
                title={"notification"}
                onClick={openNotification}
                icon={<NotificationsIcon />}
              />

              <IconBtn
                title={"logout"}
                onClick={logoutHandler}
                icon={<LogoutIcon />}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialoge />
        </Suspense>
      )}

      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <NotificationDialoge />
        </Suspense>
      )}

      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <NewGroupDialog />
        </Suspense>
      )}
    </>
  );
}

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};
export default Header;
