"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const sections = [
  {
    title: "OUR PROGRAMS",
    content: `
1. REMILEKUN FOOD BANK – Free food for indigent families, orphans, and the aged.
2. ASOLUDERO FOOD MARKET – Sale of basic food items at about 60% discount for ease of purchase by the masses.
3. EDUCATIONAL SUPPORT AT ALL LEVELS – Free JAMB registration, WAEC/NECO registration for brilliant but financially incapable students, orphans, or people living with disabilities at all levels.
4. MARKET WOMEN CAPITAL ENHANCEMENT – Empowerment programs to enhance business capital for market women.
5. YOUTH DEVELOPMENT & VOCATIONAL SUPPORT – Programs to equip youths with skills and vocational training.
6. REMI OSENI MEDICALS – Free medical checkups, free drug donations to community health centres, and free glasses for aged men and women.
    `,
  },
  {
    title: "EDUCATION AND EMPOWERMENT",
    content: `By the benevolence of God’s grace upon his life, he has helped many youths attain university education in various fields. In 2008, Engr. Oseni donated a Faculty of Engineering ICT Centre to Ibadan Polytechnic, while frequently giving scholarships to indigent students through his Student Education Support Allowance (SESA).`,
  },
];

const visionMissionCore = [
  {
    title: "VISION STATEMENT",
    content:
      "To create a society where everyone has access to good food, healthcare, education (including vocational training), enhanced commerce, justice, and empowerment for a dignified quality of life.",
  },
  {
    title: "MISSION STATEMENT",
    content:
      "To transform lives by providing scholarships and vocational training, empowering youths, indigent women and families, promoting health and community development, fostering peace and leadership, and defending the rights of the poor and vulnerable for a just and equitable society.",
  },
  {
    title: "CORE VALUES",
    content: `1. INTEGRITY – Upholding honesty, transparency, and accountability in all endeavors.

2. COMPASSION – Serving with empathy and love for the poor, needy, and vulnerable.

3. EQUITY & JUSTICE – Ensuring fairness, equality, and the defense of human rights.

4. EMPOWERMENT – Equipping individuals and communities with skills and opportunities for self-reliance.

5. SERVICE TO HUMANITY – Dedicating efforts to initiatives that improve lives, families, and communities.

6. EXCELLENCE – Delivering impactful programs with professionalism and measurable results.

7. PEACE & LEADERSHIP – Promoting peaceful coexistence, good governance, and leadership development.`,
  },
];


export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    
   <div className="min-h-screen bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 pt-20 sm:pt-24 md:pt-28 px-6 relative">
  {/* Logo */}
  <Image
    src="/remilogo.jpeg"
    alt="Remi Logo"
    width={100}
    height={100}
    className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 sm:w-20 sm:h-20 w-24 h-24"
  />

  {/* Founder Card */}
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, type: "spring" }}
    className="flex flex-col items-center text-center mb-16 mt-16 sm:mt-20 md:mt-24"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-2xl shadow-xl p-6 max-w-sm border-t-4 border-green-500"
    >
      <Image
        src="/remi.jpeg"
        alt="Engr. Aderemi Oseni"
        width={160}
        height={160}
        className="mx-auto rounded-full shadow-lg mb-4 object-cover"
      />
      <h2 className="text-2xl font-bold text-green-900">
        Hon. Engr. Aderemi Abass Oseni
      </h2>
      <p className="text-green-700 font-medium mt-2">
        Founder, Remi Oseni Foundation for Better Life & Youth Empowerment. Hon. Engr. Aderemi Abass Oseni is God-fearing, humane, confident, competent, articulate, 
        and a multi-faceted politician who is respected by the electorate in Oyo State and beyond. 
        Impacting lives and making a difference is one of the reasons for his existence 
        and why he ventured into politics.
      </p>
    </motion.div>
  </motion.div>


           {/* Story Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-green-500"
      >
        <h2 className="text-3xl font-bold text-green-900 mb-4 text-center">OUR STORY</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Remi Oseni Foundation for Better Life & Youth Empowerment was founded
          and incorporated by Hon. Engr. Aderemi Abass Oseni – the man made by the grace of
          God for service to humanity. As a humanitarian, philanthropist, and an
          apostle of better life for all, he seeks to promote the welfare of
          others by donating his resources, time, talent, and skills to create a
          better world. He brought the voice and eyes of human dignity to the
          fight against poverty among widows, orphans, youth, and women.
        </p>
      </motion.div>

      {/* Our Programs - full width */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500 max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-4 text-center">
          {sections[0].title}
        </h2>
       <div className="grid gap-4 sm:grid-cols-2">
  {[
    { title: "REMILEKUN FOOD BANK", desc: "Free food for indigent families, orphans, and the aged." },
    { title: "ASOLUDERO FOOD MARKET", desc: "Sale of basic food items at about 60% discount for ease of purchase by the masses." },
    { title: "EDUCATIONAL SUPPORT AT ALL LEVELS", desc: "Free JAMB, WAEC/NECO registration for brilliant but financially incapable students, orphans, or people with disabilities." },
    { title: "MARKET WOMEN CAPITAL ENHANCEMENT", desc: "Empowerment programs to enhance business capital for market women." },
    { title: "YOUTH DEVELOPMENT & VOCATIONAL SUPPORT", desc: "Programs to equip youths with skills and vocational training." },
    { title: "REMI OSENI MEDICALS", desc: "Free checkups, drug donations to community health centres, and free glasses for the aged." },
  ].map((item, i) => (
    <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-green-800 mb-1">{item.title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>

      </motion.div>

      {/* Education & Empowerment - side by side */}
      <div className="grid md:grid-cols-1 gap-8 max-w-6xl mx-auto mb-16">
        {sections.slice(1).map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -5, scale: 1.02 }}
            className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-green-800 mb-3 text-center">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>

      {/* Core Values (full width) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        whileHover={{ y: -10, scale: 1.02 }}
        className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-600 max-w-6xl mx-auto mb-16"
      >
        <h2 className="text-3xl font-bold text-green-800 mb-4 text-center">
          {visionMissionCore[2].title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
  {[
    { title: "REMILEKUN FOOD BANK", desc: "Free food for indigent families, orphans, and the aged." },
    { title: "ASOLUDERO FOOD MARKET", desc: "Sale of basic food items at about 60% discount for ease of purchase by the masses." },
    { title: "EDUCATIONAL SUPPORT AT ALL LEVELS", desc: "Free JAMB, WAEC/NECO registration for brilliant but financially incapable students, orphans, or people with disabilities." },
    { title: "MARKET WOMEN CAPITAL ENHANCEMENT", desc: "Empowerment programs to enhance business capital for market women." },
    { title: "YOUTH DEVELOPMENT & VOCATIONAL SUPPORT", desc: "Programs to equip youths with skills and vocational training." },
    { title: "REMI OSENI MEDICALS", desc: "Free checkups, drug donations to community health centres, and free glasses for the aged." },
  ].map((item, i) => (
    <div key={i} className="bg-green-50 border border-green-200 rounded-xl p-4 hover:shadow-md transition-shadow">
      <h3 className="font-semibold text-green-800 mb-1">{item.title}</h3>
      <p className="text-gray-700 text-sm leading-relaxed">{item.desc}</p>
    </div>
  ))}
</div>

      </motion.div>

      {/* Executive Profile - Tolulope Adunola Ojelabi */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="max-w-4xl mx-auto mt-16 mb-12 bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-600 flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        {/* Image on Right for Larger Screens */}
        <div className="order-1 md:order-1">
          <Image
            src="/tolu.jpg"
            alt="Tolulope Adunola Ojelabi"
            width={200}
            height={160}
            className="rounded-full shadow-lg object-cover"
          />
        </div>

        {/* Text Content */}
        <div className="order-2 md:order-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-green-900 mb-1">
            TOLULOPE ADUNOLA OJELABI
          </h2>
          <p className="text-green-700 font-medium mb-3">
            HND, BSc, MMP, M.Phil/PhD (In view)<br/> AMNIM, AMICEN
          </p>
           <p className="text-gray-700 font-semibold mb-2">
            Programme Coordinator (Ibadan)
          </p>
          <p className="text-gray-700 leading-relaxed">
            Tolulope possesses over twenty-four years of progressive professional experience
            spanning Retail, Corporate, and Mortgage Banking, where she rose to Management level
            prior to transitioning into Academia.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            She is an accomplished Psychology lecturer, Clinical Psychologist, and Psychotherapist
            with a strong commitment to advancing Mental Health Education, Clinical Practice, and
            Psychosocial well-being.
          </p>
          <p className="text-gray-700 leading-relaxed mt-3">
            Tolulope demonstrates a high level of professionalism, empathy, and interpersonal
            sensitivity in her engagements. Her enduring passion for social responsibility is
            reflected in her dedication to improving the welfare of vulnerable, abandoned, and
            indigent children, individuals, and families within the society.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
