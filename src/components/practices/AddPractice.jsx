import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  InputLabel,
  Snackbar,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import practicesCRUD from "../../services/http/practices";
import { PracticeContext } from "../../context/PracticeContext";
import { FourMp } from "@mui/icons-material";

const validate = (values) => {
  let errors = {};

  if (!values.practice_name) {
    errors.practice_name = "Practice name is required";
  }

  if (!values.contact_email) {
    errors.contact_email = "Email address is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.contact_email)
  ) {
    errors.contact_email = "Invalid email address";
  }

  if (!values.contact_person) {
    errors.contact_person = "Contact person is required";
  }

  if (!values.contact_phone) {
    errors.contact_phone = "Phone number is required";
  }

  if (!values.tax_id) {
    errors.tax_id = "Tax-ID is required";
  }

  return errors;
};

const AddPractice = ({ setAddPracticeIsOpen, setIsLoading }) => {
  const { setPracticesData } = useContext(PracticeContext);
  const [commonErrors, setCommonErrors] = useState({
    isOpen: false,
    msg: "",
  });

  const formik = useFormik({
    initialValues: {
      practice_name: "",
      tax_id: "",
      contact_person: "",
      contact_email: "",
      contact_phone: "",
    },

    onSubmit: (values) => {
      // setIsLoading(true);
      practicesCRUD
        .createPractice({
          ...values,
          contact_phone: "+91 " + values.contact_phone,
        })
        .then((data) => {
          setAddPracticeIsOpen(false);
          setPracticesData(data);
        })
        .catch((err) => {
          // setIsLoading(false);
          // setCommonErrors({
          //   isOpen: true,
          //   msg: err,
          // });
        });
    },

    validate,
  });

  const handleReset = () => {
    formik.resetForm({
      values: {
        practice_name: "",
        tax_id: "",
        contact_person: "",
        contact_email: "",
        contact_phone: "",
      },
    });
  };

  const PracticeFormLabel = ({ label }) => {
    return (
      <InputLabel
        sx={{ marginBottom: "8px", fontSize: "16px", color: " #666565" }}
      >
        {label}
      </InputLabel>
    );
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      style={{
        position: "relative",
        width: "100%",
        padding: "35px 12px 12px 12px",
      }}
    >
      {/* <Snackbar
        autoHideDuration={6000}
        open={commonErrors["isOpen"]}
        onClose={() => setCommonErrors({ isOpen: false, msg: "" })}
      >
        <Alert severity="error">{commonErrors?.msg}</Alert>
      </Snackbar> */}

      {commonErrors?.isOpen && (
        <div
          style={{
            textAlign: "center",
            background: "red",
            color: "#fff",
            fontWeight: "bold",
            padding: "8px",
            position: "absolute",
            top: "0",
            left: "0",
            right: 0,
          }}
        >
          <Typography> {commonErrors.msg}</Typography>
        </div>
      )}

      <Card
        sx={{
          boxShadow: "none",
          background: "inherit",
        }}
      >
        <CardContent
          sx={{
            mt: commonErrors?.isOpen && 2,
            padding: "0",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Practice Name"} />
            <input
              onChange={formik.handleChange}
              value={formik.values.practice_name}
              name={"practice_name"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />
            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.practice_name}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Contact Person"} />
            <input
              onChange={formik.handleChange}
              value={formik.values.contact_person}
              name={"contact_person"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />{" "}
            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.contact_person}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Email Address"} />
            <input
              onChange={formik.handleChange}
              value={formik.values.contact_email}
              name={"contact_email"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />
            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.contact_email}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Phone Number"} />

            <input
              onChange={formik.handleChange}
              value={formik.values.contact_phone}
              name={"contact_phone"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />
            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.contact_phone}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Tax-ID"} />
            <input
              onChange={formik.handleChange}
              value={formik.values.tax_id}
              name={"tax_id"}
              style={{
                width: "100%",
                padding: "6px 8px",
                outline: "none",
                border: "none",
                borderRadius: "20px",
              }}
            />
            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.tax_id}
            </Typography>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"}>
            <Button
              onClick={() => {
                setAddPracticeIsOpen(false), handleReset();
              }}
              sx={{
                height: "50px",
                borderRadius: "18px",
                fontSize: "14px",
                textTransform: "capitalize",
                background: "#676d70",
                boxShadow: "none",
                "&:hover": {
                  background: "#676d70",
                },
              }}
              variant="contained"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              sx={{
                height: "50px",
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
              Create Practice
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddPractice;
