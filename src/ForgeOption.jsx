import React from "react";
import PropTypes from "prop-types";

const ForgeOption = ({
  value,
  children,
  customStyle,
  className,
  selected = false,
}) => {
  // ForgeOption doesn't know about its parent here,
  // but ForgeSelect validates its children.
  return (
    <option
      value={value}
      style={customStyle}
      className={className}
      selected={selected}
    >
      {children}
    </option>
  );
};

ForgeOption.displayName = "ForgeOption";

ForgeOption.propTypes = {
  value: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  customStyle: PropTypes.object,
  className: PropTypes.string,
  selected: PropTypes.bool,
};

export default ForgeOption;
