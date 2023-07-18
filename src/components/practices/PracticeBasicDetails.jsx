import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  IconButton,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import practicesCRUD from "../../services/http/practices";
import { useFormik } from "formik";
import moment from "moment";

const PracticeBasicDetails = ({ practiceId }) => {
  const [practiceBasicDetails, setPracticeBasicDetails] = useState({});
  const [ownershipDetails, setOwnershipDetails] = useState();
  // const [removeOwnershipDetails, setRemoveOwnershipDetails] = useState([]);

  useEffect(() => {
    practicesCRUD
      .getPracticeBasicDetails(practiceId)
      .then((data) => {
        setPracticeBasicDetails(data);
        setOwnershipDetails(
          data["ownership_details"].length !== 0
            ? data["ownership_details"]
            : [{ id: 0, practice_id: practiceId }]
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleOwnerDetails = ({ key, value, index }) => {
    let owners = [...ownershipDetails];
    owners[index] = {
      ...owners[index],
      [key]: key === "ownership_percent" ? Number(value) : value,
    };
    setOwnershipDetails(owners);
    setPracticeBasicDetails({
      ...practiceBasicDetails,
      ownership_details: owners,
    });
  };

  const deleteOwnerDetail = (index) => {
    let owners = [...ownershipDetails];
    if (owners[index].id !== 0) {
      setPracticeBasicDetails({
        ...practiceBasicDetails,
        ownership_deletable_ids: [
          ...practiceBasicDetails["ownership_deletable_ids"],
          owners[index].id,
        ],
      });
      // setRemoveOwnershipDetails([...removeOwnershipDetails, owners[index].id]);
    }
    let filteredOwners = ownershipDetails.filter((item, i) => i !== index);
    setOwnershipDetails(filteredOwners);
  };

  const saveDetail = () => {
    // let readyToSend =
    //   removeOwnershipDetails.length === 0
    //     ? practiceBasicDetails
    //     : {
    //         ownership_deletable_ids: removeOwnershipDetails,
    //       };

    practicesCRUD
      .updatePracticeBasicDetails(practiceId, practiceBasicDetails)
      .then((data) => {
        console.log(data);
        setPracticeBasicDetails(data);
        setOwnershipDetails(
          data["ownership_details"].length !== 0
            ? data["ownership_details"]
            : [{ id: 0, practice_id: practiceId }]
        );
      })
      .catch((err) => {
        console.error(err);
      });

    // console.log(ownership_deletable_ids);
  };

  return (
    <>
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
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Grid container alignItems={"center"}>
          <Grid item sm={2}>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              Full Name
            </Typography>
          </Grid>

          <Grid item sm>
            <FormControl sx={{ width: "100%" }}>
              <OutlinedInput
                value={practiceBasicDetails.practice_name}
                onChange={(e) =>
                  setPracticeBasicDetails({
                    ...practiceBasicDetails,
                    practice_name: e.target.value,
                  })
                }
                name="practice_name"
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
        <Grid container alignItems={"center"}>
          <Grid item sm={2}>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              Website
            </Typography>
          </Grid>

          <Grid item sm>
            <FormControl sx={{ width: "100%" }}>
              <OutlinedInput
                value={practiceBasicDetails.website_url}
                onChange={(e) =>
                  setPracticeBasicDetails({
                    ...practiceBasicDetails,
                    website_url: e.target.value,
                  })
                }
                name="website_url"
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
        <Box display={"flex"} gap={2}>
          {[
            { v1: "Tax ID", key: "tax_id" },
            { v1: "NPI", key: "npi" },
            { v1: "Taxonomy", key: "taxonomy" },
          ].map((item, index) => {
            return (
              <Box
                key={`basic_details_card-${index}`}
                bgcolor={"#fff"}
                minWidth={"18%"}
                p={1}
                borderRadius={"12px"}
              >
                <Typography fontSize={"14px"} fontWeight={"bold"}>
                  {item.v1}
                </Typography>
                <Divider />
                <input
                  type="text"
                  value={practiceBasicDetails[item.key]}
                  onChange={(e) => {
                    setPracticeBasicDetails({
                      ...practiceBasicDetails,
                      [item.key]: e.target.value,
                    });
                  }}
                  style={{
                    width: "100%",
                    border: "none",
                    padding: practiceBasicDetails[item.key] && "4px",
                    // outline: "none",
                  }}
                />
              </Box>
            );
          })}
        </Box>
        <Grid container alignItems={"center"}>
          <Grid item sm={2}>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              Office Hours
            </Typography>
          </Grid>

          <Grid sm item display={"flex"} alignItems={"center"} gap={3}>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              From
            </Typography>
            <FormControl>
              <OutlinedInput
                value={moment
                  .utc(practiceBasicDetails.office_hrs_from)
                  .format("HH:mm")}
                onChange={(e) =>
                  setPracticeBasicDetails({
                    ...practiceBasicDetails,
                    office_hrs_from: moment(e.target.value, "HH:mm").format(
                      "YYYY-MM-DDTHH:mm:ss[Z]"
                    ),
                  })
                }
                name="office_hrs_from"
                sx={{
                  borderRadius: "25px",
                  height: "36px",
                  background: "#fff",

                  "&::before,&::after": { display: "none" },
                }}
                type="time"
                label=""
              />
            </FormControl>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              To
            </Typography>
            <FormControl>
              <OutlinedInput
                value={moment
                  .utc(practiceBasicDetails.office_hrs_to)
                  .format("HH:mm")}
                onChange={(e) =>
                  setPracticeBasicDetails({
                    ...practiceBasicDetails,
                    office_hrs_to: moment(e.target.value, "HH:mm").format(
                      "YYYY-MM-DDTHH:mm:ss[Z]"
                    ),
                  })
                }
                name="office_hrs_to"
                sx={{
                  borderRadius: "25px",
                  height: "36px",
                  background: "#fff",

                  "&::before,&::after": { display: "none" },
                }}
                type="time"
                label=""
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container alignItems={"start"}>
          <Grid item sm={2}>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              Ownership
            </Typography>
          </Grid>
          <Grid item sm>
            {ownershipDetails?.map((item, index) => {
              return (
                <React.Fragment key={`ownerdetails-${index}`}>
                  <Box mb={"5px"} display={"flex"} gap={3}>
                    <FormControl>
                      <OutlinedInput
                        value={item["owner_name"]}
                        onChange={(e) =>
                          handleOwnerDetails({
                            key: "owner_name",
                            value: e.target.value,
                            index,
                          })
                        }
                        name="owner_name"
                        placeholder="Owner Name"
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
                    <FormControl>
                      <OutlinedInput
                        value={item["ownership_percent"]}
                        onChange={(e) =>
                          handleOwnerDetails({
                            key: "ownership_percent",
                            value: e.target.value,
                            index,
                          })
                        }
                        inputProps={{ max: 100, min: 1 }}
                        name="ownership_percent"
                        placeholder="% Ownership"
                        sx={{
                          borderRadius: "25px",
                          height: "36px",
                          background: "#fff",

                          "&::before,&::after": { display: "none" },
                        }}
                        type="Number"
                        label=""
                      />
                    </FormControl>
                    {index !== 0 && (
                      <IconButton
                        onClick={() => deleteOwnerDetail(index)}
                        sx={{ padding: "0", color: "#4DB5E8" }}
                      >
                        <RemoveCircleSharpIcon />
                      </IconButton>
                    )}

                    <IconButton
                      onClick={() => {
                        setOwnershipDetails([
                          ...ownershipDetails,
                          { id: 0, practice_id: practiceId },
                        ]);
                      }}
                      sx={{ padding: "0", color: "#4DB5E8" }}
                    >
                      <AddCircleRoundedIcon />
                    </IconButton>
                  </Box>
                </React.Fragment>
              );
            })}
          </Grid>
        </Grid>
        <Grid container alignItems={"start"}>
          <Grid item sm={2}>
            <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
              Bank Information
            </Typography>
          </Grid>

          <Grid item sm display={"flex"} gap={2} flexWrap={"wrap"}>
            <Box>
              <FormControl fullWidth>
                <OutlinedInput
                  value={practiceBasicDetails.bank_name}
                  onChange={(e) =>
                    setPracticeBasicDetails({
                      ...practiceBasicDetails,
                      bank_name: e.target.value,
                    })
                  }
                  name="bank_name"
                  placeholder="Bank Name "
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
            </Box>
            <Box>
              <FormControl fullWidth>
                <OutlinedInput
                  value={practiceBasicDetails.bank_acc_no}
                  onChange={(e) =>
                    setPracticeBasicDetails({
                      ...practiceBasicDetails,
                      bank_acc_no: e.target.value,
                    })
                  }
                  name="bank_acc_no"
                  placeholder="Account Number"
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
            </Box>
            <Box>
              <FormControl fullWidth>
                <OutlinedInput
                  value={practiceBasicDetails.bank_transfer_id}
                  onChange={(e) =>
                    setPracticeBasicDetails({
                      ...practiceBasicDetails,
                      bank_transfer_id: e.target.value,
                    })
                  }
                  name="bank_transfer_id"
                  placeholder="Transfer ID"
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
            </Box>
            <Box>
              <FormControl fullWidth>
                <OutlinedInput
                  value={practiceBasicDetails.bank_address}
                  onChange={(e) =>
                    setPracticeBasicDetails({
                      ...practiceBasicDetails,
                      bank_address: e.target.value,
                    })
                  }
                  name="bank_address"
                  placeholder="Bank Address"
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
            </Box>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default PracticeBasicDetails;
