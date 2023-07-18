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

const PortalLoginTable = ({
  portalLoginData,
  setDeletePortalLoginIDS,
  deletePortalLoginIDS,
  setPortalLoginData,
  setIsPortalLoginModalOpen,
  setModeOptions,
}) => {
  const deleteLicenseList = (index) => {
    let portallogins = [...portalLoginData];
    setDeletePortalLoginIDS([...deletePortalLoginIDS, portallogins[index].id]);
    let filteredPortalLoginList = portalLoginData.filter(
      (item, i) => i !== index
    );
    setPortalLoginData(filteredPortalLoginList);
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
              Portal Name
            </TableCell>

            <TableCell
              sx={{ padding: "4px 16px", color: "#7e7d7d", fontSize: "16px" }}
            >
              Username
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
              Password
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {portalLoginData.map((portalLogin, index) => (
            <TableRow key={`portalLogin-${index}`}>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                <Button
                  onClick={() => {
                    setModeOptions({ mode: "edit", data: portalLogin });
                    setIsPortalLoginModalOpen(true);
                  }}
                  sx={{ p: 0 }}
                >
                  {portalLogin.portal_name}
                </Button>
              </TableCell>

              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {portalLogin.username}
              </TableCell>
              <TableCell
                sx={{
                  padding: "12px 16px",
                  color: "#7e7d7d",
                }}
              >
                {portalLogin.password}
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

export default PortalLoginTable;
