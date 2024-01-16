import { useAuth } from "@clerk/clerk-react";
import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

const ReviewModal = ({
  setNotification,
  setShowNotification,
  setShowModal,
}) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  // console.log("THis is Error: ", error.response.data.message);
  const [comment, setComment] = useState("");
  const [reviewError, setReviewError] = useState("");
  const [isError, setIsError] = useState(false);

  const { getToken } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const toggleModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    setIsError(true);
  }, [reviewError]);

  const emojis = [
    {
      id: 1,
      src: "https://img.icons8.com/emoji/48/sad-but-relieved-face.png",
      alt: "sad-but-relieved-face",
      rating: 1,
    },
    {
      id: 2,
      src: "https://img.icons8.com/emoji/100/pensive-face.png",
      alt: "pensive-face",
      rating: 2,
    },
    {
      id: 3,
      src: "https://img.icons8.com/emoji/100/slightly-smiling-face.png",
      alt: "slightly-smiling-face",
      rating: 3,
    },
    {
      id: 4,
      src: "https://img.icons8.com/emoji/100/grinning-face-with-big-eyes--v2.png",
      alt: "partying-face",
      rating: 4,
    },
    {
      id: 5,
      src: "https://img.icons8.com/emoji/100/smiling-face-with-heart-eyes.png",
      alt: "smiling-face-with-heart-eyes",
      rating: 5,
    },
  ];

  const handleEmojiSelect = (id) => {
    setSelectedEmoji(id);
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const reviewSubmission = async () => {
    const toolId = 10; // since you mentioned toolId will be 10
    const payload = {
      rating: selectedEmoji.rating, // Ensure selectedEmoji.rating is accessible
      comment: comment,
    };

    const token = await getToken();

    setIsLoading(true);

    axiosInstance
      .post(`/review/${toolId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
          // Include other headers like authorization if needed
          // Authorization: `Bearer ${token}`, // Uncomment and use if you have token variable
        },
      })
      .then((response) => {
        // console.log("Review Submitted: ", response.data);
        setIsLoading(false);
        document.cookie = "reviewed_text_2_sql=true; max-age=86400; path=/"; // Expires in 1 day

        // Handle success, maybe close modal or show a success message
        setNotification({
          title: "Review Submitted!",
          message: "Thanks for your feedback!",
        });
        toggleModal();
        setShowNotification(true);
      })
      .catch((error) => {
        // setIsError(true);
        setIsLoading(false);
        // setReviewError(error.response.data.message);
      });
  };

  return (
    <div>
      <div
        className="relative z-50"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-xl sm:p-6">
              <div
                onClick={toggleModal}
                className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-red-700 cursor-pointer lucide lucide-x-circle"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="m15 9-6 6" />
                  <path d="m9 9 6 6" />
                </svg>
              </div>
              <div className="sm:flex mt-5 justify-center">
                {/* Icon and Title */}

                <div className="mt-12 space-y-4 text-center sm:mt-0">
                  <h3
                    className="text-2xl leading-6 font-bold text-gray-900"
                    id="modal-title"
                  >
                    How'd you like the tool?
                  </h3>
                  <h5 className="text-2xl leading-6 font-base text-gray-600">
                    Tell us about the experience so far.{" "}
                  </h5>
                  <div className="mt-4">
                    <div className="flex items-center justify-center gap-x-2">
                      {emojis.map((emoji) => (
                        <button
                          key={emoji.id}
                          onClick={() => handleEmojiSelect(emoji)}
                          className={`transition-transform ${
                            selectedEmoji?.id === emoji.id ? "scale-110" : ""
                          }`}
                        >
                          <img
                            width={selectedEmoji?.id === emoji.id ? "66" : "60"}
                            height={
                              selectedEmoji?.id === emoji.id ? "66" : "60"
                            }
                            src={emoji.src}
                            alt={emoji.alt}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              {selectedEmoji && (
                <>
                  <div className="px-6">
                    <div className="mt-4 max-w-md mx-auto">
                      <textarea
                        rows={4}
                        required
                        name="comment"
                        id="comment"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                        value={comment}
                        onChange={handleCommentChange}
                        placeholder="Say a few words about why you feel that way!"
                      />
                      {comment.length < 2 ? (
                        <div className=" flex items-center justify-start my-4 text-red-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-alert-triangle"
                          >
                            <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                            <path d="M12 9v4" />
                            <path d="M12 17h.01" />
                          </svg>
                          <span className=" pl-2 first-letter:capitalize">
                            {" "}
                            {"Comment Must be Greater then 1 Character"}.
                          </span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex items-center justify-center">
                    <button
                      type="button"
                      disabled={isLoading}
                      className="mt-3 inline-flex  tracking-wide justify-center rounded-md border  shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-auto"
                      onClick={reviewSubmission}
                    >
                      {isLoading ? (
                        <div role="status">
                          <svg
                            aria-hidden="true"
                            className="inline w-6 h-6 ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                            viewBox="0 0 100 101"
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
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
