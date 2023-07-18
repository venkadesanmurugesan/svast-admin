import {
  Box,
  Button,
  FormControl,
  IconButton,
  OutlinedInput,
  Stack,
} from "@mui/material";
import React from "react";

const PracticeAlphaTopOptions = ({ setIsShowOnboardingForm }) => {
  return (
    <Stack
      sx={{
        position: { xs: "unset", md: "absolute" },
        right: "0",
        width: { xs: "100%", md: "80%" },
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "end",
          gap: 3,
          flexWrap: { xs: "wrap-reverse" },
        }}
      ></Box>
    </Stack>
  );
};

export default PracticeAlphaTopOptions;
