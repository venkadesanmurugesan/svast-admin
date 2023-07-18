import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Layout from "./layouts/main";
import Authentication from "./pages/auth";
import { Box, CircularProgress } from "@mui/material";
import Home from "./pages/home";
import Practices from "./pages/practices";
import Tickets from "./pages/tickets";
import Enrollments from "./pages/enrollments";
import Notifications from "./pages/notifications";
import Settings from "./pages/settings";
import Employees from "./pages/employees";
import { useEffect, useState } from "react";
import { LoadingContextProvider } from "./context/LoadingContext";
import Comments from "./components/tickets/Comments";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    !sessionStorage.getItem("AccessToken") && navigate("/login");
  }, [!sessionStorage.getItem("AccessToken")]);

  return (
    <>
      {isLoading && (
        <Box
          position={"fixed"}
          height={"100vh"}
          bgcolor={"#fff"}
          left={0}
          right={0}
          top={0}
          bottom={0}
          zIndex={9999}
        >
          <CircularProgress
            sx={{
              position: "absolute",
              bottom: 0,
              top: 0,
              margin: "auto",
              right: 0,
              left: 0,
            }}
            color="inherit"
          />
        </Box>
      )}

      <LoadingContextProvider value={{ isLoading, setIsLoading }}>
        <Layout isAuthScreen={location.pathname === "/login"}>
          <Box>
            <Routes>
              <Route path="/login" element={<Authentication />} />
              <Route path={"/"} element={<Home />} />
              <Route path={"/practices"} element={<Practices />} />
              <Route path={"/tickets"} element={<Tickets />} />
              <Route path={"/enrollments"} element={<Enrollments />} />
              <Route path={"/notifications"} element={<Notifications />} />
              <Route path={"/settings"} element={<Settings />} />
              <Route path={"/employees"} element={<Employees />} />
            </Routes>
          </Box>
        </Layout>
      </LoadingContextProvider>
    </>
  );
}

export default App;
