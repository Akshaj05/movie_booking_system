import React, { useState, useEffect, use } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { supabase } from "./CreateClient";
import Home from "./pages/home";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import MoviePg from "./pages/movie";
import Support from "./pages/support";
import About from "./pages/aboutus";
import Booking from "./pages/booking";
import { UserContext } from "./UserContext";
import { UserProvider } from "./UserContext";

const App = () => {
  const [uid, setUid] = useState(null);
  console.log(uid);
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
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie/:m_id" element={<MoviePg />} />
          <Route path="/booking/:m_id" element={<Booking />} />
          <Route path="/support" element={<Support />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
