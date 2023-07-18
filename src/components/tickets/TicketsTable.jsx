import React, { useContext, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Stack,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import MessageRoundedIcon from "@mui/icons-material/MessageRounded";
import { TicketsContext } from "../../context/TicketsContext";
import dummyTickets from "../../data/dummyTickets.json";
import RefreshRoundedIcon from "@mui/icons-material/RefreshRounded";
import { Link } from "react-router-dom";
import Comments from "./Comments";
import ContentContainer from "../ContentContainer";

const TicketsTable = ({ setCommonTicketDetails }) => {
  const { ticketsData } = useContext(TicketsContext);

  return (
    <>
      {ticketsData.length > 0 ? (
        <Table sx={{ width: "100%" }}>
          <TableHead sx={{ background: "#d6d6d6" }}>
            <TableRow>
              <TableCell
                align="center"
                style={{
                  borderTopLeftRadius: "15px",
                  borderBottomLeftRadius: "15px",
                }}
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                # Ticket ID
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Practice
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Provider
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Ticket Type
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Last Updated By
              </TableCell>
              <TableCell
                align="center"
                style={{
                  borderTopRightRadius: "15px",
                  borderBottomRightRadius: "15px",
                }}
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#EFEFEF" }}>
            {ticketsData.map((ticket, index) => (
              <TableRow key={`ticket_row-${index}`}>
                <TableCell align="center">
                  <Button
                    onClick={() =>
                      setCommonTicketDetails({
                        componentName: { main: "comments", sub: "addTicket" },
                        ticketDatum: ticket,
                      })
                    }
                    sx={{ p: 0 }}
                  >
                    {ticket.ID}
                  </Button>
                </TableCell>
                <TableCell align="center">{ticket.practice_id}</TableCell>
                <TableCell align="center">{ticket.provider_id}</TableCell>
                <TableCell align="center"> {ticket.status}</TableCell>
                <TableCell align="center">{ticket.ticket_type}</TableCell>
                <TableCell align="center">{ticket.last_updated_by}</TableCell>
                <TableCell
                  align="center"
                  sx={{
                    padding: "0",
                  }}
                >
                  <IconButton
                    onClick={() =>
                      setCommonTicketDetails({
                        componentName: { main: "comments", sub: "comment" },
                        ticketDatum: ticket,
                      })
                    }
                    sx={{ padding: "0", color: "#4DB5E8" }}
                  >
                    <MessageRoundedIcon />
                  </IconButton>
                  <IconButton sx={{ padding: "0", color: "#AFDE8C" }}>
                    <RefreshRoundedIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <Stack
          my={"15px"}
          p={"8px"}
          border={"2px solid"}
          borderColor={"gray"}
          borderRadius={"4px"}
          textAlign={"center"}
        >
          <Typography> No Tickets are available</Typography>
        </Stack>
      )}
    </>
  );
};

export default TicketsTable;
