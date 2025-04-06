import React from "react";
import Logo from "../images/logo.png";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div>
      <div className="flex justify-between content-between bg-[#6B0000]  py-[1rem] mx-auto">
        <div className="flex content-center justify-center ">
          <div className="h-3 w-5"></div>
          <img
            src={Logo}
            className="lg:min-w-[3.5rem] lg:max-w-[3.5rem] min-w-[2.8rem] max-w-[3rem] ps-[0.6rem]"
            alt="logo"
          ></img>
          <h1 className="font-mono font-[500] lg:text-[1.2rem] text-[1rem]  text-white self-center ml-2">
          CineSphere
          </h1>
          <ul className="hidden lg:flex font-mono text-white no-underline text-[1.1rem] gap-7 self-center ms-8 ">
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/support">Support</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;