import { Box, Button, IconButton, InputLabel, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import providersCRUD from "../../services/http/provider";

const AddProviderForm = ({
  setIsProviderModalOpen,
  practiceId,
  setProviderData,
}) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      primary_email: "",
      primary_phonenumber: "",
    },

    onSubmit: (values) => {
      providersCRUD
        .createProvider(practiceId, {
          ...values,
          primary_phonenumber: "+91" + values["primary_phonenumber"],
        })
        .then((data) => {
          setProviderData(data);
          setIsProviderModalOpen(false);
        })
        .catch((err) => {
          console.error(err);
        });
    },

    validate: (values) => {
      let errors = {};

      if (!values.name) {
        errors.name = "Provider name is required";
      }
      if (!values.primary_email) {
        errors.primary_email = "Primary email is required";
      }
      if (!values.primary_phonenumber) {
        errors.primary_phonenumber = "Primary Phone number is required";
      }

      return errors;
    },
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
          Add Provider
        </Typography>
        <IconButton
          onClick={() => setIsProviderModalOpen(false)}
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
              Provider Name
            </InputLabel>
            <input
              value={formik.values.name}
              onChange={formik.handleChange}
              name={"name"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.name}
            </Typography>
          </Box>
          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Primary Email
            </InputLabel>
            <input
              value={formik.values.primary_email}
              onChange={formik.handleChange}
              name={"primary_email"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              type="email"
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.primary_email}
            </Typography>
          </Box>
          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Primary Phone number
            </InputLabel>
            <input
              value={formik.values.primary_phonenumber}
              onChange={formik.handleChange}
              name={"primary_phonenumber"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.primary_phonenumber}
            </Typography>
          </Box>
          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
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
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AddProviderForm;
