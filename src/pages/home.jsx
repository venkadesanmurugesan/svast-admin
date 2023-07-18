import {
  Box,
  Container,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ContentContainer from "../components/ContentContainer";

const Home = () => {
  const CardBox = ({
    width,
    height,
    headText,
    isShowInfo = true,
    children,
  }) => {
    return (
      <Box
        padding={"20px"}
        borderRadius={"20px"}
        height={height}
        width={width}
        bgcolor={"#fff"}
      >
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Typography fontSize={"16px"} color={"#333333"} fontWeight={"bold"}>
            {headText}
          </Typography>
          {isShowInfo && (
            <IconButton>
              <InfoOutlinedIcon />
            </IconButton>
          )}
        </Box>
        <Divider sx={{ marginBottom: "12px" }} />
        <Box>{children}</Box>
      </Box>
    );
  };

  return (
    <ContentContainer contentTitle={" Dashboard"}>
      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <CardBox
          height="240px"
          headText="Enrollments Tickets : 51"
          width={{ md: "50%" }}
        ></CardBox>

        <Stack
          width={{ xs: "100%", md: "50%" }}
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 2, md: 1 }}
        >
          <Box
            borderRadius={"20px"}
            width={{ xs: "100%", md: "50%" }}
            gap={{ xs: 2, md: 1 }}
            display={"flex"}
            flexDirection={"column"}
          >
            <CardBox height="50%" isShowInfo={false} headText="Total Practices">
              fe
            </CardBox>
            <CardBox height="50%" isShowInfo={false} headText="Payors Engaged">
              fe
            </CardBox>
          </Box>
          <Box
            borderRadius={"20px"}
            width={{ xs: "100%", md: "50%" }}
            gap={{ xs: 2, md: 1 }}
            display={"flex"}
            flexDirection={"column"}
          >
            <CardBox height="50%" isShowInfo={false} headText="Total Providers">
              fe
            </CardBox>
            <CardBox height="50%" isShowInfo={false} headText="Total Tickets">
              fe
            </CardBox>
          </Box>
        </Stack>
      </Stack>

      <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
        <CardBox
          height="240px"
          headText="Onboarding Tickets"
          width={{ md: "50%" }}
        >
          fe
        </CardBox>
        <CardBox
          height="240px"
          headText="Enrollment Tickets"
          width={{ md: "50%" }}
        >
          fe
        </CardBox>
      </Stack>
    </ContentContainer>
  );
};

export default Home;
