import { Timeline, TimelineOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Link,
  List,
  Modal,
  Stack,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import dummyProviders from "../../data/dummyProviders.json";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import BasicDetails from "./ProviderBasicDetails/BasicDetails";
import ContactDetails from "./ProviderContactDetails/ContactDetails";
import Licenses from "./PracticeLicenses/Licenses";
import Enrollments from "./PracticeEnrollments/Enrollments";
import PortalLogins from "./PracticePortalLogins/PortalLogins";
import Documents from "./Documents";
import IosShareSharpIcon from "@mui/icons-material/IosShareSharp";
import CloseIcon from "@mui/icons-material/Close";
import PracticeBasicDetails from "./PracticeBasicDetails";
import PracticeContactDetails from "./PracticeContactDetails";
import AddProviderForm from "./AddProviderForm";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import providersCRUD from "../../services/http/provider";
import ProviderContactDetails from "./ProviderContactDetails/ContactDetails";
import ProviderBasicDetails from "./ProviderBasicDetails/BasicDetails";
import ProviderLicenses from "./ProviderLicenses/Licenses";
import ProviderEnrollments from "./ProviderEnrollments/Enrollments";
import ProviderPortalLogins from "./ProviderPortalLogins/PortalLogins";
import MenuIcon from "@mui/icons-material/Menu";
import practicesCRUD from "../../services/http/practices";
import Comments from "../tickets/Comments";

const PracticeAlphaBody = ({ practiceId, setPracticeName }) => {
  const [navTab, setNavTab] = useState("practiceFormNav1");
  const [providerId, setProviderId] = useState();
  const [navActiveColor, setNavActiveColor] = useState();
  const [formMode, setFormMode] = useState("practiceForm");
  const [isProviderModalOpen, setIsProviderModalOpen] = useState(false);
  const [providerData, setProviderData] = useState([]);
  const [isShowProviders, setShowProviders] = useState(false);
  const [practiceDatum, setPracticeDatum] = useState({});

  useEffect(() => {
    providersCRUD
      .getProviders(practiceId)
      .then((data) => {
        setProviderData(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    practicesCRUD
      .getPractice(practiceId)
      .then((data) => {
        setPracticeDatum(data);
        setPracticeName(data["practice_name"]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const PracticeAlphaProvidersSideBar = () => {
    return (
      <Box
        pt={6}
        pb={2}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"space-between"}
        height={"100%"}
      >
        <Box>
          <Button
            onClick={() => {
              setShowProviders(false);
              setNavActiveColor("practice");
              setFormMode("practiceForm");
              setNavTab("practiceFormNav1");
            }}
            sx={{
              pl: 2,
              mb: 2,
              textTransform: "capitalize",
              justifyContent: "start",
              fontWeight: "bold",
              color: "#807F7F",
              fontSize: "16px",
              width: "100%",
              borderRadius: 0,
              bgcolor: `${
                navActiveColor === "practice" || formMode === "practiceForm"
                  ? "#D9D9D9"
                  : null
              }`,
              "&:hover": {
                bgcolor: `${
                  navActiveColor === "practice" || formMode === "practiceForm"
                    ? "#D9D9D9"
                    : null
                }`,
              },
            }}
          >
            {practiceDatum?.practice_name}
          </Button>
          {providerData.map((provider, index) => {
            return (
              <Box
                key={`provider-${index}`}
                display={"flex"}
                gap={1}
                alignItems={"baseline"}
                sx={{
                  bgcolor: `${
                    navActiveColor === `provider${index}` ? "#D9D9D9" : null
                  }`,
                }}
              >
                <Box
                  ml={2}
                  sx={{
                    border: "2px solid #B9B9B9",
                    borderStyle: "none none dashed dashed",
                  }}
                  width={"25px"}
                  height={"40px"}
                ></Box>
                <Button
                  onClick={() => {
                    setShowProviders(false);
                    setNavActiveColor(`provider${index}`);
                    setFormMode("providerForm");
                    setNavTab("providerFormNav1");
                    setProviderId(provider["ID"]);
                  }}
                  sx={{
                    p: 0,
                    mr: 2,
                    color: "#807F7F",
                    fontSize: "14px",
                  }}
                >
                  {provider.name}
                </Button>
              </Box>
            );
          })}
          <Button
            onClick={() => setIsProviderModalOpen(true)}
            sx={{ color: "#4DB5E8", mt: "20px", width: "100%" }}
            variant="text"
            startIcon={<AddCircleRoundedIcon />}
          >
            <Typography
              textTransform={"capitalize"}
              fontWeight={"bold"}
              color={"#807F7F"}
              fontSize={"14px"}
            >
              Add New Provider
            </Typography>
          </Button>
        </Box>

        <Button
          sx={{ color: "#4DB5E8", mt: "20px" }}
          variant="text"
          startIcon={<IosShareSharpIcon />}
        >
          <Typography
            textTransform={"capitalize"}
            fontWeight={"bold"}
            color={"#807F7F"}
            fontSize={"14px"}
          >
            Export Data To File
          </Typography>
        </Button>
      </Box>
    );
  };
  const PracticeAlphaFormNavTabs = () => {
    return (
      <>
        {
          {
            providerFormNav1: (
              <ProviderBasicDetails
                practiceId={practiceId}
                providerId={providerId}
              />
            ),
            providerFormNav2: (
              <ProviderContactDetails
                practiceId={practiceId}
                providerId={providerId}
              />
            ),
            providerFormNav3: (
              <ProviderLicenses
                practiceId={practiceId}
                providerId={providerId}
              />
            ),
            providerFormNav4: (
              <ProviderEnrollments
                practiceId={practiceId}
                providerId={providerId}
              />
            ),
            providerFormNav5: (
              <ProviderPortalLogins
                practiceId={practiceId}
                providerId={providerId}
              />
            ),
            providerFormNav6: <Documents />,
            practiceFormNav1: <PracticeBasicDetails practiceId={practiceId} />,
            practiceFormNav2: (
              <PracticeContactDetails practiceId={practiceId} />
            ),
            practiceFormNav3: <Licenses practiceId={practiceId} />,
            practiceFormNav4: <Enrollments practiceId={practiceId} />,
            practiceFormNav5: <PortalLogins practiceId={practiceId} />,
            practiceFormNav6: <Documents />,
          }[navTab]
        }
      </>
    );
  };

  return (
    <Grid
      height={"550px"}
      position={"relative"}
      container
      sx={{ gap: { lg: 2 } }}
      justifyContent={"space-between"}
    >
      {!isShowProviders && (
        <Grid
          item
          sx={{
            display: { lg: "none" },
          }}
        >
          <IconButton onClick={() => setShowProviders(true)} color="inherit">
            <MenuIcon />
          </IconButton>
        </Grid>
      )}

      <Grid
        sx={{
          width: isShowProviders
            ? { md: "300px", lg: "300px" }
            : { md: 0, lg: "300px" },
          position: isShowProviders ? { md: "absolute", lg: "unset" } : "unset",
          zIndex: 1,
          height: "100%",
        }}
        overflow={"auto"}
        bgcolor={"#EEEEEE"}
        item
      >
        {isShowProviders && (
          <IconButton
            sx={{
              position: "absolute",
              display: { lg: "none" },
              right: 0,
            }}
            onClick={() => setShowProviders(false)}
            color="inherit"
          >
            <CloseIcon />
          </IconButton>
        )}

        <PracticeAlphaProvidersSideBar />
      </Grid>

      <Grid
        sx={{
          height: { lg: "112%" },
          position: { lg: "relative" },
          bottom: { lg: "64px" },
        }}
        bgcolor={"#EEEEEE"}
        overflow={"auto"}
        item
        sm
      >
        <Card
          sx={{
            bgcolor: "inherit",
            height: "100%",
            p: 0,
            position: "relative",
          }}
        >
          <CardContent sx={{ p: 0, display: "flex" }}>
            {[
              "Basic Details",
              "Contact Details",
              "Licenses",
              "Enrollments",
              "Portal Logins",
              "Documents",
            ].map((tab, index) => {
              return (
                <Button
                  key={`nav_tab-${index}`}
                  onClick={() => setNavTab(`${formMode}Nav${index + 1}`)}
                  sx={{
                    padding: "0px 2px",
                    fontSize: "16px",
                    minHeight: "50px",
                    width: "100%",
                    fontWeight: "bold",
                    color: "#8D8C8C",
                    borderRadius: "0",
                    textTransform: "capitalize",
                    background: `${
                      navTab === `${formMode}Nav${index + 1}`
                        ? "#D5D5D5"
                        : "#fff"
                    }`,
                    border: "1px solid #E7E7E7",
                    "&:hover": {
                      border: "1px solid #E7E7E7",
                      background: "#D5D5D5",
                    },
                  }}
                  variant="outlined"
                >
                  {tab}
                </Button>
              );
            })}
          </CardContent>
          <CardContent
            sx={{ padding: "25px", height: "77%", overflow: "auto" }}
          >
            <PracticeAlphaFormNavTabs />
          </CardContent>
          <CardActions
            sx={{
              position: "absolute",
              bottom: 0,
              background: "#fff",
              width: "100%",
              height: "14%",
              display: "flex",
              justifyContent: "space-between",
              gap: 3,
            }}
          >
            <Link
              sx={{
                cursor: "pointer",
                color: "#535353",
                fontWeight: "bold",
                fontSize: "24px",
                textDecoration: "underline",
                ml: 3,
              }}
            >
              # {practiceDatum.linked_ticket_id} - See Thread
            </Link>

            <Button
              sx={{
                minHeight: "38px",
                borderRadius: "12px",
                boxShadow: "none",
                fontSize: "14px",
                textTransform: "capitalize",
                background: "#78c5eb",
                "&:hover": {
                  background: "#78c5eb",
                },
              }}
              variant="contained"
              color="success"
            >
              Submit Details
            </Button>
          </CardActions>
        </Card>
      </Grid>

      <Modal
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        open={isProviderModalOpen}
        onClose={() => setIsProviderModalOpen(false)}
      >
        <Box
          sx={{
            minWidth: "410px",
            minHeight: "50px",
          }}
        >
          <AddProviderForm
            practiceId={practiceId}
            setProviderData={(value) => setProviderData(value)}
            setIsProviderModalOpen={(value) => setIsProviderModalOpen(value)}
          />
        </Box>
      </Modal>

      {/* <Comments */}
      {/*  setCommonPracticeDetails={(value) => setCommonPracticeDetails(value)}
         setIsShowOnboardingForm={(value) => setIsShowOnboardingForm(value)}
         fromComponent={commonTicketDetails["componentName"]["sub"]}
         ticketDatum={commonTicketDetails.ticketDatum}
         setCommonTicketDetails={(value) => setCommonTicketDetails(value)} */}
      {/* /> */}
    </Grid>
  );
};

export default PracticeAlphaBody;
