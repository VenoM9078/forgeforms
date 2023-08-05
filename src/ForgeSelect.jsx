import React from "react";
import PropTypes from "prop-types";
import "./index.css";

const ForgeSelect = ({
  name,
  children,
  onChange,
  customStyle,
  className,
  label,
  placeholder,
}) => {
  const validatedChildren = React.Children.map(children, (child) => {
    if (child.type.displayName === "ForgeOption") {
      return child;
    }
    throw new Error("ForgeSelect children should be of type ForgeOption");
  });

  return (
    <div>
      {label && (
        <label htmlFor={name} className={`ff-field-label`}>
          {label}
        </label>
      )}
      <select
  name={name}
  onChange={onChange}
  style={customStyle}
  className={`ff-field-select ${className || ""}`}
  defaultValue={value} // Set the default value
>
  {placeholder && (
    <option value="" disabled>
      {placeholder}
    </option>
  )}
  {validatedChildren}
</select>
    </div>
  );
};

ForgeSelect.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  children: PropTypes.arrayOf( // Replace 'options' with 'children'
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default ForgeSelect;