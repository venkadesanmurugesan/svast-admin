import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import practicesCRUD from "../../services/http/practices";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";

const PracticeContactDetails = ({ practiceId }) => {
  const [practiceContactDetails, setPracticeContactDetails] = useState({});

  const [phnoList, setPhnoList] = useState([]);
  // const [removePhnoList, setRemovePhnoList] = useState([]);

  const [mailList, setMailList] = useState([]);
  // const [removeMailList, setRemoveMailList] = useState([]);

  const [locationList, setLocationList] = useState([]);
  // const [removeLocationList, setRemoveLocationList] = useState([]);

  const [contactPhnoList, setContactPhnoList] = useState([]);
  // const [removeContactPhnoList, setRemoveContactPhnoList] = useState([]);

  const [contactMailList, setContactMailList] = useState([]);
  // const [removeContactMailList, setRemoveContactMailList] = useState([]);

  useEffect(() => {
    practicesCRUD
      .getPracticeContactDetails(practiceId)
      .then((data) => {
        setPracticeContactDetails(data);
        setPhnoList(
          data["phonenumbers"].length !== 0
            ? data["phonenumbers"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setMailList(
          data["emails"].length !== 0
            ? data["emails"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setLocationList(
          data["practice_locations"].length !== 0
            ? data["practice_locations"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setContactPhnoList(
          data["contact_person_phonenumbers"].length !== 0
            ? data["contact_person_phonenumbers"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setContactMailList(
          data["contact_person_emails"].length !== 0
            ? data["contact_person_emails"]
            : [{ id: 0, practice_id: practiceId }]
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handlePhList = (value, index) => {
    let newPhNumbers = [...phnoList];
    newPhNumbers[index] = {
      ...newPhNumbers[index],
      phonenumber: value,
    };

    setPhnoList(newPhNumbers);
    setPracticeContactDetails({
      ...practiceContactDetails,
      phonenumbers: newPhNumbers,
    });
  };

  const deletePhList = (index) => {
    let phNumbers = [...phnoList];
    if (phNumbers[index].id !== 0) {
      setPracticeContactDetails({
        ...practiceContactDetails,
        phonenumber_deletable_ids: [
          ...practiceContactDetails["phonenumber_deletable_ids"],
          phNumbers[index].id,
        ],
      });
      // setRemovePhnoList([...removePhnoList, phNumbers[index].id]);
    }
    let filteredPhNumbers = phnoList.filter((item, i) => i !== index);
    setPhnoList(filteredPhNumbers);
    // setPracticeContactDetails({
    //   ...practiceContactDetails,
    //   phonenumbers: filteredPhNumbers,
    // });
  };

  const handleMailList = (value, index) => {
    let newMailList = [...mailList];
    newMailList[index] = {
      ...newMailList[index],
      email: value,
    };

    setMailList(newMailList);
    setPracticeContactDetails({
      ...practiceContactDetails,
      emails: newMailList,
    });
  };

  const deleteMailList = (index) => {
    let mails = [...mailList];
    if (mails[index].id !== 0) {
      setPracticeContactDetails({
        ...practiceContactDetails,
        email_deletable_ids: [
          ...practiceContactDetails["email_deletable_ids"],
          mails[index].id,
        ],
      });
      // setRemoveMailList([...removeMailList, mails[index].id]);
    }
    let filteredMailList = mailList.filter((item, i) => i !== index);
    setMailList(filteredMailList);
    // setPracticeContactDetails({
    //   ...practiceContactDetails,
    //   emails: filteredMailList,
    // });
  };

  const handleLocationList = (value, index) => {
    let newlocationList = [...locationList];

    newlocationList[index] = {
      ...newlocationList[index],
      location: value,
    };

    setLocationList(newlocationList);
    setPracticeContactDetails({
      ...practiceContactDetails,
      practice_locations: newlocationList,
    });
  };

  const deleteLocationList = (index) => {
    let locations = [...locationList];
    if (locations[index].id !== 0) {
      setPracticeContactDetails({
        ...practiceContactDetails,
        location_deletable_ids: [
          ...practiceContactDetails["location_deletable_ids"],
          locations[index].id,
        ],
      });
      // setRemoveLocationList([...removeLocationList, locations[index].id]);
    }
    let filteredLocationList = locationList.filter((item, i) => i !== index);
    setLocationList(filteredLocationList);
    // setPracticeContactDetails({
    //   ...practiceContactDetails,
    //   practice_locations: filteredLocationList,
    // });
  };

  const handleContactPhList = (value, index) => {
    let newcontactPhnoList = [...contactPhnoList];
    newcontactPhnoList[index] = {
      ...newcontactPhnoList[index],
      phonenumber: value,
    };

    setContactPhnoList(newcontactPhnoList);
    setPracticeContactDetails({
      ...practiceContactDetails,
      contact_person_phonenumbers: newcontactPhnoList,
    });
  };

  const deleteContactPhList = (index) => {
    let contactPhNumbers = [...contactPhnoList];
    if (contactPhNumbers[index].id !== 0) {
      setPracticeContactDetails({
        ...practiceContactDetails,
        contact_person_phonenumber_deletable_ids: [
          ...practiceContactDetails["contact_person_phonenumber_deletable_ids"],
          contactPhNumbers[index].id,
        ],
      });

      // setRemoveContactPhnoList([
      //   ...removeContactPhnoList,
      //   contactPhNumbers[index].id,
      // ]);
    }
    let filteredContactPhList = contactPhnoList.filter(
      (item, i) => i !== index
    );
    setContactPhnoList(filteredContactPhList);
    // setPracticeContactDetails({
    //   ...practiceContactDetails,
    //   contact_person_phonenumbers: filteredContactPhList,
    // });
  };

  const handleContactMailList = (value, index) => {
    let newcontactMailList = [...contactMailList];
    newcontactMailList[index] = {
      ...newcontactMailList[index],
      email: value,
    };

    setContactMailList(newcontactMailList);
    setPracticeContactDetails({
      ...practiceContactDetails,
      contact_person_emails: newcontactMailList,
    });
  };

  const deleteContactMailList = (index) => {
    let contactMails = [...contactMailList];
    if (contactMails[index].id !== 0) {
      setPracticeContactDetails({
        ...practiceContactDetails,
        contact_person_email_deletable_ids: [
          ...practiceContactDetails["contact_person_email_deletable_ids"],
          contactMails[index].id,
        ],
      });
      // setRemoveContactMailList([
      //   ...removeContactMailList,
      //   contactMails[index].id,
      // ]);
    }
    let filteredContactMailList = contactMailList.filter(
      (item, i) => i !== index
    );
    setContactMailList(filteredContactMailList);
    // setPracticeContactDetails({
    //   ...practiceContactDetails,
    //   contact_person_emails: filteredContactMailList,
    // });
  };

  const saveDetail = () => {
    // let readyToSend =
    //   removePhnoList.length !== 0
    //     ? {
    //         phonenumber_deletable_ids: removePhnoList,
    //       }
    //     : removeMailList.length !== 0
    //     ? {
    //         email_deletable_ids: removeMailList,
    //       }
    //     : removeLocationList.length !== 0
    //     ? {
    //         location_deletable_ids: removeLocationList,
    //       }
    //     : removeContactPhnoList.length !== 0
    //     ? {
    //         contact_person_phonenumber_ids: removeContactPhnoList,
    //       }
    //     : removeContactMailList.length !== 0
    //     ? {
    //         contact_person_email_deletable_ids: removeContactMailList,
    //       }
    //     : practiceContactDetails;

    console.log(practiceContactDetails);
    practicesCRUD
      .updatePracticeContactDetails(practiceId, practiceContactDetails)
      .then((data) => {
        setPracticeContactDetails(data);

        setPhnoList(
          data["phonenumbers"].length !== 0
            ? data["phonenumbers"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setMailList(
          data["emails"].length !== 0
            ? data["emails"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setLocationList(
          data["practice_locations"].length !== 0
            ? data["practice_locations"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setContactPhnoList(
          data["contact_person_phonenumbers"].length !== 0
            ? data["contact_person_phonenumbers"]
            : [{ id: 0, practice_id: practiceId }]
        );

        setContactMailList(
          data["contact_person_emails"].length !== 0
            ? data["contact_person_emails"]
            : [{ id: 0, practice_id: practiceId }]
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={2}>
      <Button
        onClick={saveDetail}
        sx={{
          position: "absolute",
          bottom: { lg: "24px", md: "19px" },
          right: "150px",
          minHeight: "38px",
          borderRadius: "12px",
          boxShadow: "none",
          fontSize: "14px",
          textTransform: "capitalize",
          background: "#4DB5E8",
          "&:hover": {
            background: "#4DB5E8",
          },
          zIndex: 1,
        }}
        variant="contained"
      >
        Save Details
      </Button>

      <Grid container gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Phone Numbers
          </Typography>
        </Grid>

        <Grid container sm gap={2}>
          {phnoList?.map((item, index) => {
            return (
              <Grid
                key={`phnoList-${index}`}
                item
                lg={5}
                sm={12}
                gap={1}
                display={"flex"}
              >
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={item["phonenumber"]}
                    onChange={(e) => handlePhList(e.target.value, index)}
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
                {index === 0 && (
                  <IconButton
                    onClick={() => {
                      setPhnoList([
                        ...phnoList,
                        { id: 0, practice_id: practiceId },
                      ]);
                    }}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                )}
                {index !== 0 && (
                  <IconButton
                    onClick={() => deletePhList(index)}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <RemoveCircleSharpIcon />
                  </IconButton>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid container gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Email
          </Typography>
        </Grid>

        <Grid container sm gap={2}>
          {mailList?.map((item, index) => {
            return (
              <Grid
                key={`mailList-${index}`}
                item
                sm={12}
                display={"flex"}
                gap={1}
              >
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={item["email"]}
                    onChange={(e) => handleMailList(e.target.value, index)}
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
                {index === 0 && (
                  <IconButton
                    onClick={() => {
                      setMailList([
                        ...mailList,
                        { id: 0, practice_id: practiceId },
                      ]);
                    }}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                )}
                {index !== 0 && (
                  <IconButton
                    onClick={() => deleteMailList(index)}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <RemoveCircleSharpIcon />
                  </IconButton>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid container gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Practice Location
          </Typography>
        </Grid>

        <Grid container sm gap={2}>
          {locationList?.map((item, index) => {
            return (
              <Grid
                key={`locationList-${index}`}
                item
                sm={12}
                display={"flex"}
                gap={1}
              >
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={item["location"]}
                    onChange={(e) => handleLocationList(e.target.value, index)}
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
                {index === 0 && (
                  <IconButton
                    onClick={() => {
                      setLocationList([
                        ...locationList,
                        { id: 0, practice_id: practiceId },
                      ]);
                    }}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                )}

                {index !== 0 && (
                  <IconButton
                    onClick={() => deleteLocationList(index)}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <RemoveCircleSharpIcon />
                  </IconButton>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid container alignItems={"center"} gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Billing Address
          </Typography>
        </Grid>

        <Grid item sm>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              value={practiceContactDetails["billing_address"]}
              onChange={(e) =>
                setPracticeContactDetails({
                  ...practiceContactDetails,
                  billing_address: e.target.value,
                })
              }
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
        </Grid>
      </Grid>

      <Grid container alignItems={"center"} gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Mailing Address
          </Typography>
        </Grid>

        <Grid item sm>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              value={practiceContactDetails["mail_address"]}
              onChange={(e) =>
                setPracticeContactDetails({
                  ...practiceContactDetails,
                  mail_address: e.target.value,
                })
              }
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
        </Grid>
      </Grid>

      <Box>
        <Typography
          mb={1}
          fontWeight={"bold"}
          color={"#807F7F"}
          fontSize={"14px"}
        >
          Contact Person
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container alignItems={"center"} gap={1}>
          <Grid item sm={2}>
            <Typography
              sx={{ width: "100%" }}
              fontSize={"14px"}
              fontWeight={"bold"}
              color={"#999898"}
            >
              Full Name
            </Typography>
          </Grid>

          <Grid item sm>
            <FormControl sx={{ width: "100%" }}>
              <OutlinedInput
                value={practiceContactDetails["contact_person"]}
                onChange={(e) =>
                  setPracticeContactDetails({
                    ...practiceContactDetails,
                    contact_person: e.target.value,
                  })
                }
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
          </Grid>
        </Grid>
      </Box>

      <Grid container gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Phone Numbers
          </Typography>
        </Grid>

        <Grid container sm gap={2}>
          {contactPhnoList?.map((item, index) => {
            return (
              <Grid
                key={`contactPhnoList-${index}`}
                item
                sm={12}
                lg={5}
                display={"flex"}
                gap={1}
              >
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={item["phonenumber"]}
                    onChange={(e) => handleContactPhList(e.target.value, index)}
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
                {index === 0 && (
                  <IconButton
                    onClick={() => {
                      setContactPhnoList([
                        ...contactPhnoList,
                        { id: 0, practice_id: practiceId },
                      ]);
                    }}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                )}
                {index !== 0 && (
                  <IconButton
                    onClick={() => deleteContactPhList(index)}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <RemoveCircleSharpIcon />
                  </IconButton>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>

      <Grid container gap={1}>
        <Grid item sm={2}>
          <Typography
            sx={{ width: "100%" }}
            fontSize={"14px"}
            fontWeight={"bold"}
            color={"#999898"}
          >
            Email
          </Typography>
        </Grid>
        <Grid container sm gap={2}>
          {contactMailList?.map((item, index) => {
            return (
              <Grid
                key={`contactMailList-${index}`}
                item
                sm={12}
                display={"flex"}
                gap={1}
              >
                <FormControl sx={{ width: "100%" }}>
                  <OutlinedInput
                    value={item["email"]}
                    onChange={(e) =>
                      handleContactMailList(e.target.value, index)
                    }
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
                {index === 0 && (
                  <IconButton
                    onClick={() => {
                      setContactMailList([
                        ...contactMailList,
                        { id: 0, practice_id: practiceId },
                      ]);
                    }}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <AddCircleRoundedIcon />
                  </IconButton>
                )}

                {index !== 0 && (
                  <IconButton
                    onClick={() => deleteContactMailList(index)}
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <RemoveCircleSharpIcon />
                  </IconButton>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export default PracticeContactDetails;
