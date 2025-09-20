import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User";

export async function PUT(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { profilePicture } = await req.json();
    if (!profilePicture) {
      return NextResponse.json({ error: "No picture provided" }, { status: 400 });
    }

    // Remove "data:image/...;base64," prefix if present
    const base64Data = profilePicture.replace(/^data:.+;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");

    await User.update({ profilePicture: buffer }, { where: { id: userId } });

    return NextResponse.json({
      success: true,
      profilePicture, // send back base64 for immediate frontend use
    });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
