import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { supabase } from "../CreateClient.js";

const MoviePg = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { m_id } = useParams();
  const [movieinfo, setMovieInfo] = useState(null);

  // Fetch movie info
  async function fetchMovieInfo(m_id) {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("m_id", m_id);

    if (error) {
      console.error("Error fetching movie:", error);
      return;
    }

    if (data.length > 0) {
      setMovieInfo(data[0]);
    }
  }

  // Load movie info when component mounts
  useEffect(() => {
    if (m_id) {
      fetchMovieInfo(m_id);
    }
  }, [m_id]);

  if (!movieinfo) {
    return (
      <div className="text-white flex justify-center items-center h-screen bg-gray-900">
        Loading movie info...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-[#101216] text-white">
        <main className="flex flex-col px-4 sm:px-6 py-4 flex-grow">
          <div className="w-full max-w-6xl mx-auto">
            {/* Foreground content */}
            <div className="relative z-10 flex flex-col md:flex-row justify-center md:gap-8 items-center p-4 sm:p-6 rounded-2xl">
              {/* Mobile Poster (visible only on small screens) */}
              <div className="md:hidden w-full flex justify-center mb-6">
                <img
                  src={movieinfo.m_image}
                  alt={`${movieinfo.m_name} poster`}
                  className="w-48 h-auto rounded-lg shadow-lg object-cover"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Left Column - Info */}
              <div className="w-full md:w-2/3 flex flex-col gap-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-center md:text-left">
                    {movieinfo.m_name}
                  </h1>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-2 mb-4">
                    <span className="px-2 py-1 bg-red-900 text-xs rounded">
                      {movieinfo.m_genres}
                    </span>
                    <span className="text-gray-400">
                      {movieinfo.age_rating}
                    </span>
                    <span className="text-yellow-400 font-semibold">
                      ⭐ {movieinfo.rating}/10
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4 text-sm sm:text-base">
                    {movieinfo.m_desc}
                  </p>
                  <div className="flex justify-center md:justify-start">
                    <Link to={`/booking/${m_id}`}>
                      <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-6 rounded flex items-center">
                        BUY TICKETS
                      </button>
                    </Link>
                  </div>
                </div>

                <section className="mb-6">
                  <h2 className="text-xl font-bold mb-3 text-center md:text-left">
                    CAST
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-3 text-gray-300 text-center md:text-left">
                    {movieinfo.cast?.split(",").map((actor, i) => (
                      <h1 key={i} className="text-base md:text-base">
                        {actor.trim()}
                      </h1>
                    ))}
                  </div>
                </section>

                <section className="mb-6 w-full">
                  <div className="flex mb-4 items-center gap-2">
                    <button
                      className={`flex-1 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-lg ${
                        activeTab === "about" ? "bg-red-900" : "bg-gray-800"
                      }`}
                      onClick={() => setActiveTab("about")}
                    >
                      ABOUT MOVIE
                    </button>
                    <button
                      className={`flex-1 py-2 sm:py-3 text-sm sm:text-base font-bold rounded-lg ${
                        activeTab === "details" ? "bg-red-900" : "bg-gray-800"
                      }`}
                      onClick={() => setActiveTab("details")}
                    >
                      MORE DETAILS
                    </button>
                  </div>

                  <div className="bg-gray-800 rounded-lg p-4 sm:p-6">
                    {activeTab === "about" && (
                      <div className="text-gray-300 space-y-3 text-sm sm:text-base">
                        <div>
                          <h3 className="font-bold mb-1">Director</h3>
                          <p>{movieinfo.director}</p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Writers</h3>
                          <p>{movieinfo.writers}</p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Genres</h3>
                          <p>{movieinfo.m_genres}</p>
                        </div>
                      </div>
                    )}

                    {activeTab === "details" && (
                      <div className="text-gray-300 space-y-3 text-sm sm:text-base">
                        <div>
                          <h3 className="font-bold mb-1">Year</h3>
                          <p>{movieinfo.m_year}</p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Runtime</h3>
                          <p>{movieinfo.m_length} minutes</p>
                        </div>
                        <div>
                          <h3 className="font-bold mb-1">Age Rating</h3>
                          <p>{movieinfo.age_rating}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
              </div>

              {/* Right Column - Poster (hidden on small screens) */}
              <div className="hidden md:block rounded-xl shadow-lg">
                <img
                  src={movieinfo.m_image}
                  alt={`${movieinfo.m_name} poster`}
                  className="w-[20vw] max-w-[280px] h-auto rounded-lg shadow-lg object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MoviePg;
