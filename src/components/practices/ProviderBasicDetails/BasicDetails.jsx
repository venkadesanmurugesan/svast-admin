import {
  Box,
  Button,
  Divider,
  FormControl,
  OutlinedInput,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import providersCRUD from "../../../services/http/provider";
import moment from "moment";

const ProviderBasicDetails = ({ practiceId, providerId }) => {
  const [providerBasicDetailsData, setProviderBasicDetailsData] = useState({});

  useEffect(() => {
    providersCRUD
      .getProviderBasicDetails(practiceId, providerId)
      .then((data) => {
        setProviderBasicDetailsData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveDetail = () => {
    providersCRUD
      .updateProviderBasicDetails(
        practiceId,
        providerId,
        providerBasicDetailsData
      )
      .then((data) => {
        setProviderBasicDetailsData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box display={"flex"} flexDirection={"column"} gap={3}>
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
      <Box display={"flex"} alignItems={"center"}>
        <Typography
          sx={{ width: "20%" }}
          fontSize={"14px"}
          fontWeight={"bold"}
          color={"#999898"}
        >
          Full Name
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            name="name"
            value={providerBasicDetailsData?.name}
            onChange={(e) =>
              setProviderBasicDetailsData({
                ...providerBasicDetailsData,
                name: e.target.value,
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
      </Box>

      <Box display={"flex"} alignItems={"center"}>
        <Typography
          sx={{ width: "20%" }}
          fontSize={"14px"}
          fontWeight={"bold"}
          color={"#999898"}
        >
          Specialization
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            name="specialization"
            value={providerBasicDetailsData?.specialization}
            onChange={(e) =>
              setProviderBasicDetailsData({
                ...providerBasicDetailsData,
                specialization: e.target.value,
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
      </Box>

      <Box display={"flex"} gap={2}>
        {[
          { v1: "SSN", key: "ssn" },
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
                value={providerBasicDetailsData[item.key]}
                onChange={(e) => {
                  setProviderBasicDetailsData({
                    ...providerBasicDetailsData,
                    [item.key]: e.target.value,
                  });
                }}
                style={{
                  width: "100%",
                  border: "none",
                  padding: providerBasicDetailsData[item.key] && "4px",
                  // outline: "none",
                }}
              />
            </Box>
          );
        })}
      </Box>

      <Box display={"flex"} gap={5}>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
            Date of Birth
          </Typography>
          <FormControl>
            <OutlinedInput
              name="dob"
              value={moment(providerBasicDetailsData?.dob).format("YYYY-MM-DD")}
              onChange={(e) =>
                setProviderBasicDetailsData({
                  ...providerBasicDetailsData,
                  dob: moment(e.target.value).format("YYYY-MM-DDTHH:mm:ss[Z]"),
                })
              }
              sx={{
                borderRadius: "25px",
                height: "36px",
                background: "#fff",

                "&::before,&::after": { display: "none" },
              }}
              type="date"
              label=""
            />
          </FormControl>
        </Box>
        <Box display={"flex"} alignItems={"center"} gap={3}>
          <Typography fontSize={"14px"} fontWeight={"bold"} color={"#999898"}>
            Place of Birth
          </Typography>
          <FormControl>
            <OutlinedInput
              name="pob"
              value={providerBasicDetailsData?.pob}
              onChange={(e) =>
                setProviderBasicDetailsData({
                  ...providerBasicDetailsData,
                  pob: e.target.value,
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
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderBasicDetails;
