"use client";

import { useState, useEffect } from "react";
import { ClipboardList, MapPin, Settings, User, LogOut, Home } from "lucide-react";

export default function Dashboard() {
  const [hasUploadedPic, setHasUploadedPic] = useState(false);

  useEffect(() => {
    const uploaded = localStorage.getItem("profileUploaded") === "true";
    setHasUploadedPic(uploaded);
  }, []);

  if (!hasUploadedPic) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-orange-600 mb-4">
          Upload Your Profile Picture
        </h1>
        <p className="text-gray-600 mb-6">
          Please upload your profile picture before accessing your dashboard.
        </p>
        <input type="file" accept="image/*" className="mb-4" />
        <button
          onClick={() => {
            localStorage.setItem("profileUploaded", "true");
            setHasUploadedPic(true);
          }}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          Upload & Continue
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: "My Profile",
      description: "View and edit your personal details",
      icon: <User className="w-8 h-8 text-orange-500" />,
      href: "/profile",
    },
    {
      title: "Applications",
      description: "Check your application status",
      icon: <ClipboardList className="w-8 h-8 text-green-600" />,
      href: "/applications",
    },
    {
      title: "Settings",
      description: "Update your preferences",
      icon: <Settings className="w-8 h-8 text-blue-600" />,
      href: "/settings",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Navbar */}
      <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-orange-600">
          Remi Oseni Foundation
        </h1>
        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <link href="/" className="flex items-center gap-1 hover:text-orange-500 transition">
            <Home className="w-5 h-5" /> Home
          </link>
          <link href="/applications" className="flex items-center gap-1 hover:text-orange-500 transition">
            <ClipboardList className="w-5 h-5" /> Applications
          </link>
          <link href="/settings" className="flex items-center gap-1 hover:text-orange-500 transition">
            <Settings className="w-5 h-5" /> Settings
          </link>
        </nav>
        <div className="flex items-center gap-4">
          <link
            href="/profile"
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
          >
            <User className="w-5 h-5" /> Profile
          </link>
          <button
            onClick={() => alert("Logged out!")}
            className="flex items-center gap-1 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </header>

      {/* Welcome Section */}
      <main className="flex-grow">
        <div className="max-w-6xl mx-auto mb-12 text-center mt-10 px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-orange-600">
            Welcome to Your Dashboard 
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Manage your account, check status, and access foundation services.
          </p>
        </div>

        {/* Cards Section */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6">
          {cards.map((card, i) => (
            <link
              key={i}
              href={card.href}
              className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transform transition duration-300 group max-w-md mx-auto"
            >
              <div className="flex items-center justify-center w-20 h-20 rounded-xl bg-gray-50 mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">
                {card.title}
              </h3>
              <p className="text-gray-600 text-base">{card.description}</p>
            </link>
          ))}
        </div>
      </main>
    </div>
  );
}
