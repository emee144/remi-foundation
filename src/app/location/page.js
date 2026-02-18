// app/location/page.js
"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

export default function Location() {
  const locations = [
         {
      title: "Ologuneru Center",
      address: "Carpenter bus stop, beside Vanguard Pharmacy, Ologuneru Eruwa road, Ologuneru, Ibadan",
      phone: ["09051824664", "08086107144"],
      hours: ["Mon-Fri: 9AM-4PM", "Saturday: 10AM-3PM", "Sunday: Closed"],
    },
    {
      title: "Eruwa town distribution point",
      address: "Upcoming",
      hours: ["Mon-Fri: 9AM-4PM", "Saturday: 10AM-3PM", "Sunday: Closed"],
    },
    {
      title: "Omo Adio distribution point",
      address: "Upcoming",
      hours: ["Mon-Fri: 9AM-4PM", "Saturday: 10AM-3PM", "Sunday: Closed"],
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Logo */}
        <Image
          src="/remilogo.jpeg"
          alt="Remi Foundation Logo"
          width={120}
          height={120}
          className="mx-auto mb-8 object-contain"
        />

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-green-600">
          Our Pickup Locations
        </h1>

        {/* Cards (Responsive grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 flex flex-col"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-4">
                {loc.title}
              </h2>

              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-6 h-6 text-yellow-500 mt-1" />
                <p className="text-gray-700">{loc.address}</p>
              </div>
<div className="flex items-start gap-3 mb-4">
  <Phone className="w-6 h-6 text-green-600 mt-1" />
  <ul className="text-gray-800 font-semibold space-y-1">
    {(loc.phone || []).map((num, idx) => (
      <li key={idx}>{num}</li>
    ))}
  </ul>
</div>

<div className="flex items-start gap-3">
  <Clock className="w-6 h-6 text-gray-600 mt-1" />
  <ul className="text-gray-600 space-y-1">
    {(loc.hours || []).map((h, idx) => (
      <li key={idx}>{h}</li>
    ))}
  </ul>
</div>

            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
