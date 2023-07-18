import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import practicesCRUD from "../../services/http/practices";
import { PracticeContext } from "../../context/PracticeContext";
import dummyProviders from "../../data/dummyProviders.json";
import ticketsCRUD from "../../services/http/tickets";
import { TicketsContext } from "../../context/TicketsContext";

const validate = (values) => {
  let errors = {};

  if (!values.practice_id) {
    errors.practice_id = "Practice is required";
  }

  if (!values.ticket_type) {
    errors.ticket_type = "Ticket Type is required";
  }
  if (!values.status) {
    errors.status = "Status is required";
  }

  return errors;
};

const status = {
  ONBOARDING: [
    "DETAILS NEEDED",
    "FORM INPROGRESS",
    "DETAILS SUBMITTED",
    "COMPLETED",
  ],
  "CLIENT REQUEST": [
    "PENDING",
    "APPLICATION SUBMITTED",
    "DETAILS NEEDED",
    "DETAILS SUBMITTED",
    "ENROLLMENT VERIFIED",
  ],
  ENROLLMENT: ["DETAILS NEEDED", "DETAILS SUBMITTED", "CLOSED"],
};

const AddTicket = ({ setCommonTicketDetails }) => {
  const { setTicketsData } = useContext(TicketsContext);

  const [ticketOptions, setTicketOptions] = useState({
    practices: [],
    providers: dummyProviders,
    ticketTypes: ["ONBOARDING", "CLIENT REQUEST", "ENROLLMENT"],
    status,
  });

  useEffect(() => {
    // setIsLoading(true);
    practicesCRUD
      .getPractices()
      .then((data) => {
        // setIsLoading(false);
        setTicketOptions({ ...ticketOptions, practices: data });
      })
      .catch((err) => {
        // setIsLoading(false);
        console.error(err);
      });
  }, []);

  const formik = useFormik({
    initialValues: {
      practice_id: null,
      provider_id: null,
      ticket_type: "",
      status: "",
    },

    onSubmit: (values) => {
      // setIsLoading(true);
      ticketsCRUD
        .createTicket(values)
        .then((data) => {
          // setIsLoading(false);
          setCommonTicketDetails({
            componentName: "ticketTable",
            ticketDatum: {},
          });
          setTicketsData(data);
        })
        .catch((err) => {
          alert("Something wrong!!!");
          console.log(err);
        });
    },

    validate,
  });

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
    <form onSubmit={formik.handleSubmit}>
      <Card
        sx={{
          width: { lg: "30%", md: "50%", sm: "60%" },
          padding: "30px 12px 12px 12px",
          background: "inherit",
        }}
      >
        <CardHeader sx={{ padding: 0, mb: 4 }} title=" Add Ticket"></CardHeader>
        <CardContent
          sx={{
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
            <PracticeFormLabel label={"Practice"} />
            <Select
              name="practice_id"
              onChange={formik.handleChange}
              value={formik.values.practice_id}
              sx={{
                width: "100%",
                outline: "none",
                border: "none",
                borderRadius: "20px",
                bgcolor: "#fff",
                height: "35px",
              }}
              label=""
            >
              {ticketOptions["practices"].map((practice_id, index) => {
                return (
                  <MenuItem
                    key={`practice_option-${index}`}
                    value={practice_id.ID}
                  >
                    {practice_id.practice_name}
                  </MenuItem>
                );
              })}
            </Select>

            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.practice_id}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Provider"} />
            <Select
              name="provider_id"
              onChange={formik.handleChange}
              value={formik.values.provider_id}
              sx={{
                width: "100%",
                outline: "none",
                border: "none",
                borderRadius: "20px",
                bgcolor: "#fff",
                height: "35px",
              }}
              label=""
            >
              {ticketOptions["providers"].map((provider, index) => {
                return (
                  <MenuItem key={`provider_option-${index}`} value={index}>
                    {provider.name}
                  </MenuItem>
                );
              })}
            </Select>

            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.provider_id}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Ticket Type"} />
            <Select
              name="ticket_type"
              onChange={formik.handleChange}
              value={formik.values.ticket_type}
              sx={{
                width: "100%",
                outline: "none",
                border: "none",
                borderRadius: "20px",
                bgcolor: "#fff",
                height: "35px",
              }}
              label=""
            >
              {ticketOptions["ticketTypes"].map((ticketType, index) => {
                return (
                  <MenuItem
                    key={`tickettype_option-${index}`}
                    value={ticketType}
                  >
                    {ticketType}
                  </MenuItem>
                );
              })}
            </Select>

            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.ticket_type}
            </Typography>
          </Box>

          <Box
            style={{
              width: "100%",
            }}
          >
            <PracticeFormLabel label={"Status"} />

            <Select
              name="status"
              onChange={formik.handleChange}
              value={formik.values.status}
              sx={{
                width: "100%",
                outline: "none",
                border: "none",
                borderRadius: "20px",
                bgcolor: "#fff",
                height: "35px",
              }}
              label=""
            >
              {!ticketOptions["status"][formik.values.ticket_type] ? (
                <MenuItem disabled>Please select the Ticket Type</MenuItem>
              ) : (
                ticketOptions["status"][formik.values.ticket_type].map(
                  (item, index) => {
                    return (
                      <MenuItem key={`tickettype_option-${index}`} value={item}>
                        {item}
                      </MenuItem>
                    );
                  }
                )
              )}
            </Select>

            <Typography my={"5px"} fontSize={"14px"} color={"red"}>
              {formik.errors.status}
            </Typography>
          </Box>

          <Box display={"flex"} justifyContent={"space-between"} gap={5}>
            <Button
              onClick={() =>
                setCommonTicketDetails({
                  componentName: "ticketTable",
                  ticketDatum: {},
                })
              }
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
              Create Ticket
            </Button>
          </Box>
        </CardContent>
      </Card>
    </form>
  );
};

export default AddTicket;
