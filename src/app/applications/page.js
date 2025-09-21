"use client";
import { useState, useEffect } from "react";

export default function ApplicationsPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchases();
  }, []);

  async function fetchPurchases() {
    setFetching(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const res = await fetch("/api/purchases", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch purchases");

      // Sort newest first
      setPurchases(data.purchases.sort((a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)));
    } catch (err) {
      setError(err.message);
    } finally {
      setFetching(false);
    }
  }

  async function handlePurchase() {
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("User not logged in");

      const res = await fetch("/api/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to purchase");

      await fetchPurchases();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Check if purchase button should be disabled
  let disabled = false;
  if (purchases.length > 0) {
    const lastDate = new Date(purchases[0].purchaseDate);
    const diffDays = (new Date() - lastDate) / (1000 * 60 * 60 * 24);
    disabled = diffDays < 30;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Applications</h1>

      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 shadow-sm">{error}</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handlePurchase}
          disabled={disabled || loading}
          className={`px-6 py-3 rounded-lg font-semibold text-white transition duration-200 shadow-md ${
            disabled
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-500 to-green-500 hover:scale-105"
          }`}
        >
          {disabled ? "Wait 30 Days" : loading ? "Processing..." : "Purchase"}
        </button>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-gray-700 mb-4">History</h2>

      {fetching ? (
        <p className="text-gray-500 text-center">Loading purchases...</p>
      ) : purchases.length === 0 ? (
        <p className="text-gray-500 text-center">No purchases yet. Make your first one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchases.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition duration-200 border-l-4 border-blue-500"
            >
              <p className="text-gray-600 font-medium">Purchase ID: {p.id}</p>
              <p className="text-gray-800 mt-1 font-semibold">
                Date: {new Date(p.purchaseDate).toLocaleString()}
              </p>
              <p className="text-green-600 mt-1 font-bold">Status: {p.status || "Completed"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
