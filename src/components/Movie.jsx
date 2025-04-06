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
  const { movieid } = useParams();
  console.log(movieid);

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
    <Link to="/movie/:movieid">
      <div className="bg-[#101216] w-[20vw] h-[30vh] rounded-lg flex flex-col justify-center items-center">
        <img
          src={movieinfo[movieid].m - image}
          className="rounded-lg w-[20vw] h-[30vh]"
        ></img>
        <div className="text-white font-mono font-[450] text-[1.5rem] text-center mb-7 tracking-wide drop-shadow-2xl">
          {movieinfo[movieid].m - name}
        </div>
      </div>
    </Link>
  </>;
};

export default Movie;
