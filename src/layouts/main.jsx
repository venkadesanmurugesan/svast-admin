import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Header from "./header";
import SideNav from "./sideNav";
import { useTheme } from "@mui/material";

const drawerWidth = 240;

function Layout(props) {
  const theme = useTheme();
  const { window, children, isAuthScreen } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <>
      {isAuthScreen ? (
        <Box>
          <CssBaseline />
          <Box
            sx={{
              padding: "0 46px",
              display: "flex",
              height: { xs: "auto", md: "60px" },
              flexDirection: { xs: "column", md: "row" },
              alignItems: "center",
              background: theme.svastColorsPalette.navBlue,
            }}
          >
            <div style={{ width: 148, height: 53 }}>
              <img
                width={"100%"}
                height={"100%"}
                src="/logo.png"
                alt="svast logo"
              />
            </div>
            <Typography
              fontSize={"26px"}
              fontWeight={"bold"}
              color={"#fff"}
              margin={"auto"}
            >
              Employee Portal
            </Typography>
          </Box>

          <Box
            sx={{
              padding: { xs: "20px", md: "100px" },
              paddingBottom: "10px",
              position: "relative",
            }}
          >
            {children}
          </Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <Header
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <SideNav
            mobileOpen={mobileOpen}
            container={container}
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerToggle}
          />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              background: "#E6E6E6",
              minHeight: "100vh ",
            }}
          >
            <Toolbar />
            <Box sx={{ padding: { xs: "12px", md: "30px" } }}>{children}</Box>
          </Box>
        </Box>
      )}
    </>
  );
}

export default Layout;
