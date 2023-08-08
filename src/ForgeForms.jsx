import React, { useState, useEffect } from "react";
import axios from "axios";
import ForgeField from "./ForgeField";
import ForgeCheckbox from "./ForgeCheckbox";
import ForgeSelect from "./ForgeSelect";
import ForgeSubmit from "./ForgeSubmit";
import ForgeOption from "./ForgeOption";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import HCaptcha from "@hcaptcha/react-hcaptcha";

const ForgeForms = ({ apiKey }) => {
  const [formFields, setFormFields] = useState([]);
  const [originalResponse, setOriginalResponse] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [captchaToken, setCaptchaToken] = useState(null);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState([]);

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

    setError(false);
    const errors = []; // Initialize errors as an array

    if (!captchaToken) {
      errors.push("Please verify the captcha before submitting the form."); // Add captcha error to the errors array
    }

    formFields.forEach((field) => {
      if (field.id === "terms&conditions" && !formValues[field.id]) {
        // Check if the terms&conditions is checked
        errors.push(`You must agree to the ${field.label}.`); // Add error to the array
      } else if (!formValues[field.id] && formValues[field.id] !== false) {
        errors.push(`${field.label} is required.`); // Add error to the array
      }
    });

    if (errors.length > 0) {
      setErrorMsg(errors);
      setError(true);
      return;
    }

    // Continue with the rest of the code...

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
        setFormValues({});
        setError(false);
        setErrorMsg([]); // Set to an empty array
      } else {
        setError(true);
        setErrorMsg(["Error submitting the form"]); // Wrap the message inside an array
      }
    } catch (error) {
      setError(true);
      setErrorMsg([error.message || "There was an error submitting the form"]); // Wrap the message inside an array
    }
  };

  return (
    <div className="custom-class">
      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 textRed-400"
                viewBox="0 0 20 20"
                fill="red"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                There were errors with your submission
              </h3>
              <div className="mt-2 text-sm text-red-700">
                <ul role="list" className="list-disc space-y-1 pl-5">
                  {errorMsg.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <h2 className="form-title">
        {dataLoaded ? formTitle : <Skeleton width={200} />}
      </h2>
      <form onSubmit={handleSubmit}>
        {formFields
          .filter((field) => field.id !== "terms&conditions")
          .map((field, index) => {
            const { type, id, label, options } = field;
            if (!dataLoaded) {
              return (
                <div
                  key={Math.random()}
                  style={{ marginTop: "1rem", marginBottom: "1rem" }}
                >
                  <Skeleton count={1} height={40} />
                </div>
              );
            } else {
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
        {dataLoaded ? (
          <ForgeSubmit text="Submit" />
        ) : (
          <Skeleton width={100} height={40} />
        )}

        <div
          style={{
            textAlign: "right",
            color: "lightgray",
            fontFamily: "Inter",
            marginTop: "10px",
          }}
        >
          {dataLoaded ? "Secured by" : <Skeleton width={100} />}{" "}
          <a
            href="#"
            style={{
              textDecoration: "none",
              color: "inherit",
              fontWeight: "bold",
            }}
          >
            {dataLoaded ? "ForgeForms" : <Skeleton width={100} />}
          </a>
        </div>
      </form>
    </div>
  );
};

export default ForgeForms;
