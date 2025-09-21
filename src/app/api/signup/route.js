// /api/signup1/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      nin, surname, otherNames, address, lga,
      phone, gender, ageRange, occupation,
      email, password, faceDescriptor
    } = body || {};

    if (!nin || !surname || !otherNames || !address || !lga || !phone || !gender || !ageRange || !occupation || !email || !password || !faceDescriptor) {
      return NextResponse.json({ error: "All fields + face required" }, { status: 400 });
    }

    // Ensure faceDescriptor is an array
    if (!Array.isArray(faceDescriptor) || faceDescriptor.length !== 128) {
      return NextResponse.json({ error: "Invalid face descriptor" }, { status: 400 });
    }

    const ninDigits = String(nin).replace(/\D/g, "");
    const phoneDigits = String(phone).replace(/\D/g, "");
    const normalizedEmail = String(email).trim().toLowerCase();

    // Check email uniqueness
    const existingEmail = await User.findOne({ where: { email: normalizedEmail } });
    if (existingEmail) return NextResponse.json({ error: "Email already registered" }, { status: 409 });

    const existingPhone = await User.findOne({ where: { phone: phoneDigits } });
if (existingPhone)
  return NextResponse.json({ error: "Phone number already registered" }, { status: 409 });

    // Fetch all existing users' face descriptors
    const existingUsers = await User.findAll({ attributes: ["faceDescriptor", "email"] });

    // Compare faces
    for (let user of existingUsers) {
      if (!user.faceDescriptor) continue;
      const dbDescriptor = JSON.parse(user.faceDescriptor);

      if (dbDescriptor.length !== 128) continue; // skip invalid data

      const distance = Math.sqrt(
        dbDescriptor.reduce((sum, val, i) => sum + (val - faceDescriptor[i]) ** 2, 0)
      );

      console.log("Comparing with user:", user.email, "Distance:", distance);

      if (distance < 0.55) {
        // Duplicate face detected
        return NextResponse.json({ error: `Face already registered for ${user.email}. Signup denied.` }, { status: 409 });
      }
    }

    // No match, create user
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
      password, // hash in production!
      faceDescriptor: JSON.stringify(faceDescriptor),
    });

    const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET || "secretkey",
      { expiresIn: "365d" }
    );

    return NextResponse.json({ message: "Signup successful", token, userId: newUser.id }, { status: 201 });
  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
