// /api/compare-face/route.js
import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";

export async function POST(req) {
  try {
    const { descriptor } = await req.json();

    if (!descriptor || !Array.isArray(descriptor)) {
      return NextResponse.json({ error: "Valid face descriptor required" }, { status: 400 });
    }

    // Fetch all users with faceDescriptor
    const users = await User.findAll({ attributes: ["id", "faceDescriptor"] });

    const THRESHOLD = 0.6;

    const exists = users.some((user) => {
      if (!user.faceDescriptor) return false;
      const dbDescriptor = JSON.parse(user.faceDescriptor);
      const dist = Math.sqrt(
        dbDescriptor.reduce((acc, val, i) => acc + (val - descriptor[i]) ** 2, 0)
      );
      return dist < THRESHOLD;
    });

    return NextResponse.json({ exists });
  } catch (err) {
    console.error("COMPARE FACE ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
