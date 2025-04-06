import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { supabase } from "../CreateClient.js";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Profile = () => {
  const { uid } = useContext(UserContext); // Retained for potential future use

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone_no: "",
    balance: 0,
  });

  const [addBalance, setAddBalance] = useState(0);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetchUserInfo();
  }, []);

  // Load user data from local storage
  async function fetchUserInfo() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUserInfo({
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        balance: user.balance || 0,
      });
    }
  }

  // Handle balance addition
  async function handleAddBalance() {
    if (!password) {
      setError("Please enter your password for verification.");
      return;
    }

    // Fetch stored password using email
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("password")
      .eq("email", userInfo.email)
      .single();

    if (fetchError || !data) {
      console.error("Error fetching user:", fetchError);
      setError("Failed to fetch user data. Please try again.");
      return;
    }

    // Compare passwords
    if (data.password.trim() !== password.trim()) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // Proceed to update balance
    const newBalance = userInfo.balance + parseFloat(addBalance);
    const { error: updateError } = await supabase
      .from("users")
      .update({ balance: newBalance })
      .eq("email", userInfo.email);

    if (updateError) {
      setError("Failed to update balance. Please try again.");
    } else {
      // Update local state and localStorage
      const updatedUser = { ...userInfo, balance: newBalance };
      setUserInfo(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      setAddBalance(0);
      setPassword("");
      setError("");
    }
  }

  return (
    <div className="bg-[#101216] text-white min-h-screen flex flex-col">
      <NavBar />
  
      <div className="flex-grow px-4 py-8 md:px-12 w-full text-left">
        <h2 className="text-2xl font-semibold mb-8">User Profile</h2>
  
        {/* User Information */}
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm text-gray-400">Name:</label>
            <p className="text-lg font-medium">{userInfo.name}</p>
          </div>
  
          <div>
            <label className="block text-sm text-gray-400">Email:</label>
            <p className="text-lg font-medium">{userInfo.email}</p>
          </div>
  
          <div>
            <label className="block text-sm text-gray-400">Phone Number:</label>
            <p className="text-lg font-medium">{userInfo.phone_no}</p>
          </div>
  
          <div>
            <label className="block text-sm text-gray-400">Current Balance:</label>
            <p className="text-lg font-semibold text-green-400">₹{userInfo.balance.toFixed(2)}</p>
          </div>
        </div>
  
        {/* Add Balance Form */}
        <div className="space-y-6 max-w-md">
          <div>
            <label className="block text-sm text-gray-300 mb-1">Add Balance:</label>
            <input
              type="number"
              value={addBalance}
              onChange={(e) => setAddBalance(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter amount to add"
            />
          </div>
  
          <div>
            <label className="block text-sm text-gray-300 mb-1">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-md bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Enter your password"
            />
          </div>
  
          {error && <p className="text-red-500 text-sm">{error}</p>}
  
          <button
            onClick={handleAddBalance}
            className="bg-red-700 hover:bg-red-800 transition-all duration-200 text-white font-bold py-3 px-6 rounded-md"
          >
            Add Balance
          </button>
        </div>
      </div>
  
      <Footer />
    </div>
  );
  
};

export default Profile;
