import React, { useState, useEffect, use } from "react";
import { supabase } from "./CreateClient";

const App = () => {
  const [users, setUsers] = useState([]);
  console.log(users);

  useEffect(() => {
    fetchUserse();
  }, []);

  async function fetchUserse() {
    const { data } = await supabase.from("users").select("*");
    setUsers(data);
    console.log(users);
  }

  return <div></div>;
};

export default App;
