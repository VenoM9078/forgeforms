import { useState } from "react";
import ForgeField from "./ForgeField";
import ForgeForms from "./ForgeForms";
import ForgeSubmit from "./ForgeSubmit";

function App() {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    console.log(e.target.value);
    setEmail(e.target.value);
  };

  return (
    <>
      <ForgeForms apiKey="whatever">
        <ForgeField
          // customStyle={{ width: "100%", border: "none", height: "20px" }}
          type="gay"
          name="email"
          onChange={handleEmail}
          value={email}
          label={`Enter Email Address`}
          placeholder={`Enter Email Address`}
        />
        <ForgeField
          // customStyle={{ width: "100%", border: "none", height: "20px" }}
          type="email"
          name="email"
          onChange={handleEmail}
          value={email}
          label={`Enter Email Address`}
          placeholder={`Enter Email Address`}
        />
        <ForgeField
          // customStyle={{ width: "100%", border: "none", height: "20px" }}
          type="number"
          name="age"
          label={`Enter Age`}
          placeholder={`Enter Age between 0 to 20`}
        />
        <ForgeField
          // customStyle={{ width: "100%", border: "none", height: "20px" }}
          type="textarea"
          name="message"
          label={`Message`}
          placeholder={`Enter Message`}
        />
        <ForgeField
          // customStyle={{ width: "100%", border: "none", height: "20px" }}
          type="textarea"
          name="message"
          label={`Message`}
          placeholder={`Enter Message`}
        />
        <ForgeSubmit text="Whatever" />
      </ForgeForms>
    </>
  );
}

export default App;
