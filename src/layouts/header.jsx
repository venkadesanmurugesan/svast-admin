import {
  AppBar,
  Box,
  Button,
  Icon,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useContext } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import { getAuth, signOut } from "firebase/auth";
import { app } from "../services/firebase";
import { LoadingContext } from "../context/LoadingContext";

const Header = ({ handleDrawerToggle, drawerWidth }) => {
  const theme = useTheme();
  const { setIsLoading } = useContext(LoadingContext);

  const logout = () => {
    if (confirm("Are you sure to sign out?")) {
      setIsLoading(true);
      const auth = getAuth(app);
      signOut(auth)
        .then(() => {
          setIsLoading(false);
          sessionStorage.removeItem("AccessToken");
          window.location.reload();
        })
        .catch((error) => {
          console.error(error.message);
        });
    }
  };

  return (
    <AppBar
      color="primary"
      position="fixed"
      sx={{
        zIndex: 2,
        width: { boxShadow: "none", sm: `calc(100% - ${drawerWidth}px)` },
      }}
    >
      <Toolbar
        sx={{
          minHeight: "60px",
          padding: { xs: "0 12px", md: "0 72px" },
          background: theme.svastColorsPalette.headerGrey,
        }}
      >
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Box
          width={"100%"}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography
            sx={{ fontSize: { xs: "18px", md: "24px" } }}
            fontWeight={"normal"}
          >
            Welcome
          </Typography>
          <Button onClick={logout} variant="text" color="inherit">
            <PowerSettingsNewIcon />
            <Typography
              ml={"12px"}
              sx={{
                textTransform: "capitalize",
                fontSize: { xs: "18px", md: "22px" },
              }}
            >
              Logout
            </Typography>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
