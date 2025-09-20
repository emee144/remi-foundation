// app/api/signup/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    console.log("SIGNUP BODY:", body); // debug - check server logs

    const {
      nin,
      surname,
      otherNames,
      address,
      lga,
      phone,
      gender,
      ageRange,
      occupation,
      email,
      password,
    } = body || {};

    if (!nin || !surname || !otherNames || !address || !lga || !phone || !gender || !ageRange || !occupation || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Normalize and validate NIN exactly 11 digits
    const ninStr = String(nin).trim();
    const ninDigits = ninStr.replace(/\D/g, "");
    console.log("NIN raw:", ninStr, "digits:", ninDigits.length, ninDigits);
    if (ninDigits.length !== 11) {
      return NextResponse.json({ error: "NIN must be exactly 11 digits" }, { status: 400 });
    }

    // Normalize and validate phone (only digits, max 11)
    const phoneStr = String(phone).trim();
    const phoneDigits = phoneStr.replace(/\D/g, "");
    console.log("PHONE raw:", phoneStr, "digits:", phoneDigits.length, phoneDigits);
    if (phoneDigits.length === 0) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }
    if (phoneDigits.length > 11) {
      return NextResponse.json({ error: "Phone must not exceed 11 digits" }, { status: 400 });
    }

    const normalizedEmail = String(email).trim().toLowerCase();
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return NextResponse.json({ error: "Email already registered" }, { status: 409 });
    }

    // create with cleaned nin/phone
    const newUser = await User.create({
      nin: ninDigits,
      surname,
      otherNames,
      address,
      lga,
      phone: phoneDigits,
      gender,
      ageRange,
      occupation,
      email: normalizedEmail,
      password, // plain text for now
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, process.env.JWT_SECRET || "secretkey", { expiresIn: "365d" });

    return NextResponse.json({ message: "Signup successful", token, userId: newUser.id }, { status: 201 });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
