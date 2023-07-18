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
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import providersCRUD from "../../../services/http/provider";

const ProviderContactDetails = ({ practiceId, providerId }) => {
  const [practiceContactDetails, setPracticeContactDetails] = useState({});

  const [phnoList, setPhnoList] = useState([]);

  const [mailList, setMailList] = useState([]);

  const [locationList, setLocationList] = useState([]);

  useEffect(() => {
    providersCRUD
      .getProviderContactDetails(practiceId, providerId)
      .then((data) => {
        console.log(data);
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
          data["locations"].length !== 0
            ? data["locations"]
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
      locations: newlocationList,
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
    }
    let filteredLocationList = locationList.filter((item, i) => i !== index);
    setLocationList(filteredLocationList);
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

    providersCRUD
      .updateProviderContactDetails(
        practiceId,
        providerId,
        practiceContactDetails
      )
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
          data["locations"].length !== 0
            ? data["locations"]
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

        <Grid container sm gap={1}>
          {phnoList?.map((item, index) => {
            return (
              <Grid
                key={`phnoList-${index}`}
                item
                sm={12}
                lg={5}
                gap={2}
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
                </FormControl>{" "}
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

        <Grid container sm gap={1}>
          {mailList?.map((item, index) => {
            return (
              <Grid
                key={`mailList-${index}`}
                item
                sm={12}
                display={"flex"}
                gap={2}
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

        <Grid container sm gap={1}>
          {locationList?.map((item, index) => {
            return (
              <Grid
                key={`locationList-${index}`}
                item
                sm={12}
                display={"flex"}
                gap={2}
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
                </FormControl>{" "}
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
            Home Address
          </Typography>
        </Grid>

        <Grid item sm>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              value={practiceContactDetails["home_address"]}
              onChange={(e) =>
                setPracticeContactDetails({
                  ...practiceContactDetails,
                  home_address: e.target.value,
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
              value={practiceContactDetails["mailing_address"]}
              onChange={(e) =>
                setPracticeContactDetails({
                  ...practiceContactDetails,
                  mailing_address: e.target.value,
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
  );
};

export default ProviderContactDetails;
