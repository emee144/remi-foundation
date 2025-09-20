"use client";
import { useState, useEffect } from "react";

export default function ApplicationsPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchPurchases();
  }, []);

  async function fetchPurchases() {
    const res = await fetch("/api/purchases");
    const data = await res.json();
    setPurchases(data.purchases || []);
  }

  async function handlePurchase() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/purchases", { method: "POST" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to purchase");

      await fetchPurchases();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // Check if button should be disabled
  let disabled = false;
  if (purchases.length > 0) {
    const lastDate = new Date(purchases[0].purchaseDate);
    const diffDays =
      (new Date() - lastDate) / (1000 * 60 * 60 * 24);
    disabled = diffDays < 30;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Applications</h1>

      {error && <p className="text-red-500">{error}</p>}

      <button
        onClick={handlePurchase}
        disabled={disabled || loading}
        className={`mt-4 px-4 py-2 rounded ${
          disabled
            ? "bg-gray-400"
            : "bg-blue-600 hover:bg-blue-700 text-white"
        }`}
      >
        {disabled ? "Wait 30 Days" : "Purchase"}
      </button>

      <h2 className="mt-6 font-semibold">History</h2>
      <ul>
        {purchases.map((p) => (
          <li key={p.id}>
            {new Date(p.purchaseDate).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
