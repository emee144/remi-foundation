"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { title } from "process";

export default function Home() {
  const router = useRouter();

  const navLinks = [
    { name: "About Us", href: "/about" },
    { name: "Eligibility", href: "/eligibility" },
  ];

  const handleLogin = () => router.push("/login");
  const handleSignup = () => router.push("/signup");

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-500">
      {/* Navbar */}
      <header className="flex flex-col md:flex-row justify-between items-center px-8 py-6 bg-white shadow-md">
        <div className="flex items-center mb-4 md:mb-0">
          <Image
            src="/remilogo.jpeg"
            alt="Remi Logo"
            width={50}
            height={50}
            className="mr-3"
          />
          <div className="text-2xl md:text-3xl font-bold text-orange-600">
            Remi Oseni Foundation <br/>For Better Life and Youth Empowerment<br/>RC 167162
          </div>
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
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
  <span className="text-white">
    Welcome to Remi Oseni Foundation
  </span>
</h1>

<p className="mt-4 text-white text-lg md:text-xl">
  Empowering youth and families through food support and community
  programs in Ibadan, Oyo State.
</p>


          <div className="mt-8 flex gap-6">
            <button
              onClick={handleSignup}
              className="bg-orange-500 text-white px-8 py-4 rounded-lg shadow-lg hover:bg-green-600 transition"
            >
              Get Started Today
            </button>
           
          </div>

          <p className="mt-4 text-white">
            Already signed up?{" "}
            <span
              onClick={handleLogin}
              className="text-white font-semibold cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </motion.div>

        <motion.div
          className="mt-12 md:mt-0 relative w-full max-w-lg flex justify-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="w-[420px] h-[420px] bg-gradient-to-r from-orange-300 to-yellow-200 rounded-full flex items-center justify-center shadow-2xl overflow-hidden group animate-pulse-slow">
            <Image
              src="/remi.webp"
              alt="Remi Oseni Foundation"
              width={500}
              height={500}
              className="rounded-full object-cover transform transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3"
            />
          </div>
          
        </motion.div>
      </main>

      {/* Impact Section */}
      <section className="bg-white py-16 px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-12">
          Our Impact
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {[
            { number: "10,000+", label: "Meals Provided" },
            { number: "2,500+", label: "Families Supported" },
            { number: "500+", label: "Active Volunteers" },
          ].map((stat, i) => (
            <div
              key={i}
              className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <p className="text-4xl font-extrabold text-green-600">
                {stat.number}
              </p>
              <p className="mt-2 text-lg font-medium text-gray-700">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Programs Section - orange background */}
     <section className="bg-orange-500 text-white py-16 px-8">
  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
    Our Programs
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
    {[
      {
        title: "Rice",
        desc: "Nutritious rice to help fight hunger",
        img: "/rice.jpeg",
      },
      {
        title: "Vegetable Oil",
        desc: "High-quality cooking oil for families in need.",
        img: "/oil.jpeg",
      },
      {
  title: "Garri",
  desc: "Essential garri to support families with daily meals.",
  img: "/garri.jpeg",
},

      {
        title: "Palm Oil",
        desc: "Essential palm oil to support household meals.",
        img: "/palmoil.jpeg",
      },
      {
        title: "Beans",
        desc: "Nutritious beans to help fight hunger.",
        img: "/beans.jpeg",
      },
      {
        title: "Spaghetti",
        desc: "Affordable and filling spaghetti packs.",
        img: "/spaghetti.jpeg",
      },
    ].map((program, i) => (
      <div
        key={i}
        className="bg-white text-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition p-6 text-center"
      >
        <Image
          src={program.img}
          alt={program.title}
          width={400}
          height={250}
          className="rounded-xl mx-auto mb-4 object-cover"
        />
        <h3 className="text-xl font-bold">{program.title}</h3>
        <p className="mt-2">{program.desc}</p>
      </div>
    ))}
  </div>
</section>


      {/* Testimonials Section */}
      <section className="bg-orange-500 text-white py-16 px-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          What People Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {[
            {
              quote:
                "The Remi Oseni Foundation changed my life. I can now provide food for my children.",
              name: "Grace A.",
              role: "Beneficiary",
            },
            {
              quote:
                "Being part of ROFBL has changed my life. Their support gave me hope, food, and opportunities I never thought possible.",
              name: "Tunde O.",
              role: "Beneficiary",
            },
          ].map((t, i) => (
            <div
              key={i}
              className="p-6 bg-white text-gray-800 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <p className="italic mb-4">“{t.quote}”</p>
              <p className="font-semibold text-orange-600">{t.name}</p>
              <p className="text-sm text-gray-500">{t.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision, Mission, Core Values Section */}
      <section className="bg-gradient-to-r from-yellow-50 via-green-50 to-yellow-100 px-8 py-16 text-gray-800">
        <div className="max-w-7xl mx-auto space-y-12">
          <motion.div
            className="bg-white p-8 rounded-3xl shadow-xl border-l-8 border-yellow-500"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <h2 className="text-3xl font-bold text-yellow-600 mb-8 text-center">
              CORE VALUES
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "INTEGRITY",
                  desc: "Upholding honesty, transparency, and accountability in all endeavors.",
                  color: "border-orange-500",
                },
                {
                  title: "COMPASSION",
                  desc: "Serving with empathy and love for the poor, needy, and vulnerable.",
                  color: "border-pink-500",
                },
                {
                  title: "EQUITY & JUSTICE",
                  desc: "Ensuring fairness, equality, and the defense of human rights.",
                  color: "border-green-500",
                },
                {
                  title: "EMPOWERMENT",
                  desc: "Equipping individuals and communities with skills and opportunities for self-reliance.",
                  color: "border-blue-500",
                },
                {
                  title: "SERVICE TO HUMANITY",
                  desc: "Dedicating efforts to initiatives that improve lives, families, and communities.",
                  color: "border-purple-500",
                },
                {
                  title: "EXCELLENCE",
                  desc: "Delivering impactful programs with professionalism and measurable results.",
                  color: "border-yellow-500",
                },
                {
                  title: "PEACE & LEADERSHIP",
                  desc: "Promoting peaceful coexistence, good governance, and leadership development.",
                  color: "border-red-500",
                },
              ].map((value, i) => (
                <div
                  key={i}
                  className={`p-6 bg-white rounded-2xl shadow-lg border-t-4 ${value.color} hover:shadow-2xl hover:-translate-y-2 transition-transform`}
                >
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="text-center mt-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={sectionVariants}
          >
            <p className="text-2xl font-bold text-orange-500">
              ROFBL......Humanity First
            </p>
            <p className="text-2xl font-bold text-orange-500">
              ROFBL......Asoludero !!!!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      {/* Footer */}
<footer className="bg-gray-600 px-8 py-6 flex flex-col md:flex-row justify-between items-center shadow-md">
  <div className="flex flex-col md:flex-row gap-4 md:gap-6 mb-4 md:mb-0">
    <Link href="/location">
      <div className="px-5 py-3 bg-orange-500 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
        Locations
      </div>
    </Link>
    <Link href="/contact">
      <div className="px-5 py-3 bg-orange-500 text-white shadow-md rounded-lg hover:shadow-xl transition duration-300 font-medium cursor-pointer text-center">
        Contact Us
      </div>
    </Link>
  </div>

  {/* Copyright */}
  <div className="text-white font-ibold mt-4 md:mt-0">
    &copy; 2025 Remi Oseni Foundation. All rights reserved.
  </div>
  
  <div className="px-5 py-3 bg-white shadow-md rounded-lg text-gray-700 mb-4 md:mb-0">
    <p className="font-semibold">Contact Info</p>
    <p>08086107144</p>
    <p>Ibadan, Oyo State, Nigeria</p>
    <p>Email: remiosenifoundationibadan@gmail.com</p>
  </div>

</footer>


      <style jsx>{`
        @keyframes pulse-slow {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        .animate-pulse-slow {
          animation: pulse-slow 6s infinite;
        }
      `}</style>
    </div>
  );
}
