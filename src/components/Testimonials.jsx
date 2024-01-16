import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);

  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    setLoading(true); // Start loading
    axiosInstance
      .get("/review/10")
      .then((response) => {
        const fetchedReviews = response.data.data.reviews;
        setReviews(fetchedReviews.slice(0, 11)); // Limit to 11 reviews
        setLoading(false); // Stop loading after data is fetched
      })
      .catch((error) => {
        // console.error("Failed to fetch reviews:", error);
        setLoading(false); // Stop loading if there is an error
      });
  }, []);
  return (
    <>
      <div className="py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-lg font-semibold leading-8 tracking-tight text-indigo-600">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              We have worked with thousands of amazing people
            </p>
          </div>
          <div className="mx-auto mt-16 flow-root max-w-2xl sm:mt-20 lg:mx-0 lg:max-w-none">
            <div className="-mt-8 sm:-mx-4 sm:columns-2 sm:text-[0] lg:columns-3">
              {loading
                ? // Render Skeletons when loading
                  Array.from({ length: 11 }).map((_, index) => (
                    <div
                      key={index}
                      className="pt-8 sm:inline-block sm:w-full sm:px-4"
                    >
                      <Skeleton borderRadius={0.25} height={200} />
                    </div>
                  ))
                : // Render reviews when not loading
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="pt-8 sm:inline-block sm:w-full sm:px-4"
                    >
                      <figure className="rounded-2xl bg-white shadow-lg ring-1 ring-gray-900/5 p-8 text-sm leading-6">
                        <blockquote className="text-gray-900">
                          <p>“{review.comment}”</p>
                        </blockquote>
                        <figcaption className="mt-6 flex items-center gap-x-4">
                          <img
                            className="h-10 w-10 rounded-full bg-gray-50"
                            src={review?.user?.imageUrl || ""}
                            alt=""
                          />
                          <div>
                            <div className="font-semibold text-gray-900">
                              {review?.user?.firstName} {review?.user?.lastName}
                            </div>
                            <div className="text-gray-600">
                              @{review?.user?.username}
                            </div>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonials;
