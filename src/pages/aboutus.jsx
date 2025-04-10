import React from "react";
import Navbar from "../components/Navbar.jsx";
import Icon1 from "../images/popcorn.svg";
import Icon2 from "../images/moobies.svg";
import Utkarsh from "../images/Utkarsh.jpg";
import Kshitij from "../images/Kshitij.png";
import Akshaj from "../images/Askhaj.jpg";
import Soham from "../images/Soham.jpg";
import Footer from "../components/Footer.jsx";

const About = () => {
  return (
    <div className=" w-screen h-screen bg-[#181C24]">
      <Navbar />

      <div className=" bg-[#151617] w-full  lg:pt-10 lg:pb-10">
        <div className="flex justify-center gap-3 lg:gap-5">
          <h1 className="text-white text-4xl font-mainFont font-normal text-center pt-10 lg:text-6xl">
            About
          </h1>
          <h1 className="text-[#6B0000] text-4xl font-mainFont font-normal text-center pt-10 lg:text-6xl  ">
            CineSphere
          </h1>
        </div>
        <p className="text-white font-mainFont font-[300] text-center w-4/5 mx-auto mt-5 lg:mt-10 lg:text-[1.2rem] lg:w-[60rem]">
          Welcome to CineSphere, your ultimate destination for seamless movie
          ticket booking. Explore a universe of entertainment with our
          handpicked selection of the latest blockbusters and timeless classics.
          Enhance your movie-going experience with us, where convenience meets
          cinematic magic!
        </p>
      </div>

      <div className=" bg-[#181C24]">
        <div className="flex-col justify-center content-center bg-[#181C24]">
          <div className="m-10 lg:flex justify-center lg:mt-20">
            <img
              src={Icon1}
              alt="icon"
              className="w-1/3  mx-auto mt-15 lg:h-[10rem] lg:w-[10rem] lg:mx-0 lg:mr-[3rem]"
            />
            <div className="lg:w-1/3">
              <h2 className=" text-[#6B0000] font-mainFont font-semibold text-[1.4rem] text-center mt-7 lg:text-left lg:text-3xl">
                IMMERSE YOURSELF IN CINEMATIC MAGIC
              </h2>
              <p className="text-center text-white font-mainFont lg:text-xl font-extralight mt-4 lg:text-left">
                Discover the latest blockbusters or timeless classics at
                CineSphere, where every seat offers a front-row experience to
                unforgettable stories. We bring you a wide selection of movies,
                Book your tickets now and be part of the movie magic-your
                perfect showtime awaits!
              </p>
            </div>
          </div>
        </div>

        <div className="flex-col justify-center content-center bg-[#181C24]">
          <div className="m-10 lg:flex justify-center lg:mt-[3rem]">
            <img
              src={Icon2}
              alt="icon"
              className=" mx-auto mt-13 h-[12rem] w-[12rem] lg:mx-0 lg:mr-[1rem] "
            />
            <div className="lg:w-1/3">
              <h2 className=" text-[#6B0000] font-mainFont font-semibold text-[1.4rem] text-center mt-7 lg:text-left lg:text-3xl">
                DESIGNED FOR EVERY MOVIE LOVER
              </h2>
              <p className="text-center text-white font-mainFont mb-[5rem] lg:text-xl  font-extralight mt-4 lg:text-left">
                CineSphere’s platform offers smooth browsing, special discounts,
                and stunning visuals for a seamless and delightful ticket
                booking experience. Whether you're into rom-coms or thrillers,
                your next movie night is just a click away!
              </p>
            </div>
          </div>
        </div>

        {/* aaaa */}
        <div className="bg-[#151617] h-full w-full flex flex-col justify-center items-center pt-10">
          <div className="flex">
            <h1 className="text-white text-4xl font-mainFont font-normal text-center lg:text-6xl">
              Our
            </h1>
            <h1 className="text-[#6B0000] text-4xl font-mainFont font-normal text-center lg:text-6xl  ">
              Team
            </h1>
          </div>
          {/* images and circles div: */}
          <div
            name="People"
            className=" lg:w-[90rem] lg:mt-10 lg:flex lg:justify-between pb-[5rem]"
          >
            <div className="mt-10 flex flex-col items-center">
              <img
                src={Soham}
                alt="Ashmit photo"
                className="w-1/3 h-1/3 lg:h-[12rem] lg:w-[12rem] rounded-full"
              />
              <h1 className=" text-white text-2xl mt-5 font-regular">
                Soham Doiphode
              </h1>
              <p className="text-center text-white w-[20rem] font-thin mt-4 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <div className="bg-white w-1/2 mt-10 h-1 rounded-full lg:hidden"></div>
            </div>
            <div className="mt-10 flex flex-col items-center">
              <img
                src={Akshaj}
                alt="Ashmit photo"
                className="w-1/3 h-1/3 lg:h-[12rem] lg:w-[12rem] rounded-full"
              />
              <h1 className=" text-white text-2xl mt-5 font-regular">
                Akshaj Ramakrishnan
              </h1>
              <p className="text-center text-white w-[20rem] font-thin mt-4 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <div className="bg-white w-1/2 mt-10 h-1 rounded-full lg:hidden"></div>
            </div>
            <div className="mt-10 flex flex-col items-center">
              <img
                src={Utkarsh}
                alt="Ashmit photo"
                className="w-1/3 h-1/3 lg:h-[12rem] lg:w-[12rem] rounded-full"
              />
              <h1 className=" text-white text-2xl mt-5 font-regular">
                Utkarsh Tanna
              </h1>
              <p className="text-center text-white w-[20rem] font-thin mt-4 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <div className="bg-white w-1/2 mt-10 h-1 rounded-full lg:hidden"></div>
            </div>
            {/* shadow-[-10_14px_0_0_rgba(255,255,255,0.3)] */}
            <div className="mt-10 flex flex-col items-center">
              <img
                src={Kshitij}
                alt="Ashmit photo"
                className="w-1/3 h-1/3 lg:h-[12rem] lg:w-[12rem] rounded-full "
              />
              <h1 className=" text-white text-2xl mt-5 font-regular">
                Kshitij Joshi
              </h1>
              <p className="text-center text-white w-[20rem] font-thin mt-4 ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. 
              </p>
              <div className="bg-white w-1/2 mt-10 mb-10 h-1 rounded-full lg:hidden"></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
