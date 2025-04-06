import React from "react";
import { NavLink } from "react-router-dom";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import SearchBar from "../components/SearchBar.jsx";
import { supabase } from "../CreateClient.js";
import { useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { useNavigate } from "react-router-dom";
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
  const { uid } = useContext(UserContext);
  const navigate = useNavigate();

  const [movieinfo, setMovieInfo] = useState([]);

  useEffect(() => {
    fetchMovieInfo();
  }, []);
  async function fetchMovieInfo() {
    const { data } = await supabase.from("movies").select("*");
    setMovieInfo(data);
  }

  console.log(movieinfo);

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
        <div></div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
