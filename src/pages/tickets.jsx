import { useContext, useEffect, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";
import ContentContainer from "../components/ContentContainer";
import ticketsCRUD from "../services/http/tickets";
import TicketsTable from "../components/tickets/TicketsTable";
import { TicketsContextProvider } from "../context/TicketsContext";
import { Box, Button, IconButton, Stack } from "@mui/material";
import TopOptions from "../components/tickets/TopOptions";
import Comments from "../components/tickets/Comments";
import AddTicket from "../components/tickets/AddTicket";
import ViewAndEditTicket from "../components/tickets/ViewAndEditTicket";
import PracticeAlphaTopOptions from "../components/practices/PracticeAlphaTopOptions";
import PracticeAlphaBody from "../components/practices/PracticeAlphaBody";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

const Tickets = () => {
  const [ticketsData, setTicketsData] = useState([]);
  const { setIsLoading } = useContext(LoadingContext);
  const [isShowOnboardingForm, setIsShowOnboardingForm] = useState(false);
  const [commonTicketDetails, setCommonTicketDetails] = useState({
    componentName: { main: "ticketTable", sub: "" },
    ticketDatum: {},
  });
  const [commonPracticeDetails, setCommonPracticeDetails] = useState({
    practice_id: null,
    provider_id: null,
  });
  const [practiceName, setPracticeName] = useState("");

  useEffect(() => {
    // setIsLoading(true);
    ticketsCRUD
      .getTickets()
      .then((data) => {
        // setIsLoading(false);
        setTicketsData(data);
      })
      .catch((err) => {
        // setIsLoading(false);
        console.error(err);
      });
  }, [commonTicketDetails]);

  //   <ContentContainer isBackArrow={true} contentTitle={practiceName}>
  //   <IconButton
  //     sx={{ position: "absolute" }}
  //     onClick={() => setIsShowOnboardingForm(false)}
  //   >
  //     <ArrowBackRoundedIcon />
  //   </IconButton>
  //   <PracticeAlphaTopOptions
  //     setIsShowOnboardingForm={(value) => setIsShowOnboardingForm(value)}
  //   />
  //   <PracticeAlphaBody
  //     practiceName={practiceName}
  //     practiceId={practiceId}
  //   />
  // </ContentContainer>

  return (
    <TicketsContextProvider value={{ ticketsData, setTicketsData }}>
      {isShowOnboardingForm ? (
        <ContentContainer isBackArrow={true} contentTitle={practiceName}>
          <IconButton
            sx={{ position: "absolute" }}
            onClick={() => setIsShowOnboardingForm(false)}
          >
            <ArrowBackRoundedIcon />
          </IconButton>
          <PracticeAlphaTopOptions
            setIsShowOnboardingForm={(value) => setIsShowOnboardingForm(value)}
          />
          <PracticeAlphaBody
            setPracticeName={(name) => setPracticeName(name)}
            practiceId={commonPracticeDetails["practice_id"]}
          />
        </ContentContainer>
      ) : commonTicketDetails.componentName["main"] === "ticketTable" ? (
        <ContentContainer contentTitle={"Tickets"}>
          <Button
            onClick={() => {
              setCommonTicketDetails({
                componentName: { main: "comments", sub: "addTicket" },
                ticketDatum: {},
              });
            }}
            sx={{
              position: "absolute",
              right: "0",
              minHeight: "40px",
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
            Add Ticket
          </Button>
          <Box overflow={"auto"} zIndex={"1"}>
            <TicketsTable
              setCommonTicketDetails={(value) => setCommonTicketDetails(value)}
            />
          </Box>
        </ContentContainer>
      ) : commonTicketDetails.componentName["main"] === "comments" ? (
        <Comments
          setCommonPracticeDetails={(value) => setCommonPracticeDetails(value)}
          setIsShowOnboardingForm={(value) => setIsShowOnboardingForm(value)}
          fromComponent={commonTicketDetails["componentName"]["sub"]}
          ticketDatum={commonTicketDetails.ticketDatum}
          setCommonTicketDetails={(value) => setCommonTicketDetails(value)}
        />
      ) : null}
    </TicketsContextProvider>
  );
};

export default Tickets;
