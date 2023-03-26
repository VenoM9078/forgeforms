import React from 'react'
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <>
      <Navbar />

      <div className="conatiner mx-auto border-gray-900">
      <Hero />
      </div>

      {/* <Footer /> */}
    </>
  )
}

export default Home