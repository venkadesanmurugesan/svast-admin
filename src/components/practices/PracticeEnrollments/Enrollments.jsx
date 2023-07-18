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
import EnrollmentsForm from "./EnrollmentsForm";
import EnrollmentsTable from "./EnrollmentsTable";
import practicesCRUD from "../../../services/http/practices";

const Enrollments = ({ practiceId }) => {
  const [isEnrollmentsModalOpen, setIsEnrollmentsModalOpen] = useState(false);
  const [enrollmentData, setEnrollmentData] = useState([]);
  const [deleteEnrollmentIDS, setDeleteEnrollmentIDS] = useState([]);
  const [modeOptions, setModeOptions] = useState({
    mode: "",
    data: null,
  });

  useEffect(() => {
    practicesCRUD
      .getPracticeEnrollmentDetails(practiceId)
      .then((data) => {
        setEnrollmentData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveDetail = () => {
    let sendDeletedEnrollmentIDS = {
      enrollment_deletable_ids: deleteEnrollmentIDS,
    };

    practicesCRUD
      .updatePracticeEnrollmentDetails(practiceId, sendDeletedEnrollmentIDS)
      .then((data) => {
        setEnrollmentData(data);
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
      <EnrollmentsTable
        setModeOptions={(value) => setModeOptions(value)}
        setIsEnrollmentsModalOpen={(value) => setIsEnrollmentsModalOpen(value)}
        setEnrollmentData={(value) => setEnrollmentData(value)}
        setDeleteEnrollmentIDS={(value) => setDeleteEnrollmentIDS(value)}
        deleteEnrollmentIDS={deleteEnrollmentIDS}
        enrollmentData={enrollmentData}
      />
      <Button
        onClick={() => {
          setIsEnrollmentsModalOpen(true);
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
          Add New Payer
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
        open={isEnrollmentsModalOpen}
        onClose={() => setIsEnrollmentsModalOpen(false)}
      >
        <Box
          sx={{
            minWidth: "410px",
            minHeight: "50px",
          }}
        >
          <EnrollmentsForm
            modeOptions={modeOptions}
            setEnrollmentData={(data) => setEnrollmentData(data)}
            practiceId={practiceId}
            setIsEnrollmentsModalOpen={(value) =>
              setIsEnrollmentsModalOpen(value)
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Enrollments;
