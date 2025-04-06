import React, { useState, useEffect } from "react";
import { supabase } from "../CreateClient.js";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";

const Admin = () => {
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [statusType, setStatusType] = useState("success");

  const [movieSearch, setMovieSearch] = useState("");
  const [movieResults, setMovieResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showTiming, setShowTiming] = useState("");
  const [showTimingsList, setShowTimingsList] = useState([]);
  const [searchTimeout, setSearchTimeout] = useState(null);

  const [movieData, setMovieData] = useState({
    m_name: "",
    m_year: "",
    director: "",
    writers: "",
    cast: "",
    rating: "",
    age_rating: "",
    m_image: "",
    m_length: "",
    m_desc: "",
    m_genres: "",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data, error } = await supabase
          .from("users")
          .select("u_id, email, user_type");

        if (error) throw error;
        setUsers(data);
      } catch (error) {
        setStatusMessage("Failed to fetch users");
        setStatusType("error");
      }
    };

    fetchUsers();
    fetchShowTimings();
  }, []);

  const fetchShowTimings = async () => {
    try {
      const { data, error } = await supabase
        .from("show_timings")
        .select(`st_id, timing, movies (m_id, m_name)`)
        .order("timing", { ascending: true });

      if (error) throw error;
      setShowTimingsList(data);
    } catch (error) {
      setStatusMessage("Failed to fetch show timings");
      setStatusType("error");
    }
  };

  const handleMovieSearch = (e) => {
    const searchTerm = e.target.value;
    setMovieSearch(searchTerm);
    setSelectedMovie(null);

    if (searchTimeout) clearTimeout(searchTimeout);

    if (searchTerm.length > 2) {
      const timeout = setTimeout(async () => {
        try {
          const { data, error } = await supabase
            .from("movies")
            .select("m_id, m_name, m_image")
            .ilike("m_name", `%${searchTerm}%`)
            .limit(5);

          if (error) throw error;
          setMovieResults(data);
        } catch (error) {
          console.error("Error searching movies:", error.message);
        }
      }, 300);
      setSearchTimeout(timeout);
    } else {
      setMovieResults([]);
    }
  };

  const selectMovie = (movie) => {
    setSelectedMovie(movie);
    setMovieSearch(movie.m_name);
    setMovieResults([]);
  };

  const handleAddShowTiming = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    if (!selectedMovie) {
      setStatusMessage("Please select a valid movie");
      setStatusType("error");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.from("show_timings").insert([
        {
          m_id: selectedMovie.m_id,
          timing: showTiming,
        },
      ]);

      if (error) throw error;

      setStatusMessage("Show timing added successfully");
      setStatusType("success");
      setMovieSearch("");
      setShowTiming("");
      setSelectedMovie(null);
      fetchShowTimings();
    } catch (error) {
      setStatusMessage(`Failed to add show timing: ${error.message}`);
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteShowTiming = async (st_id) => {
    try {
      const { error } = await supabase
        .from("show_timings")
        .delete()
        .eq("st_id", st_id);
      if (error) throw error;
      setStatusMessage("Show timing deleted successfully");
      setStatusType("success");
      fetchShowTimings();
    } catch (error) {
      setStatusMessage("Failed to delete show timing");
      setStatusType("error");
    }
  };

  const handlePromoteUser = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const { data, error } = await supabase
        .from("users")
        .update({ user_type: 1 })
        .eq("u_id", userId)
        .select();

      if (error) throw error;

      if (data.length === 0) {
        setStatusMessage("User not found");
        setStatusType("error");
      } else {
        setStatusMessage("User promoted to admin");
        setStatusType("success");
        setUserId("");
        setUsers(
          users.map((user) =>
            user.u_id === userId ? { ...user, user_type: 1 } : user
          )
        );
      }
    } catch (error) {
      setStatusMessage("Failed to promote user");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleMovieInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({ ...movieData, [name]: value });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage("");

    try {
      const genresArray = movieData.m_genres
        .split(",")
        .map((genre) => genre.trim());

      const { error } = await supabase.from("movies").insert([
        {
          ...movieData,
          m_year: parseInt(movieData.m_year),
          rating: parseFloat(movieData.rating),
          m_length: parseInt(movieData.m_length),
          m_genres: genresArray,
        },
      ]);

      if (error) throw error;

      setStatusMessage("Movie added successfully");
      setStatusType("success");

      setMovieData({
        m_name: "",
        m_year: "",
        director: "",
        writers: "",
        cast: "",
        rating: "",
        age_rating: "",
        m_image: "",
        m_length: "",
        m_desc: "",
        m_genres: "",
      });
    } catch (error) {
      setStatusMessage("Failed to add movie");
      setStatusType("error");
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Navbar />
      <div className="bg-[#101216] mx-auto px-4 py-8">
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded ${
              statusType === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* User Management Section */}
          <div className="bg-gray-800 p-6 rounded shadow">
            <h2 className="text-xl font-semibold  text-white mb-8">
              User Management
            </h2>

            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2 text-white">
                Promote User to Admin
              </h3>
              <form onSubmit={handlePromoteUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-white">
                    User ID
                  </label>
                  <input
                    type="text"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    required
                    className="w-[25%] px-3 py-2 border rounded placeholder:text-gray-400"
                    placeholder="Enter user ID"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 disabled:bg-blue-300"
                >
                  {loading ? "Processing..." : "Promote to Admin"}
                </button>
              </form>
            </div>

            <div>
              <h3 className="text-lg font-medium mb-2 text-white">
                Current Users
              </h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y  border">
                  <thead className="bg-gray-300">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        ID
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Email
                      </th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-gray-600 divide-y text-white ">
                    {users.map((user) => (
                      <tr key={user.u_id}>
                        <td className="px-4 py-2">{user.u_id}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">
                          {user.user_type === 1 ? (
                            <span className="px-2 py-1 text-xs font-semibold text-red-600">
                              Admin
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs font-semibold text-green-600 ">
                              User
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Movie Management Section */}
          <div className="bg-gray-800 p-6 rounded shadow text-white placeholder:text-gray-500">
            <h2 className="text-xl font-semibold mb-4">Movie Management</h2>

            <h3 className="text-lg font-medium mb-2">Add New Movie</h3>
            <form onSubmit={handleAddMovie} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  ["Movie Name", "m_name", "text"],
                  ["Release Year", "m_year", "number"],
                  ["Director", "director", "text"],
                  ["Writers", "writers", "text"],
                  ["Cast", "cast", "text"],
                  ["Rating (0-10)", "rating", "number"],
                  ["Age Rating", "age_rating", "text"],
                  ["Length", "m_length", "text"],
                  ["Image URL", "m_image", "url"],
                  ["Genres (comma separated)", "m_genres", "text"],
                ].map(([label, name, type]) => (
                  <div key={name}>
                    <label className="block text-sm font-medium mb-1">
                      {label}
                    </label>
                    <input
                      type={type}
                      name={name}
                      value={movieData[name]}
                      onChange={handleMovieInputChange}
                      required
                      className="w-full px-3 py-2 border rounded"
                      placeholder={label}
                    />
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="m_desc"
                  value={movieData.m_desc}
                  onChange={handleMovieInputChange}
                  required
                  rows="4"
                  className="w-full px-3 py-2 border rounded"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 disabled:bg-green-300"
              >
                {loading ? "Adding Movie..." : "Add Movie"}
              </button>
            </form>
          </div>
          <div className="bg-gray-800 p-6 rounded shadow text-white col-span-1 lg:col-span-2 mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Show Timings Management
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-medium mb-4">
                  Add New Show Timing
                </h3>
                <form onSubmit={handleAddShowTiming} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Movie Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={movieSearch}
                        onChange={handleMovieSearch}
                        required
                        className="w-full px-3 py-2 border rounded text-gray-800"
                        placeholder="Search for a movie..."
                      />

                      {/* Search results */}
                      {movieResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-white rounded shadow-lg max-h-60 overflow-y-auto">
                          {movieResults.map((movie) => (
                            <div
                              key={movie.m_id}
                              onClick={() => selectMovie(movie)}
                              className="flex items-center p-2 hover:bg-gray-100 cursor-pointer"
                            >
                              {movie.m_image && (
                                <img
                                  src={movie.m_image}
                                  alt={movie.m_name}
                                  className="w-10 h-14 object-cover mr-2 rounded"
                                />
                              )}
                              <div className="text-gray-800">
                                {movie.m_name}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedMovie && (
                    <div className="flex items-center bg-gray-700 p-2 rounded">
                      {selectedMovie.m_image && (
                        <img
                          src={selectedMovie.m_image}
                          alt={selectedMovie.m_name}
                          className="w-12 h-16 object-cover mr-3 rounded"
                        />
                      )}
                      <div>
                        <p className="font-semibold">{selectedMovie.m_name}</p>
                        <p className="text-xs text-gray-300">
                          ID: {selectedMovie.m_id}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Show Timing
                    </label>
                    <input
                      type="datetime-local"
                      value={showTiming}
                      onChange={(e) => setShowTiming(e.target.value)}
                      required
                      className="w-full px-3 py-2 border rounded text-gray-800"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !selectedMovie}
                    className={`w-full px-4 py-2 rounded ${
                      loading || !selectedMovie
                        ? "bg-gray-500 cursor-not-allowed"
                        : "bg-red-800 hover:bg-red-900"
                    }`}
                  >
                    {loading ? "Adding Show Timing..." : "Add Show Timing"}
                  </button>
                </form>
              </div>

              <div className="text-white">
                <h3 className="text-lg font-medium mb-4">
                  Current Show Timings
                </h3>
                <div className="overflow-y-auto max-h-96">
                  <table className="min-w-full divide-y border">
                    <thead className="bg-gray-700">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">
                          Movie
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">
                          Timing
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-300 uppercase">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-600 divide-y text-white">
                      {showTimingsList.map((showTime) => (
                        <tr key={showTime.st_id}>
                          <td className="px-4 py-2">
                            {showTime.movies?.m_name || "Unknown Movie"}
                          </td>
                          <td className="px-4 py-2">
                            {new Date(showTime.timing).toLocaleString()}
                          </td>
                          <td className="px-4 py-2">
                            <button
                              onClick={() =>
                                handleDeleteShowTiming(showTime.st_id)
                              }
                              className="text-red-400 hover:text-red-300"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
