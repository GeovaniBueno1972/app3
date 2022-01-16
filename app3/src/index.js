import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { App } from "./App";
import { ContextWrapper } from "./data/context/ContextWrapper";

ReactDOM.render(
  <ContextWrapper>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextWrapper>,
  document.getElementById("root")
);
