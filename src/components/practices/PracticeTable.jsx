import React, { useContext } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Box,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import { PracticeContext } from "../../context/PracticeContext";
import dummyPractice from "../../data/dummyPractices.json";

const PracticeTable = ({
  addPracticeIsOpen,
  sx,
  setIsShowOnboardingForm,
  setPracticeId,
}) => {
  const { practicesData } = useContext(PracticeContext);

  return (
    <Box
      width={{ xs: "100%", md: `${addPracticeIsOpen ? "70%" : "100%"}` }}
      overflow={"auto"}
      sx={{ transition: "0.5s", ...sx }}
      zIndex={"1"}
    >
      {practicesData?.length > 0 ? (
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
                Practice Name
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Verification Status
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                Verification progress
              </TableCell>
              <TableCell
                align="center"
                sx={{
                  color: "#7e7d7d",
                  fontSize: "16px",
                }}
              >
                # Open Tickets
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
                Onboarding Status
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ background: "#EFEFEF" }}>
            {practicesData.map((practice, index) => (
              <TableRow key={`practice_row-${index}`}>
                <TableCell align="center">
                  <Button
                    onClick={() => {
                      setIsShowOnboardingForm(true),
                        setPracticeId(practice.practice_id);
                    }}
                    sx={{ p: 0 }}
                  >
                    {practice.practice_name}
                  </Button>
                </TableCell>
                <TableCell align="center">
                  {practice.verification_status}
                </TableCell>
                <TableCell align="center"></TableCell>
                <TableCell align="center"> {practice.open_tickets}</TableCell>
                <TableCell align="center">{practice.last_updated_by}</TableCell>
                <TableCell align="center"></TableCell>
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
          <Typography> No Practices are available</Typography>
        </Stack>
      )}
    </Box>
  );
};

export default PracticeTable;
