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
          <div className="hidden lg:block w-full self-center ">
            <div className="py-10">
              <h1 className="text-white font-mono font-[450] text-[2.9rem] text-center tracking-wide drop-shadow-2xl">
                Search for 
              </h1>
              <h1 className="text-red-800 font-mono font-[450] text-[2.9rem] text-center mb-7 tracking-wide drop-shadow-2xl">
                Movies
              </h1>
              <div className="text-center">
                <SearchBar />
              </div>
            </div>
          </div>
        </div>
        {/* Movie List Section */}
        <div className="flex justify-center items-center mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-15 p-6">
            {movieinfo.map((movie) => (
              <div
                key={movie.m_id} // move the key here
                className="shadow-red-800 text-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow min-w-[15] max-w-80"
              >
                <img
                  src={movie.m_image}
                  alt={movie.m_name}
                  className="object-cover rounded-md mb-4 min-h-[95] max-h-[95%]"
                />
                <div className="flex justify-center">
                  <Link to={`/movie/${movie.m_id}`}>
                    <button className="bg-red-800 text-white font-bold py-2 px-6 rounded">
                      Book Now
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Home;
