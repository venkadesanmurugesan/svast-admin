import { Box, Button, IconButton, InputLabel, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import practicesCRUD from "../../../services/http/practices";
import moment from "moment";
import providersCRUD from "../../../services/http/provider";

const validate = (values) => {
  let errors = {};

  if (!values.portal_name) {
    errors.portal_name = "Portal Name is required";
  }

  if (!values.username) {
    errors.username = "Username is required";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const PortalLoginForm = ({
  setIsPortalLoginModalOpen,
  practiceId,
  setPortalLoginData,
  modeOptions,
  providerId,
}) => {
  const formik = useFormik({
    initialValues: {
      portal_name:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["portal_name"],
      username:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["username"],
      password:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["password"],
    },

    onSubmit: (values) => {
      switch (modeOptions.mode) {
        case "add":
          let newPortalLoginData = {
            portal_logins: [{ ...values, practice_id: practiceId }],
            portal_login_deletable_ids: [],
          };
          providersCRUD
            .updateProviderPortalLogins(
              practiceId,
              providerId,
              newPortalLoginData
            )
            .then((data) => {
              setPortalLoginData(data);
              setIsPortalLoginModalOpen(false);
            })
            .catch((err) => {
              console.error(err);
            });
          break;

        case "edit":
          let editPortalLoginData = {
            portal_logins: [
              {
                ...values,
                practice_id: practiceId,
                id: modeOptions["data"]["id"],
              },
            ],
            portal_login_deletable_ids: [],
          };

          providersCRUD
            .updateProviderPortalLogins(
              practiceId,
              providerId,
              editPortalLoginData
            )
            .then((data) => {
              setPortalLoginData(data);
              setIsPortalLoginModalOpen(false);
            })
            .catch((err) => {
              console.error(err);
            });
          break;
      }
    },

    validate,
  });

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        bgcolor={"#BBBBBC"}
        minHeight={"50px"}
        px={3}
        sx={{ borderTopLeftRadius: "25px", borderTopRightRadius: "25px" }}
      >
        <Typography color={"#E2E2E2"} fontSize={"20px"}>
          {modeOptions.mode === "add" ? "Add Portal" : "Edit Portal"}
        </Typography>
        <IconButton
          onClick={() => setIsPortalLoginModalOpen(false)}
          sx={{ color: "#fff" }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box
          p={3}
          sx={{
            borderBottomLeftRadius: "25px",
            borderBottomRightRadius: "25px",
          }}
          bgcolor={"#F0F0F0"}
          display={"flex"}
          flexDirection={"column"}
          gap={2}
        >
          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Portal Name
            </InputLabel>
            <input
              name={"portal_name"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={formik.values.portal_name}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.portal_name}
            </Typography>
          </Box>

          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Username
            </InputLabel>
            <input
              name={"username"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={formik.values.username}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.username}
            </Typography>
          </Box>

          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Password
            </InputLabel>
            <input
              name={"password"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={formik.values.password}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.password}
            </Typography>
          </Box>

          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
            {modeOptions.mode === "add" ? (
              <>
                <Button
                  fullWidth
                  type="submit"
                  sx={{
                    borderRadius: "18px",
                    boxShadow: "none",
                    fontSize: "14px",
                    textTransform: "capitalize",
                    background: "#4DB5E8",
                    "&:hover": {
                      background: "#4DB5E8",
                    },
                  }}
                  variant="contained"
                >
                  Add
                </Button>
              </>
            ) : (
              <Button
                fullWidth
                type="submit"
                sx={{
                  borderRadius: "18px",
                  boxShadow: "none",
                  fontSize: "14px",
                  textTransform: "capitalize",
                  background: "#4DB5E8",
                  "&:hover": {
                    background: "#4DB5E8",
                  },
                }}
                variant="contained"
              >
                Update
              </Button>
            )}
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default PortalLoginForm;
