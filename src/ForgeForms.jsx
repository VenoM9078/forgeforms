import React, { useState, useEffect } from "react";
import axios from "axios";
import ForgeField from "./ForgeField";
import ForgeCheckbox from "./ForgeCheckbox";
import ForgeSelect from "./ForgeSelect";
import ForgeSubmit from "./ForgeSubmit";

const ForgeForms = ({ apiKey }) => {
  const [formFields, setFormFields] = useState([]);
  const [formTitle, setFormTitle] = useState("");
  const [formValues, setFormValues] = useState({});
  const [formErrors, setFormErrors] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    axios.defaults.baseURL = "http://localhost:5030";
    axios
      .get(`/getForm/${apiKey}`)
      .then((response) => {
        const formData = JSON.parse(response.data.formData);
        const trueFormFields = formData.filter(
          (fieldData) => fieldData.order && fieldData.value
        );

        trueFormFields.sort((a, b) => a.order - b.order);
        setFormFields(trueFormFields);

        setFormTitle(response.data.formTitle || "");
        const initialValues = trueFormFields.reduce((acc, field) => {
          acc[field.id] = "";
          return acc;
        }, {});

        setFormValues(initialValues);
        setFormErrors({});
        setDataLoaded(true);
      })
      .catch((error) => {
        console.error(error);
        setDataLoaded(true);
      });
  }, [apiKey]);

  const handleFieldChange = (name, value) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted with values:", formValues);
  };

  if (!dataLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2 className="form-title">{formTitle}</h2>
      <form onSubmit={handleSubmit}>
        {formFields.map((field, index) => {
          const { type, id, label, options } = field;
          switch (type) {
            case "text":
            case "email":
            case "number":
              return (
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
              );

            case "textarea":
              return (
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
              );

            case "select":
              return (
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
              );

            case "checkbox":
              return (
                <ForgeCheckbox
                  key={index}
                  id={id}
                  label={label}
                  name={id}
                  value={formValues[id] || false}
                  handleChange={(e) => handleFieldChange(id, e.target.checked)}
                  errors={formErrors}
                />
              );

            default:
              return null;
          }
        })}
        <ForgeSubmit text="Submit" />
      </form>
    </div>
  );
};

export default ForgeForms;
