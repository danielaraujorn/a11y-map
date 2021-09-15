import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider as MuiThemeProvider, StylesProvider } from "@mui/styles";
import { ThemeProvider } from "styled-components";
import { Navigation } from "./Navigation";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { theme } from "./theme";

ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Navigation />
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
