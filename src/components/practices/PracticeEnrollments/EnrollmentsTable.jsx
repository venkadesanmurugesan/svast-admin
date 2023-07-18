import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useState } from "react";
import RemoveCircleSharpIcon from "@mui/icons-material/RemoveCircleSharp";
import moment from "moment";

const EnrollmentsTable = ({
  enrollmentData,
  setDeleteEnrollmentIDS,
  deleteEnrollmentIDS,
  setEnrollmentData,
  setIsEnrollmentsModalOpen,
  setModeOptions,
}) => {
  const deleteLicenseList = (index) => {
    let enrollments = [...enrollmentData];
    setDeleteEnrollmentIDS([...deleteEnrollmentIDS, enrollments[index].id]);
    let filteredEnrollmentList = enrollmentData.filter(
      (item, i) => i !== index
    );
    setEnrollmentData(filteredEnrollmentList);
  };

  return (
    <Box overflow={"auto"}>
      <Table>
        <TableHead sx={{ background: "#d6d6d6" }}>
          <TableRow>
            <TableCell
              style={{
                padding: "4px 16px",
                borderTopLeftRadius: "15px",
                borderBottomLeftRadius: "15px",
              }}
              sx={{
                color: "#7e7d7d",
                fontSize: "16px",
              }}
            >
              Payer
            </TableCell>

            <TableCell
              sx={{ padding: "4px 16px", color: "#7e7d7d", fontSize: "16px" }}
            >
              Effective Date
            </TableCell>

            <TableCell
              sx={{ padding: "4px 16px", color: "#7e7d7d", fontSize: "16px" }}
            >
              Renewal Date
            </TableCell>

            <TableCell
              style={{
                padding: "4px 16px",
                borderTopRightRadius: "15px",
                borderBottomRightRadius: "15px",
              }}
              sx={{
                color: "#7e7d7d",
                fontSize: "16px",
              }}
            >
              Status
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enrollmentData.map((enrollment, index) => (
            <TableRow key={`enrollment-${index}`}>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                <Button
                  onClick={() => {
                    setModeOptions({ mode: "edit", data: enrollment });
                    setIsEnrollmentsModalOpen(true);
                  }}
                  sx={{ p: 0 }}
                >
                  {enrollment.payer_name}
                </Button>
              </TableCell>

              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {moment(enrollment.effective_date).format("LL")}
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {moment(enrollment.renewal_date).format("LL")}
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {enrollment["status"]}
              </TableCell>
              <TableCell sx={{ padding: "0" }}>
                <IconButton
                  onClick={() => {
                    deleteLicenseList(index);
                  }}
                  sx={{ padding: "0", color: "#4DB5E8" }}
                >
                  <RemoveCircleSharpIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};

export default EnrollmentsTable;
