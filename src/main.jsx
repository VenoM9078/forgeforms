// main.jsx
import React from "react";
import ReactDOM from "react-dom";
import ForgeField from "./ForgeField";
import ForgeForms from "./ForgeForms";
import ForgeSubmit from "./ForgeSubmit";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ForgeForms apiKey={apiKey}>
      <ForgeField type="email" />
      <ForgeField type="message" />
      <ForgeSubmit />
    </ForgeForms>
  </React.StrictMode>
);
