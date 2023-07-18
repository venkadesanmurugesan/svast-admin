import {
  Button,
  Card,
  CardActions,
  CardContent,
  IconButton,
  InputLabel,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { app } from "../../services/firebase";
import { useFormik } from "formik";

const ForgotPassword = ({ setAuthMode, theme, setIsLoading }) => {
  const [userMainError, setUserMainError] = useState({});

  const formic = useFormik({
    initialValues: { email: "" },

    onSubmit: (values) => {
      setIsLoading(true);
      const auth = getAuth(app);
      sendPasswordResetEmail(auth, values.email)
        .then(() => {
          setIsLoading(false);
          setUserMainError({
            msg: "Please check your email",
            status: "success",
          });

          setTimeout(() => {
            setAuthMode("login");
          }, 5000);
        })
        .catch((error) => {
          setIsLoading(false);
          setUserMainError({ msg: "User not found", status: "error" });
        });
    },

    validate: (values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email is required";
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = "Invalid email address";
      }

      return errors;
    },
  });

  return (
    <form onSubmit={formic.handleSubmit}>
      <Card
        sx={{
          width: { xs: "100%", md: "500px" },
          borderRadius: "50px",
          boxShadow: "none",
          marginTop: { xs: "77px", md: "0" },
          opacity: { xs: "0.9", md: "1" },
        }}
      >
        {userMainError.msg && (
          <div
            style={{
              textAlign: "center",
              background: `${
                userMainError.status === "error" ? "red" : "green"
              }`,
              color: "#fff",
              fontWeight: "bold",
              padding: "5px",
            }}
          >
            {userMainError.msg}
          </div>
        )}
        <CardContent
          sx={{
            background: theme.svastColorsPalette.thickGrey,
            display: "flex",
            alignItems: "center",
          }}
        >
          <IconButton onClick={() => setAuthMode("login")}>
            <ArrowBackIcon sx={{ color: "#fff" }} />
          </IconButton>
          <Typography
            flex={1}
            fontSize={"24px"}
            color={"#fff"}
            textAlign={"center"}
          >
            Forgot Password
          </Typography>
        </CardContent>
        {/* {isValidUser !== "" && (
          <div
            style={{
              textAlign: "center",
              background: "red",
              color: "#fff",
              fontWeight: "bold",
              padding: "5px",
            }}
          >
            {isValidUser}
          </div>
        )} */}
        <CardContent
          sx={{
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            background: theme.svastColorsPalette.lightGrey,
          }}
        >
          <div>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Email
            </InputLabel>
            <input
              value={formic.values.email}
              onChange={formic.handleChange}
              name="email"
              style={{
                height: "40px",
                width: "100%",
                borderRadius: "25px",
                border: "none",
                background: "#fff",
                outline: "none",
                padding: "0 12px",
              }}
            />
            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formic.errors.email}
            </Typography>
          </div>
          <Button
            type="submit"
            sx={{
              padding: "4px 26px",
              border: "none",
              background: theme.svastColorsPalette.navBlue,
              borderRadius: "25px",
              fontSize: "14px",
              color: "#fff",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                background: theme.svastColorsPalette.navBlue,
              },
            }}
          >
            Reset Password
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};

export default ForgotPassword;
