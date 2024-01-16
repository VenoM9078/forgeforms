import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
// import HeroHome from "../components/HeroHome";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import useUserStore from "../userStore";
import BuyCreditsModal from "../components/BuyCreditsModal";
import { ToastContainer, toast } from 'react-toastify';
import Testimonal from '../components/Testimonials';
import FAQ from '../components/FAQ';

const Home = () => {
  const { setUserId, fetchUser, user } = useUserStore();
  const [showCreditsModal, setShowCreditsModal] = useState(false);

  // // User Id
  const { user: clerkUser } = useUser();

  useEffect(() => {
    if (clerkUser) {
      setUserId(clerkUser.id); // Update Zustand state
      fetchUser(clerkUser.id);
    }
  }, [clerkUser, fetchUser, setUserId]);
  // console.log("This is The Clerk User: ", clerkUser);

  return (
    <>
      <Navbar
        user={user}
        showCreditsModal={showCreditsModal}
        setShowCreditsModal={setShowCreditsModal}
      />

      <BuyCreditsModal
        user={user}
        showCreditsModal={showCreditsModal}
        setShowCreditsModal={setShowCreditsModal}
      />

      <div className="conatiner mx-auto border-gray-900">
        <Hero />
      </div>

      <Testimonal />
      <FAQ />
      <div className="max-w-full">
          <div className="bg-purple-500">
            <div className="px-6 py-24 sm:px-6 sm:py-20 lg:px-8">
              <div className="mx-auto max-w-4xl text-center">
                <h2 className="text-7xl font-bold tracking-tight text-white">
                  Let’s work the next big thing has on together
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-white">
                  Let us manage your for you so that you can get back to doing
                  what you do best and we look in the future with certainty for
                  life.
                </p>
                <div
                  className="flex items-center justify-center gap-x-6 delay-[300ms] duration-[600ms] taos:[transform:translate3d(0,-200px,0)_scale(0.6)] taos:opacity-0"
                  data-taos-offset={500}
                >
                  <form className="mx-auto mt-10 flex max-w-md gap-x-4">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="w-64 flex-auto rounded-md border-0 bg-white px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-gray-800 sm:text-sm sm:leading-6"
                      placeholder="Enter your email"
                    />
                    <button
                      type="submit"
                      className="flex-none rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      Notify me
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      <Footer />
      <ToastContainer />
    </>
  );
};

export default Home;
