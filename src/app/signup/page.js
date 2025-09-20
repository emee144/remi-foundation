"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // 👈 import router
import { Eye, EyeOff } from "lucide-react";

export default function Signup() {
  const router = useRouter(); // 👈 initialize router
  const [form, setForm] = useState({
    nin: "",
    surname: "",
    otherNames: "",
    address: "",
    lga: "",
    phone: "",
    gender: "",
    ageRange: "",
    occupation: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "nin" || name === "phone") {
      const digits = value.replace(/\D/g, "").slice(0, 11);
      setForm({ ...form, [name]: digits });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        // ✅ redirect after signup
        router.push("/login");
      } else {
        setMessage(data.error || data.message || "Signup failed. Try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl max-w-lg w-full space-y-6"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-green-500">
          Welcome to Remi Oseni Foundation
        </h1>
        <p className="text-center text-gray-600">
          Please fill in your details to register
        </p>

        {[
          { name: "nin", placeholder: "NIN (11 digits max)" },
          { name: "surname", placeholder: "Surname" },
          { name: "otherNames", placeholder: "Other Names" },
          { name: "address", placeholder: "Address" },
          { name: "lga", placeholder: "LGA of Residence" },
          { name: "phone", placeholder: "Phone Number (11 digits max)", type: "tel" },
          { name: "email", placeholder: "Email", type: "email" },
          { name: "occupation", placeholder: "Occupation" },
        ].map((field) => (
          <input
            key={field.name}
            type={field.type || "text"}
            name={field.name}
            placeholder={field.placeholder}
            value={form[field.name]}
            onChange={handleChange}
            maxLength={field.name === "nin" || field.name === "phone" ? 11 : undefined}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-900"
            required
          />
        ))}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 placeholder-gray-500 text-gray-900"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>

        <select
          name="ageRange"
          value={form.ageRange}
          onChange={handleChange}
          className="w-full p-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 text-gray-900"
          required
        >
          <option value="">Select Age Range</option>
          <option value="25-40">25-40</option>
          <option value="41-60">41-60</option>
          <option value="61+">61 and above</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-yellow-400 to-green-500 text-white p-4 rounded-lg font-bold hover:opacity-90 transition"
        >
          {loading ? "Signing up..." : "Signup"}
        </button>

        {message && (
          <p className="text-center mt-4 text-sm text-gray-700">{message}</p>
        )}

        <p className="text-center text-gray-600">
          Already signed up?{" "}
          <Link
            href="/login"
            className="text-yellow-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
