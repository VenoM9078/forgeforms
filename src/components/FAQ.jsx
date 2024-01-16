import React, { useState } from "react";

const FAQ = () => {
  const [expandedItem, setExpandedItem] = useState(null);

  const questions = [
    {
      question: "What’s packed into Axiom Toolkit?",
      answer:
        "Axiom Toolkit is a powerhouse of diverse SaaS tools, ranging from AI-driven utilities like Image Upscalers to productivity enhancers like Resume Builders. It’s your go-to destination for niche tools that can be seamlessly integrated into various workflows.",
    },
    {
      question: "How does Axiom ensure high-quality outputs?",
      answer:
        "Our toolkit leverages state-of-the-art algorithms and cloud computing to deliver high-performance results. We ensure that all the tools are up-to-date with the latest technological advancements, providing you with exceptional quality outputs.",
    },
    {
      question: "Can I scale my usage as per my needs?",
      answer:
        "Absolutely! Axiom Toolkit is built for scalability. Whether you are an individual, a start-up, or an enterprise, we have got you covered. The platform scales resources dynamically based on your usage to ensure an uninterrupted experience.",
    },
    {
      question: "What about data security and privacy?",
      answer:
        "Data security is paramount at Axiom Toolkit. We implement robust encryption standards and comply with GDPR regulations. Your data is only used for processing and is not shared or stored beyond what is necessary for the service.",
    },
    {
      question: "Is Axiom Toolkit developer-friendly?",
      answer:
        "Yes, developers love us! Axiom Toolkit offers RESTful APIs, detailed documentation, and a community forum. Whether you want to integrate our tools into your app or build on top of them, we provide you with the resources you need.",
    },
  ];

  return (
    <div className="bg-white">
      <div className="mx-auto  px-6 py-24 lg:px-8">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className="text-2xl font-bold leading-10 tracking-tight text-gray-900">
            Frequently asked questions
          </h2>
          <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
            {questions.map((item, index) => (
              <div key={index} className="pt-6">
                <dt>
                  <button
                    type="button"
                    className="flex w-full items-start justify-between text-left text-gray-900"
                    onClick={() =>
                      setExpandedItem(expandedItem === index ? null : index)
                    }
                  >
                    <span className="text-base font-semibold leading-7">
                      {item.question}
                    </span>
                    <span className="ml-6 flex h-7 items-center">
                      <svg
                        className={
                          expandedItem === index ? "hidden h-6 w-6" : "h-6 w-6"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M18 12H6"
                        />
                      </svg>
                      <svg
                        className={
                          expandedItem === index ? "h-6 w-6" : "hidden h-6 w-6"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6v12m6-6H6"
                        />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd
                  className={`mt-2 pr-12 ${
                    expandedItem === index ? "block" : "hidden"
                  }`}
                  id={`faq-${index}`}
                >
                  <p className="text-base leading-7 text-gray-600">
                    {item.answer}
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
