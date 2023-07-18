import { Box, Button, IconButton, InputLabel, Typography } from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useFormik } from "formik";
import practicesCRUD from "../../../services/http/practices";
import moment from "moment";

const validate = (values) => {
  let errors = {};

  if (!values.license_name) {
    errors.license_name = "License Name is required";
  }

  if (!values.license_number) {
    errors.license_number = "License Number is required";
  }

  if (!values.effective_date) {
    errors.effective_date = "Effective Date is required";
  }

  if (!values.renewal_date) {
    errors.renewal_date = "Renewal Date is required";
  }

  if (!values.state_code) {
    errors.state_code = "State Code is required";
  }

  return errors;
};

const LicenseForm = ({
  setIsLicenseModalOpen,
  practiceId,
  setLicenseData,
  modeOptions,
}) => {
  const formik = useFormik({
    initialValues: {
      license_name:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["license_name"],
      license_number:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["license_number"],
      effective_date:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["effective_date"],
      renewal_date:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["renewal_date"],
      state_code:
        modeOptions.mode === "add" ? "" : modeOptions["data"]["state_code"],
    },

    onSubmit: (values) => {
      switch (modeOptions.mode) {
        case "add":
          let newLicenseData = {
            licenses: [
              {
                ...values,
                practice_id: practiceId,
                effective_date: moment(values.effective_date).format(
                  "YYYY-MM-DDTHH:mm:ss[Z]"
                ),
                renewal_date: moment(values.renewal_date).format(
                  "YYYY-MM-DDTHH:mm:ss[Z]"
                ),
              },
            ],
            license_deletable_ids: [],
          };
          practicesCRUD
            .updatePracticeLicenseDetails(practiceId, newLicenseData)
            .then((data) => {
              setLicenseData(data);
              setIsLicenseModalOpen(false);
            })
            .catch((err) => {
              console.error(err);
            });
          break;

        case "edit":
          let editLicenseData = {
            licenses: [
              {
                ...values,
                practice_id: practiceId,
                id: modeOptions["data"]["id"],
                effective_date: moment(values.effective_date).format(
                  "YYYY-MM-DDTHH:mm:ss[Z]"
                ),
                renewal_date: moment(values.renewal_date).format(
                  "YYYY-MM-DDTHH:mm:ss[Z]"
                ),
              },
            ],
            license_deletable_ids: [],
          };
          practicesCRUD
            .updatePracticeLicenseDetails(practiceId, editLicenseData)
            .then((data) => {
              setLicenseData(data);
              setIsLicenseModalOpen(false);
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
          {modeOptions.mode === "add" ? "Add License" : "Edit License"}
        </Typography>
        <IconButton
          onClick={() => setIsLicenseModalOpen(false)}
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
              License Name
            </InputLabel>
            <input
              name={"license_name"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={formik.values.license_name}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.license_name}
            </Typography>
          </Box>

          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              License Number
            </InputLabel>
            <input
              name={"license_number"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={formik.values.license_number}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.license_number}
            </Typography>
          </Box>

          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Effective Date
            </InputLabel>
            <input
              type="date"
              name={"effective_date"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={moment(formik.values.effective_date).format("YYYY-MM-DD")}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.effective_date}
            </Typography>
          </Box>

          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              Renewal Date
            </InputLabel>
            <input
              type="date"
              name={"renewal_date"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={moment(formik.values.renewal_date).format("YYYY-MM-DD")}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.renewal_date}
            </Typography>
          </Box>

          <Box>
            <InputLabel
              sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
            >
              State Code
            </InputLabel>
            <input
              name={"state_code"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
              value={formik.values.state_code}
              onChange={formik.handleChange}
            />
            <Typography fontSize={"14px"} color={"red"}>
              {formik.errors.state_code}
            </Typography>
          </Box>

          <Box mt={2} display={"flex"} justifyContent={"space-between"}>
            {modeOptions.mode === "add" ? (
              <>
                <Button
                  type="submit"
                  fullWidth
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

export default LicenseForm;
