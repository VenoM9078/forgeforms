import TextLoadingAnimatiom from "./TextLoadingAnimation";

export default function tabOne({handleSubmit, userPrompt, handleInput, loading, result}) {

    return (
        <div className="relative flex h-full flex-col">
            <div className="relative h-10 border-b border-purple-300">
                <form onSubmit={handleSubmit}>
                    <div className="inline-flex w-full">
                        <input
                            type="text"
                            placeholder="Ask me SQL Query..."
                            className="text-black-300 placeholder:text-primary-500 w-full appearance-none rounded-md border-0 bg-transparent px-0 pt-1 pb-2 outline-none transition duration-500 focus:outline-none focus:ring-0"
                            autoComplete="off"
                            autoCorrect="off"
                            autoCapitalize="none"
                            spellCheck="false"
                            value={userPrompt}
                            onChange={handleInput}
                        />
                        <button className="text-purple-600" type="submit">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="h-6 w-6"
                            >
                                <path
                                    strokeLinejoin="round"
                                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                                />
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
            <div className="mt-6 w-full max-w-screen-md overflow-y-auto h-[240px] rounded">
                <code className="text-start">
                    {loading && <TextLoadingAnimatiom query={result} />}
                </code>
            </div>
        </div>
    )
}
