/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";

const ForgeSubmit = ({ customStyle, className, text = "Submit" }) => {
  return (
    <button
      type="submit"
      style={customStyle}
      className={`ff-field-button ${className}`}
    >
      {text}
    </button>
  );
};

export default ForgeSubmit;
