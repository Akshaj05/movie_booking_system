import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../UserContext.jsx";
import { supabase } from "../CreateClient.js";

const Profile = () => {
  const { uid } = useContext(UserContext); // Fetch user ID from context
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

  async function handleAddBalance() {
    if (!password) {
      setError("Please enter your password for verification.");
      return;
    }

    // Fetch the password from the database
    const { data, error: fetchError } = await supabase
      .from("users")
      .select("password")
      .eq("id", uid)
      .single();

    if (fetchError || !data) {
      setError("Failed to fetch user data. Please try again.");
      return;
    }

    // Debug logs — remove in production
    console.log("Stored password:", `"${data.password}"`);
    console.log("Entered password:", `"${password}"`);

    if (data.password.trim() !== password.trim()) {
      setError("Incorrect password. Please try again.");
      return;
    }

    // Update balance
    const newBalance = userInfo.balance + parseFloat(addBalance);
    const { error: updateError } = await supabase
      .from("users")
      .update({ balance: newBalance })
      .eq("id", uid);

    if (updateError) {
      setError("Failed to update balance. Please try again.");
    } else {
      setUserInfo((prev) => ({ ...prev, balance: newBalance }));
      setAddBalance(0);
      setPassword("");
      setError("");

      // Update localStorage so balance is reflected on next page load
      const updatedUser = { ...userInfo, balance: newBalance };
      localStorage.setItem("user", JSON.stringify(updatedUser));
    }
  }

  return (
    <div className="bg-[#101216] text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="mb-4">
        <label className="block text-sm font-medium">Name:</label>
        <p className="text-lg">{userInfo.name}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Email:</label>
        <p className="text-lg">{userInfo.email}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Phone Number:</label>
        <p className="text-lg">{userInfo.phone_no}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Current Balance:</label>
        <p className="text-lg">₹{userInfo.balance.toFixed(2)}</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Add Balance:</label>
        <input
          type="number"
          value={addBalance}
          onChange={(e) => setAddBalance(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Enter amount to add"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          placeholder="Enter your password"
        />
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={handleAddBalance}
        className="bg-red-800 text-white font-bold py-2 px-6 rounded"
      >
        Add Balance
      </button>
    </div>
  );
};

export default Profile;
