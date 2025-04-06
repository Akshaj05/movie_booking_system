import React, { use } from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../CreateClient.js";
import { useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Movie = () => {
  //Fetching the movie data from the database
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
  return;
  <>
    <Link to="/movie/${movieinfo.m-name}">
      <div className="min-w-[45vw] min-h-[15vh] lg:min-w-[20vw] max-w-[20vw] lg:min-h-[25vh] lg:max-h-[49vh] bg-[#2C2E33] rounded-xl mx-auto">
        <img
          src={movieinfo.m_img}
          className="rounded-t-xl lg:h-[25vh] lg:w-[20vw] h-[15vh] w-[20vw]"
        ></img>
        <div className="flex flex-col justify-center items-center mt-2">
          <h1 className="text-white font-mono font-[450] text-[1.5rem] text-center tracking-wide drop-shadow-2xl">
            {movieinfo.m_name}
          </h1>
        </div>
      </div>
    </Link>
  </>;
};

export default Movie;
