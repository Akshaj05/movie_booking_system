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
        console.error("Error fetching users:", error.message);
        setStatusMessage("Failed to fetch users");
        setStatusType("error");
      }
    };

    fetchUsers();
  }, []);

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
      console.error("Error promoting user:", error.message);
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

      const { data, error } = await supabase
        .from("movies")
        .insert([
          {
            ...movieData,
            m_year: parseInt(movieData.m_year),
            rating: parseFloat(movieData.rating),
            m_length: parseInt(movieData.m_length),
            m_genres: genresArray,
          },
        ])
        .select();

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
      console.error("Error adding movie:", error.message);
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
          {/* Show Timings Section
          <div className="bg-gray-800 p-6 rounded shadow text-white placeholder:text-gray-500 mt-8">
            <h2 className="text-xl font-semibold mb-4">Add Show Timings</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setLoading(true);
                setStatusMessage("");

                const m_id = e.target.m_id.value;
                const show_time = e.target.show_time.value;

                try {
                  const { data, error } = await supabase
                    .from("showtimes")
                    .insert([{ m_id: parseInt(m_id), show_time }])
                    .select();

                  if (error) throw error;

                  setStatusMessage("Show timing added successfully");
                  setStatusType("success");
                  e.target.reset();
                } catch (error) {
                  console.error("Error adding show timing:", error.message);
                  setStatusMessage("Failed to add show timing");
                  setStatusType("error");
                } finally {
                  setLoading(false);
                }
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Movie ID
                  </label>
                  <input
                    type="number"
                    name="m_id"
                    required
                    className="w-full px-3 py-2 border rounded"
                    placeholder="Enter Movie ID"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Show Time
                  </label>
                  <input
                    type="datetime-local"
                    name="show_time"
                    required
                    className="w-full px-3 py-2 border rounded"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-4 py-2 bg-red-800 text-white rounded hover:bg-red-900 disabled:bg-green-300"
              >
                {loading ? "Adding Timing..." : "Add Show Timing"}
              </button>
            </form>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Admin;
