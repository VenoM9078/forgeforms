/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const ForgeCheckbox = ({
  id,
  label,
  name,
  value,
  handleChange,
  className,
  errors,
  url,
}) => {
  return (
    <div className="ff-checkbox-container">
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={value}
        onChange={handleChange}
        className={`ff-field-checkbox ${className || ""}`}
      />
      <label htmlFor={id} className="ff-field-label">
        I agree to the <a href={url}>Terms & Conditions</a>
      </label>
      {errors && errors[name] && <div>{errors[name]}</div>}
    </div>
  );
};

ForgeCheckbox.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.bool,
  handleChange: PropTypes.func,
  className: PropTypes.string,
  errors: PropTypes.object,
  url: PropTypes.string,
};

export default ForgeCheckbox;
