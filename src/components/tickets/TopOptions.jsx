import { Search } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import AddTicket from "./AddTicket";

const TopOptions = ({ addTicketsIsOpen, setAddTicketsIsOpen }) => {
  return (
    <Box
      // width={{ md: "30%", xs: "100%" }}
      display={"flex"}
      flexDirection={"column"}
    >
      <Button
        onClick={() => setAddTicketsIsOpen(true)}
        style={
          addTicketsIsOpen
            ? {
                background: "#BBBBBC",
                borderTopLeftRadius: "50px",
                borderTopRightRadius: "50px",
                borderBottomRightRadius: "0",
                borderBottomRightRadius: "0",
                cursor: "auto",
                "&:hover": {
                  background: "#BBBBBC",
                },
              }
            : null
        }
        sx={{
          color: "#858585",
          fontWeight: "bold",
          textTransform: "capitalize",
          fontSize: "18px",
        }}
        variant="text"
      >
        Add New Ticket
      </Button>
      <Box
        height={` ${addTicketsIsOpen ? "460px" : "0px"}`}
        overflow={"auto"}
        sx={{
          transition: "0.5s",
          display: "flex",
          flexDirection: "column",
          background: "#D6D6D6",
          gap: "12px",
        }}
      >
        <AddTicket
          // setIsLoading={setIsLoading}
          setAddTicketsIsOpen={(value) => setAddTicketsIsOpen(value)}
        />
      </Box>
    </Box>
  );
};

export default TopOptions;
