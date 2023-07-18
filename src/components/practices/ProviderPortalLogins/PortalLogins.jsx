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
import PortalLoginForm from "./PortalLoginsForm";
import PortalLoginTable from "./PortalLoginsTable";
import practicesCRUD from "../../../services/http/practices";
import providersCRUD from "../../../services/http/provider";

const ProviderPortalLogins = ({ practiceId, providerId }) => {
  const [isPortalLoginModalOpen, setIsPortalLoginModalOpen] = useState(false);
  const [portalLoginData, setPortalLoginData] = useState([]);
  const [deletePortalLoginIDS, setDeletePortalLoginIDS] = useState([]);
  const [modeOptions, setModeOptions] = useState({
    mode: "",
    data: null,
  });

  useEffect(() => {
    providersCRUD
      .getProviderPortalLogins(practiceId, providerId)
      .then((data) => {
        setPortalLoginData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const saveDetail = () => {
    let sendDeletedPortalLoginIDS = {
      portal_login_deletable_ids: deletePortalLoginIDS,
    };

    providersCRUD
      .updateProviderPortalLogins(
        practiceId,
        providerId,
        sendDeletedPortalLoginIDS
      )
      .then((data) => {
        setPortalLoginData(data);
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
      <PortalLoginTable
        setModeOptions={(value) => setModeOptions(value)}
        setIsPortalLoginModalOpen={(value) => setIsPortalLoginModalOpen(value)}
        setPortalLoginData={(value) => setPortalLoginData(value)}
        setDeletePortalLoginIDS={(value) => setDeletePortalLoginIDS(value)}
        deletePortalLoginIDS={deletePortalLoginIDS}
        portalLoginData={portalLoginData}
      />
      <Button
        onClick={() => {
          setIsPortalLoginModalOpen(true);
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
          Add New Portal
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
        open={isPortalLoginModalOpen}
        onClose={() => setIsPortalLoginModalOpen(false)}
      >
        <Box
          sx={{
            minWidth: "410px",
            minHeight: "50px",
          }}
        >
          <PortalLoginForm
            providerId={providerId}
            modeOptions={modeOptions}
            setPortalLoginData={(data) => setPortalLoginData(data)}
            practiceId={practiceId}
            setIsPortalLoginModalOpen={(value) =>
              setIsPortalLoginModalOpen(value)
            }
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default ProviderPortalLogins;
