'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [access, setAccess] = useState(false);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  // Admin login
  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      setAccess(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      console.log("Frontend received users:", data.users);
      if (!res.ok) throw new Error(data.error || "Failed to fetch users");
      setAllUsers(data.users || []);
      setResults(data.users || []);
    } catch (err) {
      setSearchError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (access) fetchUsers();
  }, [access]);

  // Search functionality
  const handleSearch = async () => {
    if (!query.trim()) {
      setResults(allUsers);
      return;
    }
    setLoading(true);
    setSearchError("");
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

  // Purchase creation
  // Purchase creation
const handlePurchase = async (userId) => {
  try {
    const res = await fetch("/api/admin/purchase", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to create purchase");

    // ✅ Save purchase date immediately to localStorage
    const purchaseDate = new Date().toISOString();
    localStorage.setItem(`purchaseDate_${userId}`, purchaseDate);

    alert("Purchase created successfully!");
    fetchUsers();
  } catch (err) {
    alert(err.message);
  }
};

// Calculate days left
const getDaysLeft = (purchaseDate, userId) => {
  const now = new Date();

  // Try localStorage first
  let storedDate = localStorage.getItem(`purchaseDate_${userId}`);
  let purchaseTime;

  if (storedDate) {
    purchaseTime = new Date(storedDate);
  } else if (purchaseDate) {
    purchaseTime = new Date(purchaseDate);
    // Save to localStorage only if not already stored
    localStorage.setItem(`purchaseDate_${userId}`, purchaseTime.toISOString());
  } else {
    return 0; // No purchase, 0 days left
  }

  // Calculate elapsed days
  const elapsedMs = now - purchaseTime;
  const elapsedDays = Math.floor(elapsedMs / (1000 * 60 * 60 * 24));
  const remainingDays = Math.max(30 - elapsedDays, 0);

  console.log(
    `User ${userId} | Purchase Date: ${purchaseTime.toISOString()} | Elapsed: ${elapsedDays} | Remaining: ${remainingDays}`
  );

  return remainingDays;
};

// Periodically update days left every minute
useEffect(() => {
  const interval = setInterval(() => {
    console.log("Refreshing countdown for all users...");
    setResults(prev => [...prev]); // triggers re-render
  }, 60000);
  return () => clearInterval(interval);
}, []);


  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    hover: { scale: 1.02 },
  };

  const downloadQR = (qrCode, nin) => {
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${qrCode}`;
    link.download = `QR_${nin}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Login screen
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

  // Admin panel
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex flex-col items-center mb-6">
        <Image
          src="/remilogo.jpeg"
          alt="Remi Logo"
          width={120}
          height={120}
          className="mb-4"
        />
        <motion.h1
          className="text-4xl font-bold text-yellow-600 mb-8 text-center"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
        >
          Remi Oseni Foundation
        </motion.h1>
      </div>

      {/* Search */}
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

      {/* Users Table */}
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
                  <th className="p-3 text-left">QR Code</th>
                  <th className="p-3 text-left">NIN</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Phone</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Gender</th>
                  <th className="p-3 text-left">Purchase</th>
                </tr>
              </thead>
              <tbody>
                {results.map((user, i) => {
                  console.log("User:", user.email, "| QR Length:", user.qrCode?.length, "| Sample:", user.qrCode?.slice(0, 50));
                  const lastPurchase =
                    user.purchases.length > 0
                      ? user.purchases[user.purchases.length - 1]
                      : null;
                 const daysLeft = lastPurchase ? getDaysLeft(lastPurchase.purchaseDate, user.id) : 0;

                  const canPurchase = daysLeft === 0;

                  return (
                    <motion.tr
                      key={user.id}
                      className={`border-b hover:bg-yellow-50 transition ${
                        i % 2 === 0 ? "bg-gray-50" : ""
                      }`}
                      variants={rowVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                    >
                      <td className="p-3">
                        {user.qrCode ? (
                          <div className="flex flex-col items-center gap-2">
                            <img
  src={user.qrCode.startsWith("data:image") 
        ? user.qrCode 
        : `data:image/png;base64,${user.qrCode}`}
  alt="QR Code"
  className="w-60 h-60 rounded-lg shadow-lg object-contain"
/>
                           <div className="flex gap-2">
  <button
    onClick={() => downloadQR(user.qrCode, user.nin)}
    className="bg-green-500 hover:bg-green-600 text-white text-xs py-1 px-2 rounded"
  >
    Download
  </button>

  <button
    onClick={() => window.print()}
    className="bg-blue-500 hover:bg-blue-600 text-white text-xs py-1 px-2 rounded"
  >
    Print
  </button>
</div>

                          </div>
                        ) : (
                          <span className="text-gray-400">No QR</span>
                        )}
                      </td>
                      <td className="p-3">{user.nin}</td>
                      <td className="p-3 font-semibold">
                        {user.surname} {user.otherNames}
                      </td>
                      <td className="p-3">{user.phone}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">{user.gender}</td>
                      <td className="p-3">
                        {lastPurchase ? (
                          <span className="text-sm font-semibold">{daysLeft} day(s) left</span>
                        ) : (
                          <button
                            onClick={() => handlePurchase(user.id)}
                            disabled={!canPurchase}
                            className={`bg-yellow-500 text-white px-3 py-1 rounded font-bold hover:bg-yellow-600 transition ${
                              !canPurchase ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                          >
                            Purchase
                          </button>
                        )}
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </motion.div>
        )}
      </AnimatePresence>

      {results.length === 0 && !loading && (
        <p className="text-gray-500 text-center mt-8 text-lg">No users found.</p>
      )}
    </div>
  );
}
