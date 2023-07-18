import { Search, Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { Form } from "formik";
import React, { useState } from "react";
import AddPractice from "./AddPractice";

const TopOptions = ({
  addPracticeIsOpen,
  setAddPracticeIsOpen,
  setIsLoading,
}) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: { xs: "wrap-reverse" },
      }}
    >
      <FormControl sx={{ width: { xs: "100%", md: "280px", lg: "400px" } }}>
        <OutlinedInput
          sx={{
            borderRadius: "25px",
            height: "40px",
            background: "#fff",

            "&::before,&::after": { display: "none" },
          }}
          id="outlined-adornment-password"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton aria-label="toggle password visibility" edge="end">
                <Search />
              </IconButton>
            </InputAdornment>
          }
          label=""
        />
      </FormControl>

      <Box
        width={{ md: "30%", xs: "100%" }}
        display={"flex"}
        flexDirection={"column"}
      >
        <Button
          onClick={() => setAddPracticeIsOpen(true)}
          style={
            addPracticeIsOpen
              ? {
                  boxShadow: "none",
                  background: "#BBBBBC",
                  borderTopLeftRadius: "50px",
                  borderTopRightRadius: "50px",
                  borderBottomLeftRadius: "0",
                  borderBottomRightRadius: "0",
                  cursor: "auto",
                  "&:hover": {
                    background: "#BBBBBC",
                  },
                }
              : null
          }
          sx={{
            fontWeight: "bold",
            textTransform: "capitalize",
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
          Add New Practice
        </Button>
        <Box
          height="500px"
          overflow={"auto"}
          sx={{
            display: `${addPracticeIsOpen ? "flex" : "none"}`,
            flexDirection: "column",
            background: "#D6D6D6",
            gap: "12px",
          }}
        >
          <AddPractice
            setIsLoading={setIsLoading}
            setAddPracticeIsOpen={(value) => setAddPracticeIsOpen(value)}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default TopOptions;
