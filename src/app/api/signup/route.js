// app/api/signup/route.js
import { NextResponse } from "next/server";

// Simulated database (replace with real DB like Firestore, Prisma, or MongoDB)
const usersDB = [];

export async function POST(req) {
  try {
    const body = await req.json();

    // Destructure expected fields
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
    } = body;

    // Minimal validation
    if (
      !nin ||
      !surname ||
      !otherNames ||
      !address ||
      !lga ||
      !phone ||
      !gender ||
      !ageRange ||
      !occupation ||
      !email ||
      !password
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if email already exists
    const userExists = usersDB.find((user) => user.email === email);
    if (userExists) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }

    // Save user to "database"
    const newUser = {
      id: usersDB.length + 1,
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
      password, // In production, hash this before storing
    };
    usersDB.push(newUser);

    return NextResponse.json(
      { message: "Signup successful", userId: newUser.id },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
