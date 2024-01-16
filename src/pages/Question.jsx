import React, { useState, useEffect  } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
// import TextLoadingAnimatiom from "../components/TextLoadingAnimation";
import { useLocation } from "react-router-dom";
import { WindupChildren } from "windups";
import TextLoop from "react-text-loop";
import useUserStore from "../userStore";
import axiosInstance from "../api/axiosInstance";
import { useAuth } from "@clerk/clerk-react";
import { useUser } from "@clerk/clerk-react";
import ReviewModal from "../components/ReviewModal";
import Notification from "../components/Notification";

const Question = () => {
  const { getToken } = useAuth();
  const { setUserId, fetchUser, user } = useUserStore();
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  // Review
  const [showNotification, setShowNotification] = useState(false);
  const [notification, setNotification] = useState({
    message: "",
    title: "",
  });

  const [showModal, setShowModal] = useState(false);
  const hasReviewed = useUserStore((state) => state.hasReviewed);

  
  useEffect(() => {
    // Set a timeout to show the review modal after 5-10 seconds
    // console.log("hasReviewed", hasReviewed());
    const delay = Math.random() * (10000 - 5000) + 5000; // Random delay between 5-10 seconds
    const timer = setTimeout(() => {
      // console.log("Review try run with delay of", delay);
      if (!hasReviewed()) {
        setShowModal(true); // Show modal only if user hasn't reviewed
      }
      // console.log("Modal value: ", showModal);
    }, delay);

    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  useEffect(() => {
    // Set a timeout to automatically close the notification after 5 seconds
    if (showNotification) {
      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000); // 5000 milliseconds = 5 seconds

      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  // // User Id
  const { user: clerkUser } = useUser();

  useEffect(() => {
    if (clerkUser) {
      setUserId(clerkUser.id); // Update Zustand state
      fetchUser(clerkUser.id);
    }
  }, [clerkUser, fetchUser, setUserId]);
  const location = useLocation();

  const schema = location.state.schema;
  const promptStart = `"${schema}" `;

  const [loading, setLoading] = useState(false);
  const [userPrompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  function handleInput(e) {
    setPrompt(e.target.value);
  }

  async function handleSubmit(event) {
    const token = await getToken();
    event.preventDefault();

    if (userPrompt.trim() === "") {
      return window.alert("Please enter prompt");
    }

    setLoading(true);
    const promptParams = `${promptStart} ${userPrompt}.`;
    console.log(promptParams);

    const requestBody = JSON.stringify({ query: promptParams });

    axiosInstance.post("/queryformer/schema-query", requestBody, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        mode: "cors",
      },
    })
      .then((responce) => {
        // setResult([...result, data]);
        console.log(responce.data.data.content);
        setResult(responce.data.data.content);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        toast("Error, Please try again later.")
        console.error(error);
      });
  }

  return (
    <>
      <Navbar
        user={user}
        showCreditsModal={showCreditsModal}
        setShowCreditsModal={setShowCreditsModal}
      />
      <div className="conatiner mx-auto border-gray-900">
        <div className="px-50 relative isolate pt-14 lg:px-8">
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
                  springConfig={{ stiffness: 200, damping: 80 }}
                  fade={true}
                  interval={5000}
                  adjustingSpeed={750}
                >

                  <span>Unveil the Mysteries of Schema</span>
                  <span>Your Guiding Light in Understanding</span>

                </TextLoop>
              </h1>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
                Query on Schema
              </h1>

              <p className="mt-6 px-20 text-lg leading-8 text-gray-600">
                Decipher the Magic of Schema: Your Key to Unlocking Complexities,
                Empowering Understanding and Expertise in a Seamless Journey.
              </p>

              <QuerySection handleSubmit={handleSubmit} handleInput={handleInput} userPrompt={userPrompt} loading={loading} result={result} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
      {showModal && (
          <ReviewModal
            setNotification={setNotification}
            setShowNotification={setShowNotification}
            setShowModal={setShowModal}
          />
        )}
        {showNotification && (
          <Notification
            title={notification.title}
            message={notification.message}
          />
        )}
    </>
  );
};

const QuerySection = ({ handleSubmit, userPrompt, handleInput, loading, result }) => {
  return (
    <>
      <section className="mt-12 mb-20 px-11">
        <div className="items mx-auto h-[350px] w-[800px] rounded-xl border p-6 shadow-lg shadow-purple-500/40">
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
    </>
  )
}

export default Question;
