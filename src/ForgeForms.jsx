import React, { useState } from "react";
import axios from "axios";
import "./index.css";

const ForgeForms = ({ apiKey, children, customStyle, className }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFieldChange = (name, value, userOnChange) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Call user provided onChange handler if it exists
    if (userOnChange) {
      userOnChange({ target: { name, value } });
    }
  };

  const handleErrors = (name, error) => {
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://your-server.com/api",
        formData,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const formChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      handleFieldChange: (name, value) =>
        handleFieldChange(name, value, child.props.onChange),
      handleErrors,
      errors,
    });
  });

  return (
    <form
      onSubmit={handleSubmit}
      style={customStyle}
      className={`ff-field-form ${className}`}
    >
      {formChildren}
    </form>
  );
};

export default ForgeForms;
