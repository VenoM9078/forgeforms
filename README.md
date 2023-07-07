# ForgeForms

ForgeForms is a React library that helps you quickly create elegant and customizable forms with validation.

## Installation

To install ForgeForms, you can use npm:

```
npm install forgeforms
```

## Usage

Here is a quick example to get you started:

```jsx
import React from "react";
import ReactDOM from "react-dom";
import { ForgeForms, ForgeField, ForgeSelect, ForgeOption } from "forgeforms";

const App = () => {
  return (
    <ForgeForms
      onSubmit={(formData) => console.log("Form Data:", formData)}
      customStyle={{ padding: "10px" }}
      className="custom-form"
    >
      <ForgeField
        type="text"
        name="username"
        label="Username"
        placeholder="Enter your username"
      />
      <ForgeField
        type="email"
        name="email"
        label="Email"
        placeholder="Enter your email"
      />
      <ForgeSelect name="country" label="Select a country">
        <ForgeOption value="US">United States</ForgeOption>
        <ForgeOption value="CA">Canada</ForgeOption>
      </ForgeSelect>
    </ForgeForms>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
```

## Components

### ForgeForms

The `ForgeForms` component acts as a container for your form. It collects the form data and can handle form submission.

Props:

- `onSubmit`: Function called when the form is submitted with the form data as an argument.
- `customStyle`: Object with custom styles.
- `className`: String with custom class names.

### ForgeField

The `ForgeField` component renders a form input field.

Props:

- `type`: (Required) Type of input - "text", "email", "textarea", or "number".
- `name`: The name of the input field.
- `label`: Label text for the input field.
- `placeholder`: Placeholder text for the input field.
- `customStyle`: Object with custom styles.
- `className`: String with custom class names.
- `value`: Controlled input value.
- `onChange`: Custom change handler. Receives the event as an argument.

### ForgeSelect

The `ForgeSelect` component renders a select dropdown.

Props:

- `name`: The name of the select field.
- `label`: Label text for the select field.
- `customStyle`: Object with custom styles.
- `className`: String with custom class names.

### ForgeOption

The `ForgeOption` component renders an option within a `ForgeSelect` component.

Props:

- `value`: (Required) The value of the option.
- `customStyle`: Object with custom styles.
- `className`: String with custom class names.

## Custom Styles

ForgeForms uses the Inter font by default and provides some default styling. You can easily override these styles using the `customStyle` and `className` props.

## License

MIT
