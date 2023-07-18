import {
  Box,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import React from "react";

const ViewAndEditTicket = ({ setCommonTicketDetails, ticketDatum }) => {
  return (
    <Box>
      <Button
        sx={{
          mb: "12px",
          height: "38px",
          borderRadius: "8px",
          boxShadow: "none",
          fontSize: "14px",
          textTransform: "capitalize",
          background: "#676D70",
          "&:hover": {
            background: "#676D70",
          },
        }}
        variant="contained"
      >
        Go Back
      </Button>

      <IconButton
        onClick={() =>
          setCommonTicketDetails({
            componentName: "ticketTable",
            ticketDatum: {},
          })
        }
      >
        <ArrowBackRoundedIcon />
      </IconButton>
      <Card
        sx={{
          width: { lg: "50%", md: "75%", sm: "80%" },
          padding: "30px 12px 12px 12px",
          background: "inherit",
        }}
      >
        <Table sx={{ width: "100%" }}>
          <TableBody>
            {Object.entries(ticketDatum).map(([key, value], index) => {
              return (
                <TableRow key={`table_row-${index}`}>
                  <TableCell sx={{ border: "none" }}>
                    {key.replaceAll("_", " ").toUpperCase()}
                  </TableCell>
                  <TableCell sx={{ border: "none" }}>{"--->"}</TableCell>
                  <TableCell sx={{ border: "none" }}>
                    {key === "CreatedAt" || key === "UpdatedAt"
                      ? moment(value).format("lll")
                      : value}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Card>
    </Box>
  );
};

export default ViewAndEditTicket;
