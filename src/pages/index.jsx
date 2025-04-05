import NavBar from "../components/Navbar.jsx";
import Movie from "../components/Movie.jsx";
import Footer from "../components/Footer.jsx";
import React from "react";
// import { useState, useEffect } from "react";

const Home = () => {
  // console.log(Api.count);
  let [games, setGames] = useState([]);
  };

  return (
    <>
      <div className="bg-[#181C24] w-full h-full">
        <NavBar />
        <div className="bg-[#101216] py-10">
          <div className="flex content-between justify-between max-w-full mx-4 lg:mx-10">
            <h1 className="font-mainFont text-2xl lg:text-3xl mt-6 lg:pt-15 lg:pl-[7.5rem] text-white font-light">
              Trending Games
            </h1>
            <a
              href="/trending"
              className="text-white font-mainFont self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
            >
              View All
            </a>
          </div>

          <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-5 flex-wrap ">
            {games.slice(0, 4).map((game) => {
              return <Game game={game} />;
            })}
          </div>
        </div>
        <div className=" py-10">
          <div className="flex content-between justify-between max-w-full mx-4 lg:mx-10">
            <h1 className="font-mainFont text-2xl lg:text-3xl mt-6 lg:mt-15  lg:pl-[7.5rem] text-white font-light">
              2023 Top Grossing Games
            </h1>
            <a
              href="/grossing"
              className="text-white font-mainFont self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
            >
              View All
            </a>
          </div>
          <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-5 flex-wrap ">
            {game2023.slice(0, 4).map((game) => {
              return <Game game={game} />;
            })}
          </div>
        </div>
        <div className="bg-[#101216] py-10">
          <div className="flex content-between justify-between max-w-full mx-4 lg:mx-10">
            <h1 className="font-mainFont text-2xl lg:text-3xl mt-6 lg:mt-15 lg:pl-[7.5rem]  text-white font-light">
              Top Rated Games
            </h1>
            <a
              href="/toprated"
              className="text-white font-mainFont self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
            >
              View All
            </a>
          </div>
          <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-5 flex-wrap ">
            {highestrated.slice(0, 4).map((game) => {
              return <Game game={game} />;
            })}
          </div>
        </div>

        <div className="flex content-between justify-between max-w-full mx-4 lg:mx-10">
          <h1 className="font-mainFont text-2xl lg:text-3xl mt-6 lg:mt-15 lg:pl-[7.5rem]  text-white font-light pt-10 pb-5">
            Game Of The Year
          </h1>
          <a
            href="/GOTY"
            className="text-white font-mainFont self-center text-[1rem] lg:text-[1.2rem] lg:pr-[7.5rem] opacity-55 font-light mt-6 lg:mt-12"
          >
            View All
          </a>
        </div>
        <div className="justify-center content-center text-[0.75rem] mt-5 gap-[1rem] p-0 pt-0  lg:gap-[rem] flex pb-20 flex-wrap ">
          {GOTY.slice(0, 4).map((game) => {
            return <Game game={game} />;
          })}
        </div>

        <Footer />
      </div>
    </>
  );

export default Home;
