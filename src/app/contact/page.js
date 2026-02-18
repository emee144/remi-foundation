"use client";

import Image from "next/image";

export default function ContactPage() {
  
  const centers = [
 {
      name: "Ibadan Office",
      address:
        "REMI OSENI HOUSE, Carpenter Bus Stop, beside Vanguard Pharmacy, Ologuneru Eruwa Road, Ologuneru, Ibadan.",
      phone: ["08086107144", "09051824664"],
      hours: ["Mon-Fri: 9AM-4PM", "Saturday: 10AM-3PM", "Sunday: Closed"],
    },
    {
      name: "Lagos Office",
      address:
        "13, Ajanaku Street, Opebi-Allen, Salvation Bus Stop, Lagos State, Nigeria.",
      phone: ["08065126192"],
      hours: ["Mon-Fri: 9AM-4PM", "Saturday: 10AM-3PM", "Sunday: Closed"],
    },
  ];

  return (
    
    <div className="bg-gradient-to-br from-green-50 to-yellow-50 min-h-screen py-16 px-6">
    
        <Image
    src="/remilogo.jpeg"
    alt="Remi Foundation Logo"
    width={112}      
    height={112}    
    className="mx-auto mb-6 object-contain"
/>

    
      <h1 className="text-5xl font-extrabold text-center mb-12 text-green-800 drop-shadow-lg">
        Contact
      </h1>

     
      <div className="grid md:grid-cols-2 gap-8 mb-20">
        {centers.map((center, idx) => (
  <div
    key={idx}
    className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition duration-300"
  >
    <h2 className="text-2xl font-bold text-green-700 mb-3">
      {center.name}
    </h2>
    <p className="text-gray-600 mb-2">{center.address}</p>

    {center.phone && (
      <div className="text-green-600 font-semibold mb-4">
        {center.phone.map((num, i) => (
          <p key={i}>{num}</p>
        ))}
      </div>
    )}

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
              09051824664
            </p>
            <p className="text-sm text-gray-500">Mon-Fri 9AM-4PM</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              📧 Email Support
            </h3>
            <a
              href="mailto:remiosenifoundationibadan@gmail.com"
              className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left"
            >
              remiosenifoundationibadan@gmail.com
            </a>
            <p className="text-sm text-gray-500">Response within 24 hours</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-green-700 mb-2">
              Main Office
            </h3>
            <p className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left">
              Ibadan, Oyo State, Nigeria
            </p>
            <p className="text-sm text-gray-500">Mon-Fri 9AM-4PM</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition">
            <h3 className="text-xl font-bold text-red-600 mb-2">
              Emergency Contact
            </h3>
            <a
  href="tel:09051824668"
  className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left"
>
  0905 182 4668
</a>

<a
  href="tel:08086107144"
  className="block text-2xl font-extrabold text-green-600 hover:text-blue-800 transition text-left"
>
  0808 610 7144
</a>

            <p className="text-sm text-gray-500">
              Urgent pickup or payment issues
            </p>
          </div>
        </div>

        {/* Quick Contact Form */}
        <form className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition">
          <h3 className="text-2xl font-bold text-green-700 mb-6">
            Quick Contact
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
    
    </div>
  );
}
