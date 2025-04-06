import React from "react";
import Img1 from "../images/img1.jpg";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <>
      <img
        id="image"
        className="absolute z-0 w-screen h-screen object-cover"
        src={Img1}
      ></img>
      <div className="flex items-center justify-center h-screen">
        <div className="bg-transparent backdrop-blur-lg w-full lg:w-1/4 p-[2.5rem] border-[0.1rem] border-amber-50 rounded-xl font-mono">
          <form
            action=""
            name="myForm"
            className="flex flex-col gap-[2rem] text-white"
          >
            <h1 className="text-center text-white pb-2 text-2xl">Login</h1>
            <input
              type="email-address"
              name="email"
              id="email"
              placeholder="Email address"
              className=" bg-transparent p-5 border-[0.1rem] border-[#757576] rounded-full h-[3rem] w-full placeholder:pl-[1.5rem] placeholder:text-[#E5E4E4]"
            ></input>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              className=" bg-transparent p-5 border-[0.1rem] border-[#757576] rounded-full h-[3rem] w-full placeholder:pl-[1.5rem] placeholder:text-[#E5E4E4]"
            ></input>
            <div className="flex flex-col gap-[1rem]">
              <button className="bg-white text-black font-normal rounded-full h-[3rem] w-full">
                Login
              </button>
              <div className="flex flex-row justify-between text-sm font-light pt-3 text-white">
                <label for="Register">Don't have an account? </label>
                <NavLink to="/signup">Sign up</NavLink>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
