import React from 'react'
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react"; 
import HeroHome from "../components/HeroHome";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import useUserStore from '../components/userStore';

const Home = () => {

  const { setUserId, setUserAPIKey } = useUserStore();
  const { userId, userAPIKey } = useUserStore();
  const { fetchUser, user } = useUserStore();
    // // User Id
    const { user: clerkUser } = useUser();

    useEffect(() => {
      if (clerkUser) {
        setUserId(clerkUser.id); // Update Zustand state
        fetchUser(clerkUser.id);
      }
    }, [clerkUser, fetchUser, setUserId]);
    console.log("This is The Clerk User: ", clerkUser);
  return (
    <>
      <Navbar user={user}
        showCreditsModal={showCreditsModal}
        setShowCreditsModal={setShowCreditsModal} />

      <BuyCreditsModal
        user={user}
        showCreditsModal={showCreditsModal}
        setShowCreditsModal={setShowCreditsModal}
      />

      <div className="conatiner mx-auto border-gray-900">
        <Hero />
      </div>

      <Footer />
    </>
  )
}

export default Home