import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { supabase } from "../CreateClient.js";

const Booking = () => {
  const navigate = useNavigate();
  const { m_id } = useParams();
  const [movieinfo, setMovieInfo] = useState(null);
  const [showTimings, setShowTimings] = useState([]);
  const [selectedTiming, setSelectedTiming] = useState(null);
  const [occupiedSeats, setOccupiedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [user, setUser] = useState(null);
  const [bookingStatus, setBookingStatus] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch movie info
  async function fetchMovieInfo(m_id) {
    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .eq("m_id", m_id);

    if (error) {
      console.error("Error fetching movie:", error);
      return;
    }

    if (data.length > 0) {
      setMovieInfo(data[0]);
    }
  }

  // Fetch show timings for the selected movie
  async function fetchShowTimings(m_id) {
    const { data, error } = await supabase
      .from("show_timings")
      .select("*")
      .eq("m_id", m_id);

    if (error) {
      console.error("Error fetching show timings:", error);
      return;
    }

    setShowTimings(data);
  }

  // Fetch all seats and mark which ones are occupied for the selected show timing
  async function fetchSeats(st_id) {
    try {
      // First, get all seats from the database
      const { data: allSeats, error: seatsError } = await supabase
        .from("seats")
        .select("*")
        .order("seat_number");

      if (seatsError) throw seatsError;

      // Get bookings for this show timing
      const { data: bookings, error: bookingsError } = await supabase
        .from("booking")
        .select("b_id")
        .eq("st_id", st_id);

      if (bookingsError) throw bookingsError;

      let occupiedSeatIds = [];

      if (bookings && bookings.length > 0) {
        // Get all booking_seats entries for these bookings
        const b_ids = bookings.map((booking) => booking.b_id);

        const { data: bookedSeats, error: bookedSeatsError } = await supabase
          .from("booking_seats")
          .select("s_id")
          .in("b_id", b_ids);

        if (bookedSeatsError) throw bookedSeatsError;

        // Extract the s_id values
        occupiedSeatIds = bookedSeats.map((bs) => bs.s_id);
      }

      // Mark each seat as occupied or not
      const seatsWithOccupancy = allSeats.map((seat) => ({
        ...seat,
        is_occupied: occupiedSeatIds.includes(seat.s_id),
      }));

      setSeats(seatsWithOccupancy);

      // Keep track of which seats are occupied for double-booking prevention
      const occupiedSeatNumbers = allSeats
        .filter((seat) => occupiedSeatIds.includes(seat.s_id))
        .map((seat) => seat.seat_number);

      setOccupiedSeats(occupiedSeatNumbers);
    } catch (error) {
      console.error("Error fetching seats:", error);
      setSeats([]);
      setOccupiedSeats([]);
    }
  }

  // Handle seat selection
  const toggleSeatSelection = (seat) => {
    if (seat.is_occupied) return; // Can't select already occupied seats

    // Check if seat is already selected
    const seatIndex = selectedSeats.findIndex((s) => s.s_id === seat.s_id);

    if (seatIndex > -1) {
      // Remove seat from selection
      const updatedSeats = [...selectedSeats];
      updatedSeats.splice(seatIndex, 1);
      setSelectedSeats(updatedSeats);
    } else {
      // Add seat to selection if less than 10 seats are selected
      if (selectedSeats.length < 10) {
        setSelectedSeats([...selectedSeats, seat]);
      } else {
        alert("You can select a maximum of 10 seats.");
      }
    }
  };

  // Calculate total price whenever selectedSeats changes
  useEffect(() => {
    const price = selectedSeats.reduce((total, seat) => total + seat.price, 0);
    setTotalPrice(price);
  }, [selectedSeats]);

  // Handle timing selection
  const selectTiming = (timing) => {
    setSelectedTiming(timing);
    fetchSeats(timing.st_id);
    // Reset selections when changing timing
    setSelectedSeats([]);
  };

  // Modified confirm booking process to prevent race conditions
  const confirmBooking = async () => {
    if (selectedSeats.length === 0) {
      alert("Please select at least one seat.");
      return;
    }

    if (!user) {
      alert("Please log in to book tickets.");
      return;
    }

    // Check if user has enough balance
    if (user.balance < totalPrice) {
      setBookingStatus(
        "Insufficient balance. Please add funds to your account."
      );
      return;
    }

    try {
      setIsProcessing(true);
      setBookingStatus("Processing your booking...");

      // Check if seats are still available by re-fetching
      await fetchSeats(selectedTiming.st_id);

      // Check if any of our selected seats have been booked while we were deciding
      const anyNewlyOccupied = selectedSeats.some((seat) =>
        seats.some((s) => s.s_id === seat.s_id && s.is_occupied)
      );

      if (anyNewlyOccupied) {
        setBookingStatus(
          "Sorry, one or more of your selected seats has been booked by someone else. Please choose different seats."
        );
        setIsProcessing(false);
        setSelectedSeats([]);
        return;
      }

      // 1. Create a new booking record
      const { data: bookingData, error: bookingError } = await supabase
        .from("booking")
        .insert([
          {
            st_id: selectedTiming.st_id,
            u_id: user.u_id,
            price: totalPrice,
          },
        ])
        .select();

      if (bookingError) throw bookingError;

      const b_id = bookingData[0].b_id;

      // 2. Add entries to booking_seats table
      const bookingSeatsData = selectedSeats.map((seat) => ({
        b_id: b_id,
        s_id: seat.s_id,
      }));

      const { error: bookingSeatsError } = await supabase
        .from("booking_seats")
        .insert(bookingSeatsData);

      if (bookingSeatsError) throw bookingSeatsError;

      // 3. Update user's balance
      const { error: updateUserError } = await supabase
        .from("users")
        .update({ balance: user.balance - totalPrice })
        .eq("u_id", user.u_id);

      if (updateUserError) throw updateUserError;

      // Update local user data
      setUser({
        ...user,
        balance: user.balance - totalPrice,
      });

      // Update localStorage
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user,
          balance: user.balance - totalPrice,
        })
      );

      setBookingStatus("Booking successful! Your booking ID is: " + b_id);
      setSelectedSeats([]);
      setTotalPrice(0);

      // Refresh the seats to show updated availability
      fetchSeats(selectedTiming.st_id);
    } catch (error) {
      console.error("Error during booking:", error);
      setBookingStatus("An error occurred during booking: " + error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Load user data from localStorage
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  // Load movie info and show timings when component mounts
  useEffect(() => {
    if (m_id) {
      fetchMovieInfo(m_id);
      fetchShowTimings(m_id);
    }
  }, [m_id]);

  if (!movieinfo) {
    return (
      <div className="text-white flex justify-center items-center h-screen bg-gray-900">
        Loading booking information...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col min-h-screen bg-[#101216] text-white">
        <main className="flex flex-col gap-8 px-6 py-4">
          {/* Movie info banner */}
          <div className="max-w-[90vw] mx-auto bg-gray-800/50 p-4 rounded-lg">
            <div className="flex items-center gap-6">
              <img
                src={movieinfo.m_image}
                alt={movieinfo.m_name}
                className="h-32 rounded-md"
              />
              <div>
                <h1 className="text-2xl font-bold">{movieinfo.m_name}</h1>
                <p className="text-gray-400">
                  {movieinfo.m_length} • {movieinfo.m_genres}
                </p>
              </div>
            </div>
          </div>

          {/* Booking section */}
          <div className="max-w-[90vw] mx-auto mb-10 bg-gray-800 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Book Tickets</h2>

            {/* User Balance */}
            {user ? (
              <div className="mb-6 p-3 bg-gray-700 rounded-lg">
                <p>
                  Your Balance:{" "}
                  <span className="font-bold">₹{user.balance}</span>
                </p>
              </div>
            ) : (
              <div className="mb-6 p-3 bg-red-900/50 rounded-lg">
                <p>Please log in to book tickets</p>
              </div>
            )}

            {/* Show Timings */}
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-4">Select a Show Time</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {showTimings.length > 0 ? (
                  showTimings.map((timing) => (
                    <button
                      key={timing.st_id}
                      onClick={() => selectTiming(timing)}
                      className={`p-3 rounded-md ${
                        selectedTiming && selectedTiming.st_id === timing.st_id
                          ? "bg-red-900 text-white"
                          : "bg-gray-700 hover:bg-gray-600"
                      }`}
                    >
                      {timing.timing}
                    </button>
                  ))
                ) : (
                  <p>No show times available for this movie</p>
                )}
              </div>
            </div>

            {/* Seat Selection */}
            {selectedTiming && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">
                  Select Your Seats
                </h3>
                <p className="mb-4 text-sm text-gray-400">
                  You can select up to 10 seats. Selected seats:{" "}
                  {selectedSeats.length}
                </p>

                {/* Theatre layout */}
                <div className="mb-8">
                  {/* Screen */}
                  <div className="w-3/4 h-8 mx-auto mb-10 bg-gray-400 rounded-lg flex items-center justify-center text-gray-800 font-bold">
                    SCREEN
                  </div>

                  {/* Seat map */}
                  <div className="grid grid-cols-10 gap-2 mb-6">
                    {seats.map((seat) => (
                      <button
                        key={seat.s_id}
                        onClick={() => toggleSeatSelection(seat)}
                        disabled={seat.is_occupied}
                        className={`p-2 text-xs rounded 
                        ${
                          seat.is_occupied
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : selectedSeats.some((s) => s.s_id === seat.s_id)
                            ? "bg-green-600 text-white"
                            : "bg-gray-700 hover:bg-gray-600"
                        }`}
                        title={`${seat.category} - ₹${seat.price}`}
                      >
                        {seat.seat_number}
                      </button>
                    ))}
                  </div>

                  {/* Seat legend */}
                  <div className="flex justify-center space-x-6 mb-6 text-sm">
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-700 mr-2"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-green-600 mr-2"></div>
                      <span>Selected</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-gray-600 mr-2"></div>
                      <span>Occupied</span>
                    </div>
                  </div>
                </div>

                {/* Selected seats summary */}
                {selectedSeats.length > 0 && (
                  <div className="mb-8 p-4 bg-gray-700 rounded-lg">
                    <h4 className="font-semibold mb-2">Selected Seats:</h4>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedSeats.map((seat) => (
                        <span
                          key={seat.s_id}
                          className="px-2 py-1 bg-green-900 rounded text-sm"
                        >
                          {seat.seat_number} (₹{seat.price})
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between font-bold">
                      <span>Total:</span>
                      <span>₹{totalPrice}</span>
                    </div>
                  </div>
                )}

                {/* Booking status message */}
                {bookingStatus && (
                  <div
                    className={`p-4 rounded-lg mb-6 ${
                      bookingStatus.includes("successful")
                        ? "bg-green-900/50"
                        : bookingStatus.includes("Processing")
                        ? "bg-yellow-900/50"
                        : "bg-red-900/50"
                    }`}
                  >
                    {bookingStatus}
                  </div>
                )}

                {/* Confirm booking button */}
                <button
                  onClick={confirmBooking}
                  disabled={selectedSeats.length === 0 || isProcessing}
                  className={`w-full py-3 rounded-lg font-bold ${
                    selectedSeats.length === 0 || isProcessing
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-red-900 hover:bg-red-800"
                  }`}
                >
                  {isProcessing
                    ? "Processing..."
                    : `Confirm Booking (₹${totalPrice})`}
                </button>
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Booking;
