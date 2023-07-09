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
  onChange,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    handleFieldChange(name, value, onChange);

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
    case "number":
      inputElement = (
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`ff-field-input ${className || ""}`}
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
          className={`ff-field-textarea ${className || ""}`}
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
          className={`ff-field-input ${className || ""}`}
        />
      );
      break;
  }

  return (
    <div style={customStyle} className={`ff-field-div ${className || ""}`}>
      {label && (
        <label htmlFor={name} className={`ff-field-label`}>
          {label}
        </label>
      )}
      {inputElement}
      {errors && errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};

ForgeField.propTypes = {
  type: PropTypes.oneOf(["email", "text", "textarea", "number"]).isRequired,
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

export default ForgeField;
