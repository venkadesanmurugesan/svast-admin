import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  Icon,
  IconButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReplyAllRoundedIcon from "@mui/icons-material/ReplyAllRounded";
import { useFormik } from "formik";
import ticketsCRUD from "../../services/http/tickets";
import dummyProviders from "../../data/dummyProviders.json";
import practicesCRUD from "../../services/http/practices";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

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

const Comments = ({
  setCommonTicketDetails,
  ticketDatum,
  fromComponent,
  setIsShowOnboardingForm,
  setCommonPracticeDetails,
}) => {
  const [commentsDetails, setCommentsDetails] = useState({
    ticket: [],
    comments: [],
  });

  const [ticketDetail, setTicketDetail] = useState(ticketDatum);

  const [ticketOptions, setTicketOptions] = useState({
    practices: [],
    providers: [],
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

  useEffect(() => {
    // setIsLoading(true);

    ticketDetail.ID &&
      ticketsCRUD
        .getComments(ticketDetail.ID)
        .then((data) => {
          // setIsLoading(false);
          setCommentsDetails({ ...commentsDetails, comments: data });
        })
        .catch((err) => {
          // setIsLoading(false);
          console.error(err);
        });
  }, [ticketDetail]);

  const formik = useFormik({
    initialValues:
      fromComponent === "addTicket"
        ? {
            comment: "",
            subject: "",
            practice_id:
              Object.entries(ticketDetail).length < 1
                ? null
                : ticketDetail.practice_id,
            provider_id:
              Object.entries(ticketDetail).length < 1
                ? null
                : ticketDetail.provider_id,
            ticket_type:
              Object.entries(ticketDetail).length < 1
                ? null
                : ticketDetail.ticket_type,
            status:
              Object.entries(ticketDetail).length < 1
                ? ""
                : ticketDetail.status,
          }
        : fromComponent === "comment"
        ? {
            ticket_id: ticketDetail.ID,
            comment: "",
            subject: "",
          }
        : {},

    onSubmit: (values) => {
      switch (fromComponent) {
        case "addTicket":
          makeTicket(values);
          break;
        case "comment":
          makeComment(values);
      }

      // ticketsCRUD
      //   .createComment(ticketDatum.ID, values)
      //   .then((data) => {
      //     // setIsLoading(false);
      //     setListComments(data);
      //     formik.values.comment = "";
      //     formik.values.subject = "";
      //   })
      //   .catch((err) => {
      //     alert("Something wrong!!!");
      //     console.log(err);
      //   });
    },

    validate: (values) => {
      let errors = {};
      if (fromComponent === "addTicket") {
        if (Object.entries(ticketDetail).length < 1) {
          if (!values.comment) {
            errors.comment = "Comment is required";
          }
          if (!values.subject) {
            errors.subject = "Subject is required";
          }
        }
        if (!values.practice_id) {
          errors.practice_id = "Practice is required";
        }
        if (!values.ticket_type) {
          errors.ticket_type = "Ticket Type is required";
        }
        if (!values.status) {
          errors.status = "Status is required";
        }
      } else if (fromComponent === "comment") {
        if (!values.comment) {
          errors.comment = "Comment is required";
        }
        if (!values.subject) {
          errors.subject = "Subject is required";
        }
      }

      return errors;
    },
  });

  const makeTicket = (values) => {
    ticketsCRUD
      .createTicket(values)
      .then((data) => {
        setCommentsDetails({ ...commentsDetails, ticket: data });
        setTicketDetail(data);
        formik.values.comment = "";
        formik.values.subject = "";
        // setIsLoading(false);
        // setCommonTicketDetails({
        //   componentName: "ticketTable",
        //   ticketDatum: {},
        // });
        // setTicketsData(data);
      })
      .catch((err) => {
        alert("Something wrong!!!");
        console.log(err);
      });
  };

  const makeComment = (values) => {
    ticketsCRUD
      .createComment(ticketDetail["ID"], values)
      .then((data) => {
        setCommentsDetails({ ...commentsDetails, comments: data });
        // setTicketDetail(data);
        formik.values.comment = "";
        formik.values.subject = "";
        // setIsLoading(false);
        // setCommonTicketDetails({
        //   componentName: "ticketTable",
        //   ticketDatum: {},
        // });
        // setTicketsData(data);
      })
      .catch((err) => {
        alert("Something wrong!!!");
        console.log(err);
      });
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box display={"flex"}>
          <IconButton
            onClick={() =>
              setCommonTicketDetails({
                componentName: { main: "ticketTable", sub: "" },
                ticketDatum: {},
              })
            }
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <Typography
            sx={{
              textDecoration: "underline",
              fontSize: "24px",
              color: "#585858",
              fontWeight: "bold",
            }}
          >
            Onboarding Ticket #{ticketDetail.ID} ({ticketDetail.status})
          </Typography>
        </Box>
        <Box display={"flex"} gap={2} alignItems={"center"}>
          <Button
            onClick={() => {
              setIsShowOnboardingForm(true);
              setCommonPracticeDetails({
                practice_id: ticketDatum["practice_id"],
                provider_id: ticketDatum["provider_id"],
              });
            }}
            sx={{
              height: "40px",
              borderRadius: "12px",
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
            Show Onboarding Form
          </Button>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
      <Box mb={2}>
        {commentsDetails["comments"].length < 1 ? (
          <Typography
            my={3}
            mb={5}
            fontWeight={"bold"}
            color={"#807F7F"}
            fontSize={"24px"}
            textAlign={"center"}
          >
            No Comments are available
          </Typography>
        ) : (
          commentsDetails["comments"].map((item, index) => {
            return (
              <React.Fragment key={`comments-${index}`}>
                <Box
                  sx={{ my: 2 }}
                  bgcolor={"#EEEEEE"}
                  px={2}
                  py={1}
                  borderRadius={5}
                >
                  {/* <Typography
                sx={{
                  fontSize: "16px",
                  color: "#A9A9A9",
                  fontWeight: "bold",
                }}
              >
                {item.sub}
              </Typography> */}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#A9A9A9",
                      fontWeight: "bold",
                    }}
                  >
                    {ticketDatum.status}: {item.subject}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: "#A9A9A9",
                      fontWeight: "bold",
                    }}
                  >
                    {item.comment}
                  </Typography>
                </Box>
                <Divider />
              </React.Fragment>
            );
          })
        )}
      </Box>

      <Box>
        <Typography
          mb={1}
          fontWeight={"bold"}
          color={"#807F7F"}
          fontSize={"14px"}
        >
          Add Comment
        </Typography>

        <form
          onSubmit={formik.handleSubmit}
          style={{ display: "flex", alignItems: "center", gap: 20 }}
        >
          <Grid container gap={1} justifyContent={"space-between"}>
            {fromComponent === "addTicket" && (
              <>
                <Grid item sm>
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
                    <MenuItem value="" disabled hidden selected>
                      Choose a practice
                    </MenuItem>
                    {ticketOptions["practices"]?.map((practice_id, index) => {
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
                </Grid>

                <Grid item sm>
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
                    <MenuItem value="" disabled hidden selected>
                      Choose a Provider
                    </MenuItem>
                    {ticketOptions["providers"] &&
                      ticketOptions["providers"].map((provider, index) => {
                        return (
                          <MenuItem
                            key={`provider_option-${index}`}
                            value={index}
                          >
                            {provider.name}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Grid>

                <Grid item sm>
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
                    <MenuItem value="" disabled hidden selected>
                      Choose a Ticket Type
                    </MenuItem>
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
                </Grid>

                <Grid item sm>
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
                    <MenuItem value="" disabled hidden>
                      Choose a Status
                    </MenuItem>
                    {!ticketOptions["status"][formik.values.ticket_type] ? (
                      <MenuItem value="" hidden disabled>
                        Please select the Ticket Type
                      </MenuItem>
                    ) : (
                      ticketOptions["status"][formik.values.ticket_type].map(
                        (item, index) => {
                          return (
                            <MenuItem
                              key={`tickettype_option-${index}`}
                              value={item}
                            >
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
                </Grid>
              </>
            )}
            {fromComponent === "addTicket" ? (
              Object.entries(ticketDetail).length < 1 && (
                <>
                  <Grid item sm={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <OutlinedInput
                        onChange={formik.handleChange}
                        value={formik.values.subject}
                        name="subject"
                        placeholder="Subject"
                        sx={{
                          borderRadius: "25px",
                          height: "36px",
                          background: "#fff",

                          "&::before,&::after": { display: "none" },
                        }}
                        type="text"
                        label=""
                      />
                    </FormControl>
                    <Typography my={"5px"} fontSize={"14px"} color={"red"}>
                      {formik.errors.subject}
                    </Typography>
                  </Grid>

                  <Grid item sm={12}>
                    <FormControl sx={{ width: "100%" }}>
                      <TextareaAutosize
                        onChange={formik.handleChange}
                        value={formik.values.comment}
                        name="comment"
                        placeholder="Comment Here"
                        style={{
                          width: "100%",
                          resize: "none",
                          minHeight: "30px",
                          borderRadius: "12px",
                          background: "#fff",
                          padding: "12px",
                          border: "none",
                        }}
                      ></TextareaAutosize>
                      <Typography my={"5px"} fontSize={"14px"} color={"red"}>
                        {formik.errors.comment}
                      </Typography>
                    </FormControl>
                  </Grid>
                </>
              )
            ) : (
              <>
                <Grid item sm={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <OutlinedInput
                      onChange={formik.handleChange}
                      value={formik.values.subject}
                      name="subject"
                      placeholder="Subject"
                      sx={{
                        borderRadius: "25px",
                        height: "36px",
                        background: "#fff",

                        "&::before,&::after": { display: "none" },
                      }}
                      type="text"
                      label=""
                    />
                  </FormControl>
                  <Typography my={"5px"} fontSize={"14px"} color={"red"}>
                    {formik.errors.subject}
                  </Typography>
                </Grid>

                <Grid item sm={12}>
                  <FormControl sx={{ width: "100%" }}>
                    <TextareaAutosize
                      onChange={formik.handleChange}
                      value={formik.values.comment}
                      name="comment"
                      placeholder="Comment Here"
                      style={{
                        width: "100%",
                        resize: "none",
                        minHeight: "30px",
                        borderRadius: "12px",
                        background: "#fff",
                        padding: "12px",
                        border: "none",
                      }}
                    ></TextareaAutosize>
                    <Typography my={"5px"} fontSize={"14px"} color={"red"}>
                      {formik.errors.comment}
                    </Typography>
                  </FormControl>
                </Grid>
              </>
            )}
          </Grid>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
            }}
          >
            {/* <Icon
              sx={{
                color: "black",
                border: "3px solid black",
                width: "40px",
                borderRadius: "12px",
                height: "40px",
              }}
            >
              <ReplyAllRoundedIcon />
            </Icon> */}

            {fromComponent === "addTicket" ? (
              Object.entries(ticketDetail).length < 1 ? (
                <Button
                  type="submit"
                  sx={{
                    borderRadius: "20px",
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
                  Submit
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    let body = {
                      practice_id: formik.values.practice_id,
                      provider_id: formik.values.provider_id,
                      status: formik.values.status,
                      ticket_type: formik.values.ticket_type,
                    };

                    ticketsCRUD
                      .updateTicket(ticketDetail.ID, body)
                      .then((data) => {
                        setTicketDetail(data);
                      })
                      .catch((err) => {
                        alert("Something wrong!!!");
                        console.log(err);
                      });
                  }}
                  type="button"
                  sx={{
                    borderRadius: "20px",
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
              )
            ) : (
              <Button
                type="submit"
                sx={{
                  borderRadius: "20px",
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
                Comment
              </Button>
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Comments;
