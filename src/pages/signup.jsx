import React, { useState, useEffect, use } from "react";
import { supabase } from "../CreateClient";
import { NavLink } from "react-router-dom";
import Img1 from "../images/img1.jpg";

const SignUp = () => {
  const [users, setUser] = useState({
    name: "",
    email: "",
    password: "",
    phnno: "",
  });

  function handleChange(e) {
    setUser((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  }
  // after ssubmitting the form go to the login page
  async function createUser() {
    const { data, error } = await supabase.from("users").insert({
      name: users.name,
      email: users.email,
      password: users.password,
      user_type: 0,
      phone_no: users.phnno,
      balance: 0,
    });

    if (error) {
      console.error("Supabase insert error:", error.message, error.details);
    } else {
      console.log("Inserted user:", data);
      alert("User created successfully!");
      // Redirect to the login page after successful signup
      window.location.href = "/";
    }
  }
  console.log(users);

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
            onSubmit={async (e) => {
              e.preventDefault(); // Prevent page reload
              await createUser(); // Insert into Supabase
            }}
          >
            <h1 className="text-center text-white pb-2 text-2xl">Sign Up</h1>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              className="bg-transparent p-5 border-[0.1rem] border-[#757576] rounded-full h-[3rem] w-full placeholder:pl-[1.5rem] placeholder:text-[#E5E4E4]"
            />
            <input
              type="number"
              id="phnno"
              name="phnno"
              placeholder="Phone Number"
              onChange={handleChange}
              className="bg-transparent p-5 border-[0.1rem] border-[#757576] rounded-full h-[3rem] w-full placeholder:pl-[1.5rem] placeholder:text-[#E5E4E4]"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email address"
              onChange={handleChange}
              className=" bg-transparent p-5 border-[0.1rem] border-[#757576] rounded-full h-[3rem] w-full placeholder:pl-[1.5rem] placeholder:text-[#E5E4E4]"
            ></input>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={handleChange}
              className=" bg-transparent p-5 border-[0.1rem] border-[#757576] rounded-full h-[3rem] w-full placeholder:pl-[1.5rem] placeholder:text-[#E5E4E4]"
            ></input>

            <div className="flex flex-col gap-[1rem]">
              <button
                className="bg-white text-black font-normal rounded-full h-[3rem] w-full"
                type="submit"
              >
                SignUp
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
