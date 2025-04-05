import React, { useState, useEffect, use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./CreateClient";

import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import MoviePg from "./pages/movie";

const App = () => {
  // const [users, setUsers] = useState([]);
  // console.log(users);

  // useEffect(() => {
  //   fetchUserse();
  // }, []);

  // async function fetchUserse() {
  //   const { data } = await supabase.from("users").select("*");
  //   setUsers(data);
  //   console.log(users);
  // }
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/movie" element={<MoviePg />} />
      </Routes>
    </Router>
  );
};

export default App;
