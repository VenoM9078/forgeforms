/* eslint-disable react/prop-types */
import React from "react";

const ForgeSubmit = ({ customStyle, className, text = "Submit" }) => {
  return (
    <button type="submit" style={customStyle} className={className}>
      {text}
    </button>
  );
};

export default ForgeSubmit;
