import React from "react";
import { HashLoader, ScaleLoader, SquareLoader } from "react-spinners";

const LoadingScreen = ({ isLoading }) => {
  const override = `
    display: block;
    position: absolute;
    margin: 0 auto;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9999;
    border-color: red;
  `;

  return (
    <>
      {isLoading && (
        <div
          className="fixed w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-neutral-900 text-white"
          style={{ zIndex: "9999" }}
        >
          <h1
            style={{ fontFamily: "Inter", fontWeight: "200" }}
            className="text-4xl font-bold mb-8"
          >
            Uploading...
          </h1>
          <HashLoader color={"#fff"} loading={true} css={override} size={50} />
        </div>
      )}
    </>
  );
};

export default LoadingScreen;
