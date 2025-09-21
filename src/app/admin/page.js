"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAccess(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSearchError("");
    setResults([]);
    try {
      const res = await fetch(`/api/admin/users?search=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setResults(data.users || []);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  if (!access) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-yellow-50 via-green-50 to-yellow-100 px-4">
        <motion.div
          className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          <h1 className="text-3xl font-bold mb-6 text-yellow-600">Admin Login</h1>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 border rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
            onClick={handleLogin}
            className="w-full bg-yellow-500 text-white py-3 rounded-lg font-bold hover:bg-yellow-600 transition"
          >
            Login
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <motion.h1
        className="text-4xl font-bold text-yellow-600 mb-8 text-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        Admin Dashboard
      </motion.h1>

      <motion.div
        className="flex flex-col md:flex-row gap-4 mb-6 justify-center"
        initial="hidden"
        animate="visible"
        variants={sectionVariants}
      >
        <input
          type="text"
          placeholder="Search by NIN, phone, or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          onClick={handleSearch}
          className="bg-yellow-500 text-white px-6 py-3 rounded-lg hover:bg-yellow-600 transition font-bold"
        >
          Search
        </button>
      </motion.div>

      {loading && <p className="text-gray-600 text-center">Loading...</p>}
      {searchError && <p className="text-red-500 text-center">{searchError}</p>}

      <AnimatePresence>
        {results.length > 0 && (
          <motion.div
            className="overflow-x-auto mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <table className="min-w-full bg-white shadow-lg rounded-2xl overflow-hidden">
              <thead className="bg-yellow-500 text-white">
                <tr>
                  <th className="p-3 text-left">NIN</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">Purchases</th>
                </tr>
              </thead>
              <tbody>
                {results.map((user, i) => (
                  <motion.tr
                    key={user.id}
                    className={`border-b hover:bg-yellow-50 transition cursor-pointer ${i % 2 === 0 ? "bg-gray-50" : ""}`}
                    whileHover={{ scale: 1.01 }}
                  >
                    <td className="p-3">{user.nin}</td>
                    <td className="p-3 font-semibold">{user.surname} {user.otherNames}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.gender}</td>
                    <td className="p-3">
                      {user.purchases.length === 0 ? (
                        <span className="text-gray-400">No purchases</span>
                      ) : (
                        <table className="w-full bg-gray-50 rounded-lg">
                          <thead>
                            <tr>
                              <th className="text-left p-2 text-sm">Date</th>
                              <th className="text-left p-2 text-sm">Days Left</th>
                            </tr>
                          </thead>
                          <tbody>
                            {user.purchases.map((p, idx) => (
                              <tr key={idx} className="hover:bg-yellow-100 transition">
                                <td className="p-2 text-sm">{new Date(p.purchaseDate).toLocaleDateString()}</td>
                                <td className="p-2 text-sm font-semibold">{p.daysLeft}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {results.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8 text-lg">
          No users found.
        </p>
      )}
    </div>
  );
}
