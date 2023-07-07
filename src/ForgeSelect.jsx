import React from "react";
import PropTypes from "prop-types";

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
      {label && <label htmlFor={name}>{label}</label>}
      <select
        name={name}
        onChange={onChange}
        style={customStyle}
        className={`${className || ""}`}
      >
        {placeholder && (
          <option value="" disabled selected>
            {placeholder}
          </option>
        )}
        {validatedChildren}
      </select>
    </div>
  );
};

ForgeSelect.propTypes = {
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  onChange: PropTypes.func,
  customStyle: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
};

export default ForgeSelect;
