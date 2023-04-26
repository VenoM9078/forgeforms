import { WindupChildren } from "windups";
import { useState } from "react";
import { FaClipboard } from 'react-icons/fa';

const TextLoadingAnimatiom = ({ query }) => {
  const [copied, setCopied] = useState(false);
  let splitQuery = [];

  if (query && query.data) {
    splitQuery = query.data.toString().split(";");
    console.log(splitQuery);
  } 
  

  const copyToClipboard = () => {
    const el = document.createElement("textarea");
    el.value = splitQuery[0];
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    window.alert('Text copied to clipboard!');
  };

  return (
    <WindupChildren>
      {splitQuery.length > 1 ? (
        <p>
          <div className="relative">
            <p className="font-bold">{splitQuery[0]}</p>
            <button
              className="absolute top-50 right-0 py-1 px-2 text-white bg-purple-500 rounded hover:bg-blue-600 transition-all duration-200"
              onClick={copyToClipboard}
            >
              <FaClipboard />
            </button>
          </div>{" "}
          <hr className="mt-3 mb-3"></hr>
          <p>{splitQuery[1]}</p>
        </p>
      ) : (
        <p className="text-red-800">{splitQuery[0]}</p>
      )}
    </WindupChildren>
  );
};

export default TextLoadingAnimatiom;
