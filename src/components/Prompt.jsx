import React, { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Tabs from "./Tabs";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";

const Prompt = () => {
  const [userPrompt, setPrompt] = useState("");
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if(userPrompt.trim() === '') {
        
        return console.error("Please enter prompt");
    }

    const requestBody = JSON.stringify({ query: userPrompt });

    fetch("http://127.0.0.1:8000/api/v1/query/sql-query", {
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
        }, 1500)
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // const uploadFile = ;

  return (
    <>
      <div className="mx-auto mt-20 h-[400px] items w-full max-w-screen-md rounded-lg p-6 shadow-lg shadow-purple-500/40">
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
