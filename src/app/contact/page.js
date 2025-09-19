// app/contact/page.js
"use client";

import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen py-16 px-6">
      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-12 text-green-800 drop-shadow-lg">
        📍 Contact & Locations
      </h1>

      {/* Distribution Centers */}
      <div className="grid md:grid-cols-3 gap-8 mb-20">
        {[
          {
            title: "Bodija Market Center",
            address: "15 Bodija Market Road, Bodija, Ibadan",
            phone: "08067542314",
            hours: ["Mon-Fri: 8AM-5PM", "Saturday: 9AM-2PM", "Sunday: Closed"],
          },
          {
            title: "UI Gate Distribution Point",
            address: "25 University of Ibadan Gate, Sango, Ibadan",
            phone: "08012345679",
            hours: ["Mon-Fri: 8AM-5PM", "Saturday: 9AM-2PM", "Sunday: Closed"],
          },
          {
            title: "Challenge Community Center",
            address: "45 Challenge Main Road, Challenge, Ibadan",
            phone: "08012345680",
            hours: ["Mon-Fri: 8AM-5PM", "Saturday: Closed", "Sunday: Closed"],
          },
        ].map((center, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
          >
            <h2 className="text-2xl font-bold text-green-700 mb-3">
              {center.title}
            </h2>
            <p className="text-gray-600 mb-2">{center.address}</p>
            <p className="text-green-600 font-semibold mb-4">{center.phone}</p>
            <ul className="text-sm text-gray-500 space-y-1">
              {center.hours.map((h, i) => (
                <li key={i}>📅 {h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Get in Touch */}
      <h2 className="text-4xl font-bold text-center mb-10 text-green-700">
        💬 Get in Touch with us
      </h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              📞 Phone Support
            </h3>
              <p className="text-green-700 font-bold text-2xl flex items-center gap-2">
    +234 806 754 2198
  </p>
            <p className="text-sm text-gray-500">Mon-Fri 8AM-5PM</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              📧 Email Support
            </h3>
            <a 
  href="mailto:support@remiosenifoundation.org"
  className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left"
>
  support@remiosenifoundation.org
</a>

            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              🏢 Main Office
            </h3>
            <p className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left">Ibadan, Oyo State, Nigeria</p>
            <p className="text-sm text-gray-500">Mon-Fri 8AM-5PM</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              🚨 Emergency Contact
            </h3>
            <a 
  href="mailto:support@remiosenifoundation.org"
  className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left"
>
  support@remiosenifoundation.org
</a>
            <p className="text-sm text-gray-500">
              Urgent pickup or payment issues
            </p>
          </div>
        </div>

        {/* Quick Contact Form */}
        <form className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold text-green-700 mb-6">
            ✍️ Quick Contact
          </h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <textarea
              rows="4"
              placeholder="Message..."
              className="w-full border rounded-lg px-4 py-3 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition">
               Send Message
            </button>
          </div>
        </form>
      </div>

      {/* Footer */}
      <div className="mt-20 text-center text-gray-600">
        <p className="font-semibold text-green-700 mb-2">
          Remi Oseni Foundation
        </p>
        <p>
          For Better Life and Youth Empowerment | Affordable food & youth
          programs for families in Ibadan and Ido
        </p>
        <p className="mt-4 text-sm">
          © 2025 Remi Oseni Foundation. All rights reserved.
        </p>
      </div>
    </div>
  );
}