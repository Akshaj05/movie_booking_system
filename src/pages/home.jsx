import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar.jsx";
import Img1 from "../images/img1.jpg";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Home = () => {
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      console.log(user.email);
      console.log(user.phone_no);
    }
  }, []);

  return (
    <>
      <div className="bg-[#101216] w-[100vw] h-full">
        <NavBar />
        <div>
          <div className="hidden lg:block w-full self-center lg:h-[80vh] ">
            <div className="py-10">
              <h1 className="text-white font-mono font-[450] text-[2.9rem] text-center tracking-wide drop-shadow-2xl">
                Search Your One From Thousands of
              </h1>
              <h1 className="text-white font-mono font-[450] text-[2.9rem] text-center mb-7 tracking-wide drop-shadow-2xl">
                Movies
              </h1>
              <div className="text-center">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#101216]">
          <div className="flex content-between justify-between ">
            <h1 className="font-mono text-2xl lg:text-3xl mt-6 lg:pt-15  text-white font-light">
              Currently Screening
            </h1>
            <a
              href="/trending"
              className="text-white font-mono self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
            >
              View All
            </a>
          </div>

          <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-5 flex-wrap "></div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
