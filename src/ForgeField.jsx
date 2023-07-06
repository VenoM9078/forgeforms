/* eslint-disable react/prop-types */
import React from "react";

const validateEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) ? null : "Invalid email address";
};

const ForgeField = ({
  type,
  name,
  handleFieldChange,
  handleErrors,
  errors,
  customStyle,
  className,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    handleFieldChange(name, value);

    let error = null;
    if (type === "email") {
      error = validateEmail(value);
    }
    handleErrors(name, error);
  };

  let inputElement = null;

  switch (type) {
    case "email":
    case "text":
      inputElement = <input type="text" name={name} onChange={handleChange} />;
      break;
    case "textarea":
      inputElement = <textarea name={name} onChange={handleChange} />;
      break;
    default:
      inputElement = <input type="text" name={name} onChange={handleChange} />;
      break;
  }

  return (
    <div style={customStyle} className={className}>
      {inputElement}
      {errors && errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  );
};

export default ForgeField;
