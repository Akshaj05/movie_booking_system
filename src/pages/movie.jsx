import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { supabase } from "../CreateClient.js";

const MoviePg = () => {
  const [activeTab, setActiveTab] = useState("about");
  const { m_id } = useParams();
  const [movieinfo, setMovieInfo] = useState(null);

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
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        <main className="flex flex-col gap-17 px-6 py-4">
          <div className="flex flex-row justify-center gap-[5vw] items-center">
            {/* Left Column - Info */}
            <div className="md:w-1/2 flex flex-col gap-6">
              <div>
                <h1 className="text-4xl font-bold mb-4">{movieinfo.m_name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <span className="px-2 py-1 bg-red-900 text-xs rounded">
                    {movieinfo.m_genres}
                  </span>
                  <span className="text-gray-400">{movieinfo.age_rating}</span>
                  <span className="text-yellow-400 font-semibold">
                    ⭐ {movieinfo.rating}/10
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{movieinfo.m_desc}</p>
                <button className="bg-red-900 hover:bg-red-800 text-white font-bold py-2 px-6 rounded flex items-center">
                  BUY TICKETS
                </button>
              </div>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-4">CAST</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-gray-300">
                  {movieinfo.cast?.split(",").map((actor, i) => (
                    <h1 key={i}>{actor.trim()}</h1>
                  ))}
                </div>
              </section>
            </div>

            {/* Right Column - Poster */}
            <div>
              <img
                src={movieinfo.m_image}
                alt={`${movieinfo.m_name} poster`}
                className="w-[20vw] rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Tabs */}
          <section className="mb-8 w-[70vw] mx-auto items-center">
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

            <div className="bg-gray-800 rounded-lg p-6">
              {activeTab === "about" && (
                <div className="text-gray-300 space-y-4">
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
                <div className="text-gray-300 space-y-4">
                  <div>
                    <h3 className="font-bold mb-1">Year</h3>
                    <p>{movieinfo.m_year}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Runtime</h3>
                    <p>{movieinfo.m_length}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Age Rating</h3>
                    <p>{movieinfo.age_rating}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default MoviePg;
