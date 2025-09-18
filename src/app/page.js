"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const navLinks = [
    { name: "Shop", href: "#" },
    { name: "Products", href: "products" },
    { name: "Eligibility", href: "/eligibility" },
  ];

  const handleLogin = () => router.push("/login");
  const handleSignup = () => router.push("/signup");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-white shadow-md">
        <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-4 md:mb-0">
          Remi Oseni Foundation
        </div>
        <nav className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6">
          {navLinks.map((link, i) => (
            <Link key={i} href={link.href}>
              <div className="px-5 py-3 bg-yellow-600 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
                {link.name}
              </div>
            </Link>
          ))}
        </nav>
        <div className="flex gap-3 mt-4 md:mt-0">
          <button
            onClick={handleLogin}
            className="bg-gray-500 text-white border px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="bg-gray-500 text-white px-5 py-2 rounded-lg hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-col md:flex-row items-center justify-between px-8 py-20 flex-grow">
        {/* Text Section */}
        <div className="max-w-2xl">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            <span className="text-orange-500">Welcome to Remi Oseni Foundation</span>
          </h1>
          <p className="mt-4 text-gray-700 text-lg md:text-xl">
            Empowering youth and families through food support and community programs in Ibadan, Oyo State.
          </p>

          <div className="mt-8 flex gap-6">
            <button
              onClick={handleSignup}
              className="bg-yellow-600 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Get Started Today
            </button>
            <button
              onClick={() => {}}
              className="bg-orange-500 text-white border px-8 py-4 rounded-lg hover:bg-gray-100 transition"
            >
              View Products
            </button>
          </div>

          <p className="mt-4 text-gray-700">
            Already signed up?{" "}
            <span
              onClick={handleLogin}
              className="text-orange-500 font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>

        {/* Graphic Section */}
        <div className="mt-12 md:mt-0 relative w-full max-w-lg flex justify-center">
          <div className="w-[420px] h-[420px] bg-gradient-to-r from-orange-300 to-yellow-200 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group animate-pulse-slow">
            {/* Circular Image */}
            <Image
              src="/remi.webp"
              alt="Remi Oseni Foundation"
              width={400}
              height={400}
              className="rounded-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 px-8 py-6 flex justify-between items-center shadow-md">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <Link href="/location">
            <div className="px-5 py-3 bg-yellow-600 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
              locations
            </div>
          </Link>
          <Link href="/contact">
            <div className="px-5 py-3 bg-yellow-600 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
              Contact Us
            </div>
          </Link>
        </div>

        <div className="px-5 py-3 bg-white shadow-md rounded-lg text-gray-700">
          <p className="font-semibold">Contact Info</p>
          <p>+234 801 234 0000</p>
          <p>Ibadan, Oyo State, Nigeria</p>
          <p>Email: info@remiosenifoundation.org</p>
        </div>
      </footer>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
