import React from "react";
import Gmail from "../images/Gmail.svg";
import Github from "../images/Github.svg";
import Instagram from "../images/Instagram.svg";
import Linkedin from "../images/Linkedin.svg";

const Footer = () => {
  return (
    <div className="bg-[#181C24] w-[100vw] h-auto">
      <div className="bg-[#181C24] rounded-t-[3rem] h-[15rem] flex flex-col justify-center gap-4">
        <p className=" font-mono text-white text-2l text-center">
          Connect with Us
        </p>
        <div className="	flex justify-center">
          <div
            name="logos"
            className=" lg:w-1/4 flex space-between gap-7 lg:justify-between"
          >
            <div className="bg-[#6B0000]  lg:h-[4.5rem] lg:w-[4.5rem] h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
              <a href="https://www.instagram.com/x0dus_gaming/">
                <img
                  src={Instagram}
                  className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] "
                ></img>
              </a>
            </div>
            <div className="bg-[#6B0000]  lg:h-[4.5rem] lg:w-[4.5rem] h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
              <a href="https://github.com/Akshaj05/movie_booking_system">
                <img
                  src={Github}
                  className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] "
                ></img>
              </a>
            </div>
            <div className="bg-[#6B0000]  lg:h-[4.5rem] lg:w-[4.5rem] h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
              <img
                src={Gmail}
                className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] "
              ></img>
            </div>
            <div className="bg-[#6B0000]  lg:h-[4.5rem] lg:w-[4.5rem] h-[3rem] w-[3rem] rounded-full flex justify-center items-center">
              <a href="https://www.linkedin.com/school/nmims-engineering/">
                <img
                  src={Linkedin}
                  className="w-[2rem] h-[2rem] lg:w-[2.5rem] lg:h-[2.5rem] "
                ></img>
              </a>
            </div>
          </div>
        </div>
        <p className=" font-mono text-white text-2l text-center">Get Support</p>
        <p className=" font-mono text-[#6B0000] text-2l text-center">
          <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
            Tutorial link
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
