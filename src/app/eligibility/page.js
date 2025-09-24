// app/eligibility/page.js
import Image from "next/image";

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-100 via-green-50 to-yellow-100 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Top Branding with Logo */}
        <div className="text-center flex flex-col items-center">
          <Image
            src="/remilogo.jpeg"
            alt="Remi Oseni Foundation Logo"
            width={100}
            height={100}
            className="rounded-full shadow-md mb-4"
          />
          <h1 className="text-4xl font-extrabold text-green-800 drop-shadow-md tracking-wide">
            Remi Oseni Foundation
          </h1>
          <p className="text-lg text-gray-600 mt-2 font-medium">
            Empowering Communities Through Food Distribution
          </p>
        </div>

        {/* Header */}
        <div className="text-center">
          <h1 className="text-5xl font-extrabold text-green-700 drop-shadow-lg">
            PROGRAM REQUIREMENTS
          </h1>
          <div className="mt-2 w-32 h-1 bg-green-500 mx-auto rounded-full shadow-md"></div>
          <p className="text-gray-700 text-lg mt-6 max-w-2xl mx-auto">
            To participate in our food distribution program, please review the
            requirements below.
          </p>
        </div>

        {/* Eligibility Criteria */}
        <div className="bg-white shadow-2xl rounded-2xl p-10 border border-yellow-200">
          <h2 className="text-3xl font-bold text-green-700 mb-6 underline underline-offset-4 decoration-yellow-500">
            Eligibility Criteria
          </h2>

          <h3 className="text-xl font-semibold text-gray-800 mb-3">
            Personal Requirements
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Valid Nigerian National Identification Number (NIN)</li>
            <li>Age 25 years and above</li>
            <li>Resident of Ibadan, Oyo State</li>
            <li>Valid phone number for notifications</li>
          </ul>

          <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-3">
            Program Rules
          </h3>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>One purchase per household every 30 days</li>
            <li>Valid NIN slip required at pickup</li>
            <li>Order receipt must be presented</li>
            <li>Payment must be completed before pickup</li>
          </ul>
        </div>

        {/* Service Locations */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-green-700 drop-shadow-lg">
            SERVICE LOCATIONS
          </h2>
          <div className="mt-2 w-32 h-1 bg-green-500 mx-auto rounded-full shadow-md"></div>
          <p className="text-gray-700 text-lg mt-4 max-w-2xl mx-auto">
            Convenient pickup locations across Ibadan with flexible scheduling to
            serve you better.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            {
              name: "Bodija Market Center",
              address: "15 Bodija Market Road, Bodija, Ibadan",
              phone: "08012345678",
              hours: ["Mon-Fri: 8AM-5PM", "Saturday: 9AM-2PM", "Sunday: Closed"],
            },
            {
              name: "UI Gate Distribution Point",
              address: "25 University of Ibadan Gate, Sango, Ibadan",
              phone: "08012345679",
              hours: ["Mon-Fri: 8AM-5PM", "Saturday: 9AM-2PM", "Sunday: Closed"],
            },
            {
              name: "Challenge Community Center",
              address: "45 Challenge Main Road, Challenge, Ibadan",
              phone: "08012345680",
              hours: ["Mon-Fri: 8AM-5PM", "Saturday: Closed", "Sunday: Closed"],
            },
          ].map((loc, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-xl p-8 border border-green-100 transform transition duration-300 hover:-translate-y-3 hover:rotate-1 hover:scale-105 hover:shadow-2xl"
            >
              <h3 className="text-xl font-bold text-green-700 mb-2">{loc.name}</h3>
              <p className="text-gray-700">{loc.address}</p>
              <p className="text-green-600 font-bold mt-3">📞 {loc.phone}</p>
              <div className="mt-4 space-y-1 text-gray-600">
                {loc.hours.map((line, idx) => (
                  <p key={idx}>🕒 {line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
