import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useContext } from "react";
import { PracticeContext } from "../../context/PracticeContext";

const PracticeCard = ({ sx }) => {
  const { practicesData } = useContext(PracticeContext);

  return (
    <Box
      gap={"18px"}
      justifyContent={"center"}
      flexWrap={"wrap"}
      width={"100%"}
      overflow={"auto"}
      sx={{ ...sx }}
    >
      {practicesData.length > 0 ? (
        practicesData.map((practice, index) => {
          return (
            <Card
              key={`practice_card-${index}`}
              elevation={0}
              sx={{ flexGrow: "1", flexShrink: "0" }}
            >
              <CardContent>
                <Typography mb={"8px"} variant="h5">
                  {practice.practice_name}
                </Typography>
                <Typography
                  mb={"8px"}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Verification Status: <br />
                  <Typography component={"span"}>
                    {practice.verification_status}
                  </Typography>
                </Typography>
                <Typography
                  mb={"8px"}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Verification progress: <br />
                  <Typography component={"span"}>progress</Typography>
                </Typography>
                <Typography
                  mb={"8px"}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Last Updated By: <br />
                  <Typography component={"span"}>
                    {practice.last_updated_by}
                  </Typography>
                </Typography>

                <Typography
                  mb={"8px"}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  # Open Tickets: <br />
                  <Typography component={"span"}>0</Typography>
                </Typography>

                <Typography
                  mb={"8px"}
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  Onboarding Status: <br />
                  <Typography component={"span"}>
                    {practice.onboarding_status}
                  </Typography>
                </Typography>
              </CardContent>
              {/* <CardActions>
                <Button size="small">Learn More</Button>
              </CardActions> */}
            </Card>
          );
        })
      ) : (
        <Stack
          my={"15px"}
          p={"8px"}
          border={"2px solid"}
          borderColor={"gray"}
          borderRadius={"4px"}
          textAlign={"center"}
        >
          <Typography> No Practices are available</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default PracticeCard;
