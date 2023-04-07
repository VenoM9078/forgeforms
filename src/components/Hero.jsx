import React from "react";
import Prompt from "./Prompt";
import TextLoop from "react-text-loop";

const Hero = () => {
  return (
    <>
      <div className="px-50 relative isolate border pt-14 lg:px-8">
        <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
          <svg
            className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
            viewBox="0 0 1155 678"
          >
            <path
              fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
              fillOpacity=".3"
              d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
            />
            <defs>
              <linearGradient
                id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                x1="1155.49"
                x2="-78.208"
                y1=".177"
                y2="474.645"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#9089FC" />
                <stop offset="1" stopColor="#FF80B5" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="mx-auto max-w-4xl py-32 sm:py-48 lg:py-16">
          <div className="text-center">
            <h1 className="mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <TextLoop 
              springConfig={{ stiffness: 180, damping: 80 }}
              fade={true}
              interval={5000}    
              adjustingSpeed={750}          
              >
                
                <span>The Easy Way to Write Queries</span>
                <span>The Efficent Way to Solve Queries</span>
                <span>The AI Way of Solve Queries</span>
              </TextLoop>
            </h1>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
              Natural Language to SQL
            </h1>

            <p className="mt-6 px-20 text-lg leading-8 text-gray-600">
              Want to make querying databases a breeze? Use a natural language
              to SQL converter to translate human language questions into
              database query code.
            </p>

            <Prompt />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;

