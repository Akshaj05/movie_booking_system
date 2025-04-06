import React, { useState, useEffect } from "react";
import { supabase } from "../CreateClient.js";
import NavBar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const MyBookings = () => {
  const [uid, setUid] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Load user ID from localStorage
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser && storedUser.id) {
        setUid(storedUser.id);
      } else {
        setError("User not found. Please log in.");
        setLoading(false);
      }
    } catch (e) {
      console.error("Failed to parse user from localStorage", e);
      setError("Error reading user data.");
      setLoading(false);
    }
  }, []);

  // Fetch bookings once UID is loaded
  useEffect(() => {
    if (uid) {
      fetchBookings();
    }
  }, [uid]);

  async function fetchBookings() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("booking")
        .select(`
          b_id,
          price,
          show_timings (
            timing,
            movies (
              m_name,
              m_image
            )
          )
        `)
        .eq("u_id", uid);

      if (error) {
        console.error("Supabase query error:", error);
        setError("Failed to fetch bookings.");
      } else {
        setBookings(data);
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      setError("Unexpected error. Check console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-[#101216] text-white min-h-screen flex flex-col">
      <NavBar />
      <div className="flex-grow px-4 py-8 md:px-12 w-full">
        <h2 className="text-2xl font-semibold mb-8">My Bookings</h2>

        {loading ? (
          <p className="text-gray-400">Loading your bookings...</p>
        ) : error ? (
          <p className="text-red-500 mb-4">{error}</p>
        ) : bookings.length === 0 ? (
          <p className="text-gray-400">No bookings found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <div
                key={booking.b_id}
                className="bg-gray-800 p-4 rounded-lg shadow-lg"
              >
                <img
                  src={booking.show_timings?.movies?.m_image}
                  alt={booking.show_timings?.movies?.m_name}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-bold mb-2">
                  {booking.show_timings?.movies?.m_name}
                </h3>
                <p className="text-sm text-gray-400">
                  <strong>Booking ID:</strong> {booking.b_id}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Price:</strong> ₹{booking.price}
                </p>
                <p className="text-sm text-gray-400">
                  <strong>Timing:</strong> {booking.show_timings?.timing}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default MyBookings;
