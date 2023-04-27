import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TextLoadingAnimatiom from "../components/TextLoadingAnimation";
import { useLocation } from "react-router-dom";
import { WindupChildren } from "windups";

const Question = () => {
  const location = useLocation();

  const schema = location.state.schema;
  const promptStart = `Here is my SQL Schema : "${schema}" ,of relational database and now I would like to ask some questions or queries based on that provided schema. My Question is : `;

  const [loading, setLoading] = useState(false);
  const [userPrompt, setPrompt] = useState("");
  // const [result, setResult] = useState([]);
  const [result, setResult] = useState("");

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (userPrompt.trim() === "") {
      return window.alert("Please enter prompt");
    }

    const promptParams = `${promptStart} ${userPrompt}.`;
    console.log(promptParams);

    const requestBody = JSON.stringify({ query: promptParams });

    fetch("http://127.0.0.1:8000/api/v1/schema/schema-query", {
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
      .then((res) => {
        // setResult([...result, data]);
        console.log(res.data.content);
        setResult(res.data.content);

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
      <Navbar />
      <section className="mt-10 mb-20 px-11">
        <div className="items mx-auto h-[600px] max-w-full rounded-xl border p-6 shadow-lg shadow-purple-500/40">
          <div className="relative h-10 border-b border-purple-300">
            <form onSubmit={handleSubmit}>
              <div className="inline-flex w-full">
                <input
                  type="text"
                  placeholder="Ask me Related Schema..."
                  className="text-black-300 placeholder:text-primary-500 w-full appearance-none rounded-md border-0 bg-transparent px-0 pt-1 pb-3 outline-none transition duration-500 focus:outline-none focus:ring-0"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="none"
                  spellCheck="false"
                  value={userPrompt}
                  onChange={handleInput}
                  required
                />

                <button className="text-purple-600" type="submit">
                  {!loading ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  ) : (
                    <div role="status">
                      <svg
                        aria-hidden="true"
                        className="mr-2 inline h-4 w-6 animate-spin fill-purple-600 text-gray-200 dark:text-gray-600"
                        viewBox="0 0 90 90"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>
          <div className="mt-6 h-[480px] w-full max-w-full overflow-y-auto rounded">
            <code className="text-start">
              {/* {!loading && result.map((ele, index) => {
                return <TextLoadingAnimatiom query={ele} />
              })} */}
              {/* {!loading && <TextLoadingAnimatiom query={result[result.length - 1]} />} */}
              {!loading && (
                <WindupChildren>
                  <p className="text-red-800">{result}</p>
                </WindupChildren>
              )}
            </code>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Question;
