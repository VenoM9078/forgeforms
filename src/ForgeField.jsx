/* eslint-disable react/prop-types */
import React from "react";
import "./index.css";
import PropTypes from "prop-types";

const validateEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) ? null : "Invalid email address";
};

const ForgeField = ({
  type,
  name,
  value,
  handleFieldChange,
  handleErrors,
  errors,
  customStyle,
  className,
  label,
  placeholder,
  onChange, // added onChange prop
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    handleFieldChange(name, value);

    let error = null;
    if (type === "email") {
      error = validateEmail(value);
    }
    handleErrors(name, error);

    // If user provided an onChange handler, call it
    if (onChange) {
      onChange(e);
    }
  };

  ForgeField.propTypes = {
    type: PropTypes.oneOf(["email", "text", "textarea", "number"]).isRequired, // 'type' is required
    name: PropTypes.string,
    handleFieldChange: PropTypes.func,
    handleErrors: PropTypes.func,
    errors: PropTypes.object,
    customStyle: PropTypes.object,
    className: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
  };

  let inputElement = null;

  switch (type) {
    case "email":
    case "text":
      inputElement = (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
      break;
    case "number":
      inputElement = (
        <input
          type="number"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
      break;
    default:
      inputElement = (
        <input
          type="text"
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
        />
      );
      break;
  }

  return (
    <div style={customStyle} className={className}>
      {label && <label htmlFor={name}>{label}</label>}
      {inputElement}
      {errors && errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  );
};

export default ForgeField;
