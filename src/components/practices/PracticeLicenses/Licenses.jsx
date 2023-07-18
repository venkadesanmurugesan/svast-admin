import {
  Box,
  Button,
  FormControl,
  IconButton,
  Modal,
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
import LicenseForm from "./LicenseForm";
import LicenseTable from "./LicenseTable";
import practicesCRUD from "../../../services/http/practices";

const Licenses = ({ practiceId }) => {
  const [isLicenseModalOpen, setIsLicenseModalOpen] = useState(false);
  const [licenseData, setLicenseData] = useState([]);
  const [deleteLicenseIDS, setDeleteLicenseIDS] = useState([]);
  const [modeOptions, setModeOptions] = useState({
    mode: "",
    data: null,
  });

  useEffect(() => {
    practicesCRUD
      .getPracticeLicenseDetails(practiceId)
      .then((data) => {
        setLicenseData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveDetail = () => {
    let sendDeletedLicenseIDS = {
      license_deletable_ids: deleteLicenseIDS,
    };

    practicesCRUD
      .updatePracticeLicenseDetails(practiceId, sendDeletedLicenseIDS)
      .then((data) => {
        setLicenseData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Box>
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
      <LicenseTable
        setModeOptions={(value) => setModeOptions(value)}
        setIsLicenseModalOpen={(value) => setIsLicenseModalOpen(value)}
        setLicenseData={(value) => setLicenseData(value)}
        setDeleteLicenseIDS={(value) => setDeleteLicenseIDS(value)}
        deleteLicenseIDS={deleteLicenseIDS}
        licenseData={licenseData}
      />
      <Button
        onClick={() => {
          setIsLicenseModalOpen(true);
          setModeOptions({ mode: "add", data: {} });
        }}
        sx={{ color: "#4DB5E8", mt: "20px", mb: 5 }}
        variant="text"
        startIcon={<AddCircleRoundedIcon />}
      >
        <Typography
          textTransform={"capitalize"}
          fontWeight={"bold"}
          color={"#807F7F"}
          fontSize={"14px"}
        >
          Add New License
        </Typography>
      </Button>

      {/* <Box display={"flex"} alignItems={"center"}>
        <Typography
          sx={{ width: "30%" }}
          fontSize={"14px"}
          fontWeight={"bold"}
          color={"#999898"}
        >
          Hospital Affiliations
        </Typography>
        <FormControl sx={{ width: "100%" }}>
          <OutlinedInput
            sx={{
              borderRadius: "12px",
              height: "50px",
              background: "#fff",

              "&::before,&::after": { display: "none" },
            }}
            type="text"
            label=""
          />
        </FormControl>
      </Box> */}

      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        open={isLicenseModalOpen}
        onClose={() => setIsLicenseModalOpen(false)}
      >
        <Box
          sx={{
            minWidth: "410px",
            minHeight: "50px",
          }}
        >
          <LicenseForm
            modeOptions={modeOptions}
            setLicenseData={(data) => setLicenseData(data)}
            practiceId={practiceId}
            setIsLicenseModalOpen={(value) => setIsLicenseModalOpen(value)}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Licenses;
