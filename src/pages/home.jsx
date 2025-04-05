import React from "react";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Img1 from "../images/img1.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";  

const Home = () => {
  return (
    <>
      <div className="bg-[#181C24] w-full h-full">
        <NavBar />
        <div>
          <img src={Img1} className="w-auto  h-auto " alt="..." />
              <div className="hidden lg:block w-full self-center lg:h-[80vh] ">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <h1 className="text-white font-mono font-[450] text-[2.9rem] text-center tracking-wide w-screen drop-shadow-2xl">
                    Search Your One From Thousands of
                  </h1>
                  <h1 className="text-[#6B0000] font-mono font-[450] text-[2.9rem] text-center mb-7 tracking-wide drop-shadow-2xl">
                    Games
                  </h1>
                  <div className="text-center">
                    <SearchBar />
                  </div>
        
                  <h1 className="text-white text-[1.2rem] font-mono mt-3 font-light text-center tracking-wider drop-shadow-2xl">
                    Ignite Your Imagination, Conquer Your Dreams!
                  </h1>
                </div>
              </div>
          </div>
        <div className="bg-[#101216] py-10">
          <div className="flex content-between justify-between max-w-full mx-4 lg:mx-10">
            <h1 className="font-mono text-2xl lg:text-3xl mt-6 lg:pt-15 lg:pl-[7.5rem] text-white font-light">
              Currently Screening
            </h1>
            <a
              href="/trending"
              className="text-white font-mono self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
            >
              View All
            </a>
          </div>

          <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-5 flex-wrap ">
          </div>
        </div>
        <div className=" py-10">
          <div className="flex content-between justify-between max-w-full mx-4 lg:mx-10">
            <h1 className="font-mono text-2xl lg:text-3xl mt-6 lg:mt-15  lg:pl-[7.5rem] text-white font-light">
              Genre
            </h1>
            <a
              href="/grossing"
              className="text-white font-mono self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
            >
              View All
            </a>
          </div>
          <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-5 flex-wrap ">
          </div>
        </div>
        
        <Footer />
      </div>
    </>
  );
};

export default Home;
