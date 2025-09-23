"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ClipboardList, Settings, User, LogOut, Home } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Dashboard() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profilePic, setProfilePic] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setIsLoggedIn(true);

      // ✅ Fetch profile from backend (not localStorage)
      const fetchProfile = async () => {
        try {
          const res = await fetch("/api/profile", {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });
          if (!res.ok) throw new Error("Failed to fetch profile");
          const data = await res.json();
          setProfilePic(data.profilePicture || null);
        } catch (err) {
          console.error(err);
        }
      };

      fetchProfile();
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (!isLoggedIn) return null; // Or a loading spinner

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
        <div className="flex items-center gap-4">
          {/* Profile Picture */}
          <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-orange-400">
           import Image from "next/image";

<Image
  src="/default-avatar.png"
  alt="Default Avatar"
  width={80}   // for example
  height={80}  // for example
  className="rounded-full"
/>
          </div>
          <h1 className="text-2xl font-bold text-orange-600">
            Remi Oseni Foundation
          </h1>
        </div>

        <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-orange-500 transition"
          >
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link
            href="/applications"
            className="flex items-center gap-1 hover:text-orange-500 transition"
          >
            <ClipboardList className="w-5 h-5" /> Applications
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-1 hover:text-orange-500 transition"
          >
            <Settings className="w-5 h-5" /> Settings
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="/profile"
            className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
          >
            <User className="w-5 h-5" /> Profile
          </Link>
          <button
            onClick={handleLogout}
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
            <Link
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
            </Link>
          ))}
        </div>
      </main>
      <footer className="bg-gray-500 px-8 py-6 flex flex-col md:flex-row justify-between items-center shadow-md mt-12">
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-0">
    <Link href="/location">
      <div className="px-5 py-3 bg-yellow-600 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
        Locations
      </div>
    </Link>
    <Link href="/contact">
      <div className="px-5 py-3 bg-yellow-600 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
        Contact Us
      </div>
    </Link>
  </div>
  </footer>
    </div>
  );
}
