import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Tabs from "./Tabs";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";

const Prompt = () => {
  const [userPrompt, setPrompt] = useState("");
  const [result, setResult] = useState(" ");
  const [loading, setLoading] = useState(false);

  function SQLPromptFiller(propmt) {
    return `create an SQL query from the following natural language request ${propmt} .If the request cannot be accurately converted into an SQL query, please suggest explanation and modifications to the request to make it compatible with the converter tool.`;
  }

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (userPrompt.trim() === "") {
      return window.alert("Please enter prompt");
    }

    const paramPrompt = SQLPromptFiller(userPrompt);

    const requestBody = JSON.stringify({ query: paramPrompt });

    fetch("http://localhost:8000/api/v1/query/sql-query", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    })
      .then((response) => {
        setLoading(true);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setResult(data);

        setTimeout(() => {
          setLoading(false);
        }, 1500);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="items mx-auto mt-20 h-[400px] w-full max-w-screen-md rounded-lg border p-6 shadow-lg shadow-purple-500/40">
        <Tabs
          data={[
            {
              label: "Ask Query",
              content: (
                <TabOne
                  result={result}
                  handleInput={handleInput}
                  userPrompt={userPrompt}
                  handleSubmit={handleSubmit}
                  loading={loading}
                />
              ),
            },
            {
              label: "Upload Schema",
              content: <TabTwo />,
            },
          ]}
        />
      </div>
    </>
  );
};

export default Prompt;
