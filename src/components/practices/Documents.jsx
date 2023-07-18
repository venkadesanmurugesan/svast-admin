import {
  Box,
  Button,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";

const Documents = () => {
  return (
    <Box>
      {/* <Typography fontWeight={"bold"} color={"#807F7F"} fontSize={"14px"}>
        Documents
      </Typography> */}
      {/* <Divider sx={{ margin: "8px 0 14px 0" }} /> */}
      <Table sx={{ width: "100%" }}>
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
              Document
            </TableCell>
            <TableCell
              sx={{ padding: "4px 16px", color: "#7e7d7d", fontSize: "16px" }}
            >
              Upload
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
              Documents Uploaded
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {["State License", "DEA", "Board Certificate", "Liability"].map(
            (doc, index) => (
              <TableRow key={`doc-${index}`}>
                <TableCell
                  sx={{
                    padding: "12px 16px",
                    color: "#7e7d7d",
                  }}
                >
                  {doc}
                </TableCell>
                <TableCell sx={{ padding: "12px 16px" }}>
                  <IconButton sx={{ padding: "0", color: "#4DB5E8" }}>
                    <AddCircleRoundedIcon />
                  </IconButton>
                </TableCell>
                <TableCell sx={{ padding: "12px 16px" }}></TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
      <Button
        sx={{ color: "#4DB5E8", mt: "20px", mb: 5 }}
        variant="text"
        startIcon={<AddCircleRoundedIcon />}
      >
        <Typography
          textTransform={"capitalize"}
          fontWeight={"bold"}
          color={"#807F7F"}
          fontSize={"14px"}
        >
          Add New Document
        </Typography>
      </Button>
    </Box>
  );
};

export default Documents;
