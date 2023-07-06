/* eslint-disable react/prop-types */
import React, { useState } from "react";
import axios from "axios";

const ForgeForms = ({ apiKey, children }) => {
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

    // Here you might want to perform some final validation before sending
    // the data, and possibly update the errors object accordingly.

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

      // Handle response here
      console.log(response);
    } catch (error) {
      // Handle error here
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

  return <form onSubmit={handleSubmit}>{formChildren}</form>;
};

export default ForgeForms;
