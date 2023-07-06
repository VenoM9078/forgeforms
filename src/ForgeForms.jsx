import React, { useState } from "react";
import axios from "axios";

const ForgeForms = ({ apiKey, children, customStyle, className }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  const handleFieldChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
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
      handleFieldChange,
      handleErrors,
      errors,
    });
  });

  return (
    <form onSubmit={handleSubmit} style={customStyle} className={className}>
      {formChildren}
    </form>
  );
};

export default ForgeForms;
