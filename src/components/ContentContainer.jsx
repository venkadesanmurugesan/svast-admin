import { Container, Typography } from "@mui/material";
import React from "react";

const ContentContainer = ({ contentTitle, children, isBackArrow }) => {
  return (
    <Container
      style={{
        position: "relative",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: "28px",
      }}
    >
      <Typography
        sx={{ textDecoration: "underline" }}
        fontWeight={"bold"}
        color={"#535353"}
        fontSize="24px"
        textTransform={"capitalize"}
        ml={isBackArrow && 5}
      >
        {contentTitle}
      </Typography>

      {children}
    </Container>
  );
};

export default ContentContainer;
