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
// For non-Vite apps
FORGEFORMS_API_KEY = your_api_key;

// For Vite apps
VITE_FORGEFORMS_API_KEY = your_api_key;
```

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "../../node_modules/forgeforms/dist/style.css";
import { ForgeForms } from "forgeforms";

const YourPage = () => {
  return <ForgeForms apiKey={process.env.FORGEFORMS_API_KEY} />;
};

export default YourPage;
```

## Need Support?

Reach us out at [https://forgeforms.roushan.me](https://forgeforms.roushan.me)

## License

MIT
