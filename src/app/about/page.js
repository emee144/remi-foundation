"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

const sections = [
  {
    title: "Our Program",
    content: `Remi Oseni Foundation for Better Life & Youth Empowerment was founded and incorporated by Engr. Aderemi Oseni – The man made by the grace of God for service to humanity. As a humanitarian, philanthropist, and social crusader, he promotes the welfare of others by generously donating his resources, time, talent, and skills to create a better world. He stands as the voice and eyes of human dignity, alleviating the poverty of widows, orphans, youth, and women.`,
  },
  {
    title: "Our Mission",
    content: `As a communitarian, Engr. Oseni believes in doing good to make life better, easier, and meaningful. He empowers people with vocations, skills, and entrepreneurial development – with startup capital targeted at helping the poor to become self-sufficient and improve their own lives.`,
  },
  {
    title: "Education & Empowerment",
    content: `By the benevolence of God’s grace upon his life, he has helped many youths attain university education in various fields. In 2008, Engr. Oseni donated a Faculty of Engineering ICT Centre to Ibadan Polytechnic, while frequently giving scholarships to indigent students through his Student Education Support Allowance (SESA).`,
  },
  {
    title: "Our Founder",
    content: `Engr. Aderemi Oseni is God-fearing, humane, confident, competent, articulate, and a multi-faceted politician who is respected by the electorate in Oyo State and beyond. Impacting lives and making a difference is one of the reasons for his existence and why he ventured into politics.`,
  },
];

const objectives = [
  "To provide education financial aids, scholarships to brilliant but indigent students, and sponsor vocational & entrepreneurship training.",
  "To provide empowerment opportunities for Nigerian youths in entrepreneurial training, development, funding, financial aid, job creation, and mentoring.",
  "To facilitate health for all through free medical checkups, disease prevention, and collaborations with health organization.",
  "To promote human dignity & better life through community projects (SOLUDERO Projects) such as drinkable water, sanitation, public toilets, road rehabilitation, and care for widows & orphans.",
  "To foster peace building, leadership development, and good governance by raising role-model leaders through trainings, seminars, symposia, and mentoring.",
  "To serve as God’s rescue agents, defending the poor & needy through access to quality life, justice, social equality, and fairness.",
  "To provide equal access to education, career advancement, empowerment, and health for women & children, supporting happy and healthy homes in Nigeria.",
];

export default function AboutPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-50 via-yellow-50 to-green-100 py-16 px-6">
      {/* Founder Profile */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col items-center text-center mb-16"
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
            Engr. Aderemi Oseni
          </h2>
          <p className="text-green-700 font-medium mt-2">
            Founder, Remi Oseni Foundation for Better Life & Youth Empowerment
          </p>
        </motion.div>
      </motion.div>

      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", delay: 0.2 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-900 mb-4">
          About Us
        </h1>
        <p className="text-lg text-green-700 max-w-3xl mx-auto">
          At Remi Oseni Foundation for Better Life & Youth Empowerment, we
          believe in service to humanity, education, and creating opportunities
          for a brighter future.
        </p>
      </motion.div>

      {/* Full About Us Text */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-green-500"
      >
        <h2 className="text-3xl font-bold text-green-900 mb-4">Our Story</h2>
        <p className="text-gray-700 leading-relaxed mb-4">
          Remi Oseni Foundation for Better Life & Youth Empowerment was founded
          and incorporated by Engr. Aderemi Oseni – the man made by the grace of
          God for service to humanity. As a humanitarian, philanthropist, and an
          apostle of better life for all, he seeks to promote the welfare of
          others by donating his resources, time, talent, and skills to create a
          better world. He brought the voice and eyes of human dignity to the
          fight against poverty among widows, orphans, youth, and women.
        </p>
        <p className="text-gray-700 leading-relaxed mb-4">
          As a communitarian, he believes in making life better and meaningful
          by supporting people with money, skills, and entrepreneurial
          development to become self-sufficient. By God’s grace, he has helped
          many youths gain university education and donated the Faculty of
          Engineering ICT Centre to Ibadan Polytechnic in 2008. He also
          consistently provides scholarships through the Student Education
          Support Allowance (SESA).
        </p>
      </motion.div>

      {/* Objectives Accordion */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-l-4 border-green-500"
      >
        <h2 className="text-3xl font-bold text-green-900 mb-6">
          Our Vision, Mission & Core Values
        </h2>
        <div className="space-y-4">
          {objectives.map((obj, i) => (
            <div key={i} className="border rounded-lg overflow-hidden">
              <button
                onClick={() => toggleAccordion(i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium text-green-800 hover:bg-green-50"
              >
                <span>
                  {i + 1}.{" "}
                  {obj.length > 50 ? obj.substring(0, 50) + "..." : obj}
                </span>
                <span>{openIndex === i ? "−" : "+"}</span>
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="px-4 pb-3 text-gray-700 leading-relaxed bg-green-50"
                >
                  {obj}
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto mt-16">
        {sections.map((section, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            whileHover={{ y: -10, scale: 1.03 }}
            className="bg-white rounded-2xl shadow-xl p-6 border-t-4 border-green-500 cursor-pointer transition-transform"
          >
            <h2 className="text-2xl font-semibold text-green-800 mb-3">
              {section.title}
            </h2>
            <p className="text-gray-700 leading-relaxed">{section.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
