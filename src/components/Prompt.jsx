import React, { useState, useEffect } from "react";
// import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Tabs from "./Tabs";
import TabOne from "./TabOne";
import TabTwo from "./TabTwo";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "@clerk/clerk-react";
import { toast } from 'react-toastify';

const Prompt = () => {
  const [userPrompt, setPrompt] = useState("");
  const [result, setResult] = useState(" ");
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();

  // function SQLPromptFiller(propmt) {
  //   return `create an SQL query from the following natural language request ${propmt} .If the request cannot be accurately converted into an SQL query, please suggest explanation and modifications to the request to make it compatible with the converter tool.`;
  // }

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  async function handleSubmit(e) {
    const token = await getToken();
    e.preventDefault();

    if (userPrompt.trim() === "") {
      return window.alert("Please enter prompt");
    }

    setLoading(true);
    // const paramPrompt = SQLPromptFiller(userPrompt);

    const requestBody = JSON.stringify({ query: userPrompt });

    axiosInstance.post("/queryformer/sql-query", requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        mode: "cors",
      },
    })
      .then((response) => {
        setResult(response.data.data);
        console.log("Data", response.data.data)
        console.log(result)
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
        toast("Error Occured.")
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
