import {
  Box,
  Button,
  Divider,
  Drawer,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import React from "react";
import navOptions from "../data/navOptions.json";
import { redirect, useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const SideNav = ({
  handleDrawerToggle,
  drawerWidth,
  mobileOpen,
  container,
}) => {
  const theme = useTheme();
  const location = useLocation();

  const drawer = (
    <div>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"space-between"}
        mx={{ sm: "42px" }}
        mt={{ sm: "42px" }}
        mb={{ sm: "80px" }}
        px={{ xs: "10px", sm: "0" }}
        pt={{ xs: "10px", sm: "0" }}
        pb={{ xs: "10px", sm: "0" }}
        sx={{
          background: { xs: theme.svastColorsPalette.navBlue, sm: "none" },
        }}
      >
        <img
          style={{
            width: 128,
            height: "auto",
          }}
          src="/logo.png"
          alt="svast logo"
        />
        <IconButton
          onClick={() => handleDrawerToggle()}
          sx={{ color: "#fff", display: { xs: "block", sm: "none" } }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <List>
        {navOptions.map((option, index) => (
          <Link
            onClick={() => handleDrawerToggle()}
            key={`nav-option-${index}`}
            style={{ textDecoration: "none" }}
            to={option.pathName}
          >
            <ListItem
              sx={{
                justifyContent: { xs: "center", sm: "normal" },
                alignItems: "center",
                height: "70px",
                px: "26px",
                gap: "16px",
                cursor: "pointer",
                background:
                  location.pathname === option.pathName &&
                  theme.svastColorsPalette.hoverLight,
                "&:hover": {
                  background: {
                    xs: "none",
                    sm: theme.svastColorsPalette.hoverLight,
                  },
                },
              }}
              disablePadding
            >
              <ListItemAvatar
                sx={{
                  minWidth: "0",

                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img width={"100%"} src={`/${option.iconName}.png`} />
              </ListItemAvatar>

              <ListItemText>
                <span
                  style={{
                    fontSize: "20px",
                    color: "#fff",
                    fontWeight: "normal",
                  }}
                >
                  {option.navTitle}
                </span>
              </ListItemText>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            backgroundColor: "#4DB5E8",
            boxSizing: "border-box",
            width: "100%",
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        PaperProps={{
          style: {
            backgroundColor: theme.svastColorsPalette.navBlue,
          },
        }}
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default SideNav;
