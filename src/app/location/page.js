// app/location/page.js
"use client";

import { MapPin, Phone, Clock } from "lucide-react";
import Image from "next/image";

export default function Location() {
  const locations = [
  {
    name: "Ibadan Office",
    address:
      "REMI OSENI HOUSE, Carpenter Bus Stop, beside Vanguard Pharmacy, Ologuneru Eruwa Road, Ologuneru, Ibadan.",
    phone: ["08086107144", "09051824664"],
    hours: [
      "Mon-Fri: 9AM-4PM",
      "Saturday: 10AM-3PM",
      "Sunday: Closed",
    ],
  },
  {
    name: "Contact Us (Lagos Office)",
    address:
      "13, Ajanaku Street, Opebi-Allen, Salvation Bus Stop, Lagos State, Nigeria.",
    phone: ["+2348033040237", "+2348065126192", "+2348038398813"],
    hours: [
      "Mon-Fri: 9AM-4PM",
      "Saturday: 10AM-3PM",
      "Sunday: Closed",
    ],
  },
];

  return (
    <main className="min-h-screen bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 p-8">
      <div className="max-w-6xl mx-auto">
          <Image
  src="/remilogo.jpeg"
  alt="Remi Foundation Logo"
  width={112}   // matches w-28 (28 × 4 = 112px)
  height={112}  // matches h-28 (28 × 4 = 112px)
  className="mx-auto mb-6 object-contain"
/>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 to-green-600">
          Our Pickup Locations
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
            >
              <h2 className="text-2xl font-bold text-green-700 mb-3">{loc.name}</h2>
              
              <div className="flex items-start gap-2 mb-2">
                <MapPin className="w-5 h-5 text-yellow-500 mt-1" />
                <p className="text-gray-700">{loc.address}</p>
              </div>

              <div className="flex items-center gap-2 mb-2">
                <Phone className="w-5 h-5 text-green-600" />
                <p className="text-gray-800 font-semibold">{loc.phone}</p>
              </div>

              <div className="flex items-start gap-2">
                <Clock className="w-5 h-5 text-gray-600 mt-1" />
                <ul className="text-gray-600">
                  {loc.hours.map((h, idx) => (
                    <li key={idx}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
