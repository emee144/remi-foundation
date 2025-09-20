import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";

export async function GET(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Convert BLOB to base64 if profilePicture exists
    let profilePicture = null;
    if (user.profilePicture) {
      const buffer = user.profilePicture;
      profilePicture = `data:image/jpeg;base64,${buffer.toString("base64")}`;
    }

    return NextResponse.json({
      id: user.id,
      email: user.email,
      surname: user.surname,
      otherNames: user.otherNames,
      phone: user.phone,
      occupation: user.occupation,
      address: user.address,
      nin: user.nin,
      createdAt: user.createdAt,
      profilePicture,
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}
