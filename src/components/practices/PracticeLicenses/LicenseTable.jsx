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

const LicenseTable = ({
  licenseData,
  setDeleteLicenseIDS,
  deleteLicenseIDS,
  setLicenseData,
  setIsLicenseModalOpen,
  setModeOptions,
}) => {
  const deleteLicenseList = (index) => {
    let licenses = [...licenseData];
    setDeleteLicenseIDS([...deleteLicenseIDS, licenses[index].id]);
    let filteredLicenseList = licenseData.filter((item, i) => i !== index);
    setLicenseData(filteredLicenseList);
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
              License
            </TableCell>
            <TableCell
              sx={{ padding: "4px 16px", color: "#7e7d7d", fontSize: "16px" }}
            >
              Number
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
              State Code
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {licenseData.map((license, index) => (
            <TableRow key={`license-${index}`}>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                <Button
                  onClick={() => {
                    setModeOptions({ mode: "edit", data: license });
                    setIsLicenseModalOpen(true);
                  }}
                  sx={{ p: 0 }}
                >
                  {license.license_name}
                </Button>
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {license.license_number}
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {moment(license.effective_date).format("LL")}
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {moment(license.renewal_date).format("LL")}
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {license.state_code}
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

export default LicenseTable;
