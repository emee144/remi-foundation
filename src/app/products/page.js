// app/products/page.js
"use client";

import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const router = useRouter();

  const products = [
    {
      name: "Rice",
      price: "₦15,000.00",
      description:
        "Premium long grain rice - 50kg bag. Perfect for families and contains essential nutrients.",
      image: "rice.jpeg",
    },
    {
      name: "Garri",
      price: "₦3,000.00",
      description:
        "Quality yellow garri - 10kg bag. Traditional cassava product, rich in carbohydrates.",
      image: "garri.jpeg",
    },
    {
      name: "Vegetable Oil",
      price: "₦8,000.00",
      description:
        "Pure vegetable cooking oil - 5 liters. Heart-healthy option for all your cooking needs.",
      image: "oil.jpeg",
    },
    {
      name: "Beans",
      price: "₦6,000.00",
      description:
        "Brown beans - 10kg bag. Excellent source of protein and fiber for healthy meals.",
      image: "beans.jpeg",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-green-50 to-yellow-100 py-12 px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <h1 className="text-5xl font-extrabold text-green-700 drop-shadow-lg">
            Start Shopping Today
          </h1>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Ready to access subsidized food items? Sign Up now and start your
            journey towards affordable nutrition for your family.
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="bg-yellow-500 hover:bg-green-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg transform transition hover:-translate-y-1 hover:shadow-2xl"
          >
            SIGN UP TO SHOP
          </button>
        </div>

        {/* How It Works */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-green-700">
            How It Works
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Sign Up & Verify",
                desc: "Create your account using your NIN for verification",
              },
              {
                step: "2",
                title: "Browse & Order",
                desc: "Select from our quality food items at subsidized prices",
              },
              {
                step: "3",
                title: "Pay & Pickup",
                desc: "Complete payment and collect your order at designated locations",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-lg border border-yellow-200 text-center transform transition hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-5xl font-extrabold text-yellow-500 mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-green-700">
                  {item.title}
                </h3>
                <p className="mt-3 text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "5,000+", label: "Registered Users" },
            { number: "15,000+", label: "Orders Fulfilled" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-green-600 text-white rounded-2xl p-8 shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl"
            >
              <h3 className="text-4xl font-bold">{stat.number}</h3>
              <p className="mt-2 text-lg">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Featured Products */}
        <div className="space-y-10">
          <h2 className="text-4xl font-bold text-center text-green-700">
            Featured Products
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {products.map((product, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition hover:-translate-y-3 hover:scale-105 hover:shadow-2xl"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-6"
                />
                <h3 className="text-xl font-bold text-green-700">
                  {product.name}
                </h3>
                <p className="text-gray-600 mt-2 text-sm">
                  {product.description}
                </p>
                <p className="text-lg font-semibold text-yellow-600 mt-3">
                  {product.price}
                </p>
                <button className="mt-4 w-full bg-yellow-500 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-600 transition shadow-md">
                  🛒 Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-green-700">
            Ready to Start?
          </h2>
          <p className="text-gray-700 text-lg">
            Join thousands of families already benefiting from our program
          </p>
          <button
            onClick={() => router.push("/signup")}
            className="bg-gradient-to-r from-yellow-400 to-green-600 text-white px-10 py-5 rounded-xl text-lg font-bold shadow-lg transform transition hover:-translate-y-2 hover:shadow-2xl"
          >
            Sign Up Now
          </button>
          <p className="mt-3 text-gray-700">
            Already Registered?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-green-600 font-semibold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
