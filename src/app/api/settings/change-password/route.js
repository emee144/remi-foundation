import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { User } from "@/lib/models/User"; // adjust path if needed
import sequelize from "@/lib/sequelize"; // your sequelize connection

export async function POST(req) {
  try {
    const authHeader = req.headers.get("authorization");
    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { oldPassword, newPassword } = await req.json();

    // find the user
    const user = await User.findOne({ where: { id: decoded.id } });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // compare old password (plain, since you don’t want bcrypt yet)
    if (user.password !== oldPassword) {
      return NextResponse.json({ message: "Old password is incorrect" }, { status: 400 });
    }

    // update password
    user.password = newPassword;
    await user.save();

    return NextResponse.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
