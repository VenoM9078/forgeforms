import React, { useState, useEffect } from "react";
import axios from "axios";
import ForgeField from "./ForgeField";
import ForgeCheckbox from "./ForgeCheckbox";
import ForgeSelect from "./ForgeSelect";
import ForgeSubmit from "./ForgeSubmit";
import ForgeOption from "./ForgeOption";

import HCaptcha from "@hcaptcha/react-hcaptcha";

const ForgeForms = ({ apiKey }) => {
  const [formFields, setFormFields] = useState([]);
  const [originalResponse, setOriginalResponse] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5030";
    axios
      .get(`/getForm/${apiKey}`)
      .then((response) => {
        const formData = JSON.parse(response.data.formData);
        setOriginalResponse(response.data);

        // Include all fields that have the 'value' property, regardless of 'order'
        const trueFormFields = formData.filter((fieldData) => fieldData.value);

        // If the 'order' property exists, sort based on it; otherwise, preserve the original order
        trueFormFields.sort((a, b) => (a.order || 0) - (b.order || 0));
        setFormFields(trueFormFields);

        setFormTitle(response.data.formTitle || "");
        const initialValues = trueFormFields.reduce((acc, field) => {
          acc[field.id] = "";
          return acc;
        }, {});

        console.log(formData);

        setFormValues(initialValues);
        setFormErrors({});
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setDataLoaded(true);
      });
  }, [apiKey]);

  const handleVerificationSuccess = async (token) => {
    setCaptchaToken(token);
    try {
      const response = await axios.post(
        "http://localhost:5030/api/verifyHCaptcha",
        {
          token: token,
        }
      );

      // Checking the message from server for successful verification
      if (response.data.message === "Captcha verification successful") {
        console.log("hCaptcha verified successfully");
      } else {
        console.error("hCaptcha verification failed");
        setCaptchaToken(null); // Clear the token if verification failed
      }
    } catch (error) {
      console.error("There was an error verifying the hCaptcha token:", error);
    }
  };

  const handleFieldChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!captchaToken) {
      console.error("Please verify the captcha before submitting the form.");
      return;
    }

    const errors = {};
    formFields.forEach((field) => {
      if (!formValues[field.id] && formValues[field.id] !== false) {
        errors[field.id] = `${field.label} is required.`;
      }
    });

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // Prepare the response to be sent
    const responseData = {
      formId: originalResponse.id,
      response: Object.entries(formValues), // Convert form values to an array of [key, value] pairs
    };

    // 2. Sending Data
    try {
      const response = await axios.post(
        "http://localhost:5030/api/submitForm",
        responseData
      );

      if (response.status === 200) {
        console.log("Form submitted successfully:", response.data);
        setFormValues({});
      } else {
        console.error("Error submitting the form:", response.data);
      }
    } catch (error) {
      // 3. Error Handling
      console.error("There was an error submitting the form:", error);
    }
  };

  if (!dataLoaded) {
    return <p>Loading...</p>;
  }
  console.log("Form submitted with values:", originalResponse);
  console.log(formFields);
  return (
    <div className="custom-class">
      <h2 className="form-title">{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        {formFields
          .filter((field) => field.id !== "terms&conditions")
          .map((field, index) => {
            const { type, id, label, options } = field;
            switch (type) {
              case "text":
              case "email":
              case "number":
                return (
                  <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <ForgeField
                      key={index}
                      id={id}
                      type={type}
                      name={id}
                      value={formValues[id]}
                      handleFieldChange={handleFieldChange}
                      errors={formErrors}
                      label={label}
                    />
                  </div>
                );

              case "textarea":
                return (
                  <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <ForgeField
                      key={index}
                      id={id}
                      type={type}
                      name={id}
                      value={formValues[id] || ""}
                      handleFieldChange={handleFieldChange}
                      errors={formErrors}
                      label={label}
                    />
                  </div>
                );

              case "select":
                return (
                  <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <ForgeSelect
                      key={index}
                      name={id}
                      onChange={(e) => handleFieldChange(id, e.target.value)}
                      value={formValues[id] || ""}
                      label={label}
                      placeholder="Select an option"
                    >
                      {options.map((option, optionIndex) => (
                        <ForgeOption key={optionIndex} value={option.value}>
                          {option.label}
                        </ForgeOption>
                      ))}
                    </ForgeSelect>
                  </div>
                );

              case "checkbox":
                return (
                  <div style={{ marginTop: "1rem", marginBottom: "1rem" }}>
                    <ForgeCheckbox
                      key={index}
                      id={id}
                      label={label}
                      name={id}
                      value={formValues[id] || false}
                      handleChange={(e) =>
                        handleFieldChange(id, e.target.checked)
                      }
                      errors={formErrors}
                    />
                  </div>
                );

              default:
                return null;
            }
          })}
        {formFields
          .filter((field) => field.id === "terms&conditions")
          .map((field, index) => {
            return (
              <div
                key={Math.random()}
                style={{ marginTop: "1rem", marginBottom: "1rem" }}
              >
                <ForgeCheckbox
                  key={index}
                  id={field.id}
                  label={field.label}
                  name={field.id}
                  value={formValues[field.id] || false}
                  handleChange={(e) =>
                    handleFieldChange(field.id, e.target.checked)
                  }
                  errors={formErrors}
                />
              </div>
            );
          })}
        <div style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}>
          <HCaptcha
            sitekey="26577743-5ee6-4ead-9cba-37593deeb635"
            onVerify={(token, ekey) => handleVerificationSuccess(token, ekey)}
          />
        </div>
        <ForgeSubmit text="Submit" />
        <div
          style={{
            textAlign: "right",
            color: "lightgray",
            fontFamily: "Inter",
            marginTop: "10px",
          }}
        >
          Secured by{" "}
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            ForgeForms
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgeForms;
