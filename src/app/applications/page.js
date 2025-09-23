'use client';
import { useState, useEffect } from "react";

export default function ApplicationsPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Calculate remaining days from purchase date
  const getDaysLeft = (purchaseDate) => {
    const now = new Date();
    const purchaseTime = new Date(purchaseDate);
    const elapsedDays = Math.floor((now - purchaseTime) / (1000 * 60 * 60 * 24));
    return Math.max(30 - elapsedDays, 0);
  };

  useEffect(() => {
    fetchPurchases();

    // Poll every 60 seconds to update days left
    const interval = setInterval(fetchPurchases, 60000);
    return () => clearInterval(interval);
  }, []);

  async function fetchPurchases() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("/api/purchases", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch purchases");

      // Sort newest first
      setPurchases(
        data.purchases.sort(
          (a, b) => new Date(b.purchaseDate) - new Date(a.purchaseDate)
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Applications</h1>

      {error && (
        <p className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</p>
      )}

      {loading ? (
        <p className="text-gray-500 text-center">Loading purchase history...</p>
      ) : purchases.length === 0 ? (
        <p className="text-gray-500 text-center">No purchases yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {purchases.map((p) => {
            const daysLeft = getDaysLeft(p.purchaseDate);
            return (
              <div
                key={p.id}
                className="bg-white rounded-xl shadow-md p-4 border-l-4 border-blue-500 hover:shadow-xl transition"
              >
                <p className="text-gray-600 font-medium">Purchase ID: {p.id}</p>
                <p className="text-gray-800 font-semibold mt-1">
                  Date: {new Date(p.purchaseDate).toLocaleString()}
                </p>
                <p className="text-green-600 font-bold mt-1">
                  Status: {p.status || "Completed"}
                </p>
                <p className="text-yellow-600 font-semibold mt-1">
                  {daysLeft > 0
                    ? `${daysLeft} day(s) left`
                    : "Expired"}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
