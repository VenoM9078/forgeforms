import React, { useState } from "react";
import { FilePond, registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import axios from "axios";
import Tabs from "./Tabs";
import TabOne from "./TabOne";

const Prompt = () => {
    const [userPrompt, setPrompt] = useState("");
    const [result, setResult] = useState({});
    const [loading, setLoading] = useState(false);

    function handleInput(e) {
        setPrompt(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        axios
            .post("http://127.0.0.1:8000/api/v1/sql-query", userPrompt)
            .then((responce) => {
                setPrompt("");
                console.log(responce.data)
                setResult(responce);
                setLoading(true);  
            })
            .catch((err) => {
                console.error(err);
            });
    }

    // const uploadFile = ;

    return (
        <>
            <div className="mx-auto mt-20 h-[400px] w-full max-w-screen-md rounded-lg p-6 shadow-lg shadow-purple-500/40">
                <Tabs
                    data={[
                        {
                            label: "Upload Schema",
                            content: "This is the content for Tab 2.",
                        },
                        {
                            label: "Ask Query",
                            content: <TabOne result={result} handleInput={handleInput} userPrompt={userPrompt} handleSubmit={handleSubmit} loading={loading} />,
                        },
                    ]}
                />
            </div>
        </>
    );
};

export default Prompt;

// const content = <div className="relative flex h-full flex-col mt-2">
// <div div className="border-primary-900 relative h-12 border-b" >
//     <form onSubmit={handleSubmit}>
//         <input
//             type="text"
//             placeholder="Ask me anything..."
//             className="text-black-300 placeholder:text-primary-500 w-full appearance-none rounded-md border-0 bg-transparent px-0 pt-1 pb-2 outline-none transition duration-500 focus:outline-none focus:ring-0"
//             autoComplete="off"
//             autoCorrect="off"
//             autoCapitalize="none"
//             spellCheck="false"
//             value={userPrompt}
//             onChange={handleInput}
//         />
//     </form>
// </div >
// <div className="from-neutral-1100 to-neutral-1100/0 absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t"></div>
// <div className="hidden-scrollbar prose prose-sm dark:prose-invert absolute inset-x-0 bottom-0 top-12 z-0 max-w-full overflow-y-auto scroll-smooth py-4 pb-8">
//     <code className="text-start">
//         {loading && <TextLoadingAnimatiom query={result.text} />}
//     </code>
// </div>
// </div >;
