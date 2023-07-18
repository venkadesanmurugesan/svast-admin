import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

export const SvastColorContext = createTheme({
  svastColorsPalette: {
    thickGrey: "#BBBBBC",
    lightGrey: "#D6D6D6",
    white: "#FFFFFF",
    bannerGrey: "#E6E6E6",
    headerGrey: "#65757D",
    headerBorderGrey: "#707070",
    tableBorderGrey: "#D2CBCB",
    navBlue: "#4DB5E8",
    hoverLight: "rgba(255,255,255,0.47 )",
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={SvastColorContext}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
