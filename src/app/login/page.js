"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

function PasswordInput({ value, setValue, placeholder }) {
  const [show, setShow] = useState(false);
  const inputRef = useRef(null);

  const toggleShow = () => {
    setShow(!show);
    setTimeout(() => inputRef.current?.focus(), 10); // keep cursor in input
  };

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        autoComplete="current-password"
        className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 pr-10"
        required
      />
      <button
        type="button"
        onClick={toggleShow}
        className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Replace with your real PHP backend endpoint
  const API_URL = "api/login";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/dashboard";
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 relative">
        {/* Logo at top-left */}
        {/* Logo at top-center */}
<img
  src="/remilogo.jpeg"
  alt="Remi Foundation Logo"
  className="w-20 h-20 mx-auto mb-4 object-contain"
/>


        {/* Header */}
        <h2 className="text-3xl font-bold text-center text-green-600 mb-6 mt-4">
          Welcome Back
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Log in to your Remi Oseni Foundation account
        </p>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-2">
              Password
            </label>
            <PasswordInput
              value={password}
              setValue={setPassword}
              placeholder="********"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="h-4 w-4 text-green-500" />
              <span className="text-gray-700 text-sm">Remember me</span>
            </label>
            <Link href="#" className="text-green-600 text-sm hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Register link */}
        <p className="text-center text-gray-700">
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="text-green-600 font-medium hover:underline"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
