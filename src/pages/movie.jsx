import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useParams } from "react-router-dom";
import { supabase } from "../CreateClient.js";
import { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";

const MoviePg = () => {
  const [activeTab, setActiveTab] = useState("about");

  const { m_id } = useParams();
  const [movieinfo, setMovieInfo] = useState([]);

  async function fetchMovieInfo() {
    const { data } = await supabase.from("movies").select("*").eq("m_id", m_id);
    setMovieInfo(data);
  }
  useEffect(() => {
    fetchMovieInfo();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        {/* Main Content */}
        <main className="flex flex-col gap-17 px-6 py-4">
          <div className="flex flex-row justify-center gap-[5vw] items-center">
            {/* Left Column - Movie Info */}
            <div className="md:w-1/2  flex flex-col gap-15">
              <div>
                <h1 className="text-4xl font-bold mb-4">
                  {movieinfo[m_id]?.m_name}
                </h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-2 py-1 bg-red-900 text-xs rounded">
                    {movieinfo[m_id]?.m_genre}
                  </span>
                  <span className="text-gray-400">English</span>
                  <span className="text-gray-400">Brian Cranston</span>
                </div>
                <p className="text-gray-300 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  leo ex placerat volutpat. Praesent consectetur vulputate
                  pulvinar, gravida id quam. Fusce rutrum consequat ligula.
                  Fusce ac nisi non justo aliquet ultrices. Mi turpis porta
                  risus, dignissim lacinia velit felis a quam. In auctor ut
                  tortor sit amet rhoncus.
                </p>
                <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-6 rounded flex items-center">
                  BUY TICKETS
                </button>
              </div>
              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">CAST</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <h1>Cast 1</h1>
                  <h1>Cast 2</h1>
                </div>
              </section>
            </div>

            {/* Right Column - Movie Poster */}
            <div className=" ">
              <div className="">
                <img
                  src="https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"
                  alt="Alien Romulus movie poster"
                  className="w-[20vw] rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
          {/* Movie Details Tabs */}
          <section className="mb-8 w-[70vw] mx-auto  items-center">
            <div>
              <div className="flex mb-4 items-center">
                <button
                  className={`flex-1 py-3 font-bold rounded-lg ${
                    activeTab === "about" ? "bg-red-900" : "bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("about")}
                >
                  ABOUT MOVIE
                </button>
                <button
                  className={`flex-1 py-3 font-bold rounded-lg ${
                    activeTab === "details" ? "bg-red-900" : "bg-gray-800"
                  }`}
                  onClick={() => setActiveTab("details")}
                >
                  MORE DETAILS
                </button>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-6">
              {activeTab === "about" && (
                <div>
                  <h3 className="font-bold mb-2">Cast</h3>
                  <p className="text-gray-400 mb-4">
                    Lorem ipsum dolor Sit Amet, Consectetur Adipiscing Elit. Sed
                    Leo Brewer volutpat. Praesent consectetur vulputate
                    pulvinar, gravida id quam. Et Duis Aute Irure Dolor.
                  </p>

                  <h3 className="font-bold mb-2">Rating</h3>
                  <p className="text-gray-400">
                    Fugiat nulla dolor Sit Amet, Consectetur Adipiscing Elit.
                    Sed Leo Brewer volutpat. Praesent consectetur vulputate
                    pulvinar, gravida id quam. Et Duis Aute Irure Dolor.
                  </p>
                </div>
              )}

              {activeTab === "details" && (
                <div>
                  <h3 className="font-bold mb-2">Release Information</h3>
                  <p className="text-gray-400 mb-4">
                    Released on August 16, 2024 in theaters worldwide.
                  </p>

                  <h3 className="font-bold mb-2">Runtime</h3>
                  <p className="text-gray-400">1 hour and 52 minutes</p>
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default MoviePg;
