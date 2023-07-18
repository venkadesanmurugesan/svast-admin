import { useTheme } from "@emotion/react";
import { Opacity } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FilledInput,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { app } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
import { LoadingContext } from "../../context/LoadingContext";
import EmpLogin from "./login";
import ForgotPassword from "./forgotPassword";

const Authentication = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { setIsLoading } = useContext(LoadingContext);
  const [authMode, setAuthMode] = useState("login");

  return (
    <>
      {authMode === "login" ? (
        <EmpLogin
          navigate={navigate}
          setAuthMode={(mode) => {
            setAuthMode(mode);
          }}
          theme={theme}
          setIsLoading={setIsLoading}
        />
      ) : authMode === "fp" ? (
        <ForgotPassword
          setAuthMode={(mode) => setAuthMode(mode)}
          theme={theme}
          setIsLoading={setIsLoading}
        />
      ) : null}

      <Box
        sx={{
          width: { xs: "auto", md: "35%" },
          position: "absolute",
          top: { xs: "-20px", md: "50px" },
          right: { xs: "0", md: "145px" },
          zIndex: { xs: "-1", md: "0" },
        }}
      >
        <img width={"100%"} src="/titleLogo.png" />
      </Box>
    </>
  );
};

export default Authentication;
