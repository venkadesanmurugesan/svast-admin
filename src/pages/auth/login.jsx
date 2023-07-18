import {
  Button,
  Card,
  CardActions,
  CardContent,
  InputLabel,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../services/firebase";

const validate = (values) => {
  let errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "At least 8 characters long";
  }
  return errors;
};

const EmpLogin = ({ setAuthMode, theme, navigate, setIsLoading }) => {
  const [userMainError, setUserMainError] = useState({});

  const formik = useFormik({
    initialValues: { email: "", password: "" },

    onSubmit: (values) => {
      setIsLoading(true);
      const auth = getAuth(app);
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
          setIsLoading(false);
          setUserMainError({});
          const user = userCredential.user;
          // console.log(user);
          sessionStorage.setItem("AccessToken", user.accessToken);
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          setUserMainError({ msg: "User not found", status: "error" });
        });
    },

    validate,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
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
        <CardContent sx={{ background: theme.svastColorsPalette.thickGrey }}>
          <Typography fontSize={"24px"} color={"#fff"} textAlign={"center"}>
            Login
          </Typography>
        </CardContent>
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
              sx={{
                marginBottom: "8px",
                fontSize: "16px",
                color: " #666565",
              }}
            >
              Email
            </InputLabel>
            <input
              value={formik.values.email}
              onChange={formik.handleChange}
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
              {formik.errors.email}
            </Typography>
          </div>
          <div>
            <InputLabel
              sx={{
                marginBottom: "8px",
                fontSize: "16px",
                color: " #666565",
              }}
            >
              Password
            </InputLabel>
            <input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              type="password"
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
              {formik.errors.password}
            </Typography>
          </div>
        </CardContent>
        <CardActions
          sx={{
            padding: "0 30px",
            paddingBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            background: theme.svastColorsPalette.lightGrey,
          }}
        >
          <Button
            onClick={() => setAuthMode("fp")}
            style={{
              fontSize: "16px",
              color: "#fff",
              fontWeight: "bold",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
          >
            Forgot Password
          </Button>
          <Button
            type="submit"
            sx={{
              padding: "12px 26px",
              border: "none",
              background: theme.svastColorsPalette.navBlue,
              borderRadius: "25px",
              fontSize: "18px",
              color: "#fff",
              cursor: "pointer",
              "&:hover": {
                boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                background: theme.svastColorsPalette.navBlue,
              },
            }}
          >
            Sign-in
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};

export default EmpLogin;
