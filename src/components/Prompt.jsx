import React, {useState} from "react";

const Prompt = () => {

    const [prompt, setPrompt] = useState("");
    const [data, setData] = useState("");

    function handleInput(e) {
        setPrompt(e.target.value)
        console.log(prompt);
    }

    function handleSubmit() {
        // e.preventDefault();
        setPrompt("");
    }

  return (
    <>
      <div className="shadow-box border-primary-500/20 shadow-primary-500/10 relative mx-auto mt-20 h-[500px] w-full max-w-screen-sm rounded-2xl border p-8">
        <div className="relative flex h-full flex-col">
          <div className="relative h-12 border-b border-primary-900">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full appearance-none rounded-md border-0 bg-transparent px-0 pt-1 pb-2 text-black-300 outline-none transition duration-500 placeholder:text-primary-500 focus:outline-none focus:ring-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="none"
                spellCheck="false"
                value={prompt}
                onChange={handleInput}
              />
            </form>
          </div>
          <div className="from-neutral-1100 to-neutral-1100/0 absolute inset-x-0 bottom-0 z-10 h-10 bg-gradient-to-t"></div>
          <div className="hidden-scrollbar prose prose-sm dark:prose-invert absolute inset-x-0 bottom-0 top-12 z-0 max-w-full overflow-y-auto scroll-smooth py-4 pb-8">
            <code className="text-start">
                    <p>{prompt}</p>              
            </code>
          </div>
        </div>
        {/* <div className="pointer-events-none absolute right-0 bottom-32 h-2 w-2 opacity-0"></div> */}
      </div>
    </>
  );
};

export default Prompt;
