/* eslint-disable react/prop-types */

const validateEmail = (value) => {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(value) ? null : "Invalid email address";
};

const validatePhoneNumber = (value) => {
  const pattern = /^[0-9]{10}$/;
  return pattern.test(value) ? null : "Invalid phone number";
};

const ForgeField = ({
  type,
  name,
  handleFieldChange,
  handleErrors,
  errors,
}) => {
  const handleChange = (e) => {
    const value = e.target.value;
    handleFieldChange(name, value);

    let error = null;
    switch (type) {
      case "email":
        error = validateEmail(value);
        break;
      case "phone":
        error = validatePhoneNumber(value);
        break;
      default:
        break;
    }
    handleErrors(name, error);
  };

  let inputElement = null;

  switch (type) {
    case "email":
    case "phone":
    case "text":
      inputElement = <input type="text" name={name} onChange={handleChange} />;
      break;
    case "textarea":
      inputElement = <textarea name={name} onChange={handleChange} />;
      break;
    default:
      inputElement = <input type="text" name={name} onChange={handleChange} />;
      break;
  }

  return (
    <div>
      {inputElement}
      {errors && errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  );
};

export default ForgeField;
