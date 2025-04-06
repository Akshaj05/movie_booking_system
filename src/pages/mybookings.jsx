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
      if (storedUser && storedUser.u_id) {
        setUid(storedUser.u_id);
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
      console.log("Fetching bookings for user ID:", uid);

      // First, get all bookings for this user
      const { data: bookingsData, error: bookingsError } = await supabase
        .from("booking")
        .select(
          `
          b_id,
          price,
          show_timings (
            timing,
            movies (
              m_name,
              m_image
            )
          )
        `
        )
        .eq("u_id", uid);

      if (bookingsError) throw bookingsError;

      // For each booking, fetch the associated seat information
      const bookingsWithSeats = await Promise.all(
        bookingsData.map(async (booking) => {
          // Get booking_seats entries for this booking
          const { data: seatData, error: seatError } = await supabase
            .from("booking_seats")
            .select(
              `
              s_id,
              seats:s_id (
                seat_number,
                category,
                price
              )
            `
            )
            .eq("b_id", booking.b_id);

          if (seatError) {
            console.error(
              `Error fetching seats for booking ${booking.b_id}:`,
              seatError
            );
            return {
              ...booking,
              seats: [],
            };
          }

          // Extract just the seat information we need
          const seats = seatData.map((item) => ({
            seat_number: item.seats.seat_number,
            category: item.seats.category,
            price: item.seats.price,
          }));

          return {
            ...booking,
            seats: seats,
          };
        })
      );

      console.log("Processed bookings:", bookingsWithSeats);
      setBookings(bookingsWithSeats);
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
                {booking.show_timings?.movies?.m_image && (
                  <img
                    src={booking.show_timings.movies.m_image}
                    alt={booking.show_timings?.movies?.m_name || "Movie poster"}
                    className="w-full h-40 object-cover rounded-md mb-4"
                  />
                )}
                <h3 className="text-lg font-bold mb-2">
                  {booking.show_timings?.movies?.m_name || "Unknown Movie"}
                </h3>
                <p className="text-sm text-gray-400 mb-1">
                  <strong>Booking ID:</strong> {booking.b_id}
                </p>
                <p className="text-sm text-gray-400 mb-1">
                  <strong>Price:</strong> ₹{booking.price}
                </p>
                <p className="text-sm text-gray-400 mb-3">
                  <strong>Timing:</strong>{" "}
                  {booking.show_timings?.timing || "N/A"}
                </p>

                {/* Seats information */}
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="font-semibold mb-2">Seats:</p>
                  {booking.seats && booking.seats.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {booking.seats.map((seat, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-red-900/40 rounded text-sm flex items-center"
                          title={`${seat.category || "Unknown"} - ₹${
                            seat.price || "N/A"
                          }`}
                        >
                          {seat.seat_number || "Unknown"}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      No seat information available
                    </p>
                  )}
                </div>
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
