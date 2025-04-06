import React, { useState, useEffect } from "react";
import { supabase } from "../CreateClient.js";
import { Link } from "react-router-dom";

export const SearchBar = () => {
  const [input, setInput] = useState("");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      if (input.trim() === "") {
        setMovies([]); // clear results if input is empty
        return;
      }

      const { data, error } = await supabase
        .from("movies")
        .select("*")
        .ilike("m_name", `%${input}%`);

      if (error) {
        console.error("Error fetching movies:", error.message);
      } else {
        setMovies(data);
      }
    };

    fetchMovies();
  }, [input]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex flex-col lg:w-[35vw] w-[90vw]">
        <input
          className="w-full min-h-[2.5rem] bg-white rounded-full px-4"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for movies..."
        />
        {/* Only show dropdown if input is not empty */}
        {input.trim() !== "" && movies.length > 0 && (
          <div className="absolute top-full mt-2 bg-white border rounded shadow z-10 w-full max-h-60 overflow-y-auto">
            {movies.map((movie) => (
              <Link
                key={movie.m_id}
                to={`/movie/${movie.m_id}`}
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                {movie.m_name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
