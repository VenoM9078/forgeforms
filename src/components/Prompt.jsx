import React, { useState } from "react";
import axios from "axios";

const Prompt = () => {
    const apiKey = "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";
    const [userPrompt, setPrompt] = useState("");
    const [data, setData] = useState([{}]);

    const apiBody = {
        "model": "text-davinci-003",
        "prompt": userPrompt,
        "temperature": 0.3,
        "max_tokens": 60,
        "top_p": 1.0,
        "frequency_penalty": 0.0,
        "presence_penalty": 0.0
      }

    function handleInput(e) {
        setPrompt(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post(
                "https://api.openai.com/v1/completions",
                JSON.stringify(apiBody),
                {
                    headers: {
                        Authorization: "Bearer " + apiKey,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                setData(res.data.choices);
                console.log(res.data.choices);
            })
            .catch((err) => {
                console.error(err);
            });
    }

    return (
        <>
            <div className="shadow-box border-primary-500/20 shadow-primary-500/10 relative mx-auto mt-20 h-[300px] w-full max-w-screen-sm rounded-2xl border p-8">
                <div className="relative flex h-full flex-col">
                    <div className="border-primary-900 relative h-12 border-b">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                className="text-black-300 placeholder:text-primary-500 w-full appearance-none rounded-md border-0 bg-transparent px-0 pt-1 pb-2 outline-none transition duration-500 focus:outline-none focus:ring-0"
                                autoComplete="off"
                                autoCorrect="off"
                                autoCapitalize="none"
                                spellCheck="false"
                                value={userPrompt}
                                onChange={handleInput}
                            />
                        </form>
                    </div>
                    <div className="from-neutral-1100 to-neutral-1100/0 absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t"></div>
                    <div className="hidden-scrollbar prose prose-sm dark:prose-invert absolute inset-x-0 bottom-0 top-12 z-0 max-w-full overflow-y-auto scroll-smooth py-4 pb-8">
                        <code className="text-start">
                            <p>{data.map(ele => ele.text)}</p>
                        </code>
                    </div>
                </div>
                {/* <div className="pointer-events-none absolute right-0 bottom-32 h-2 w-2 opacity-0"></div> */}
            </div>
        </>
    );
};

export default Prompt;
