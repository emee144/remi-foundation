import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { Op } from "sequelize";

export async function GET(req) {
  try {
    const { search } = Object.fromEntries(req.nextUrl.searchParams);

    if (!search) {
      return NextResponse.json({ error: "Search query is required" }, { status: 400 });
    }

    const users = await User.findAll({
      where: {
        [Op.or]: [
          { nin: search },
          { phone: search },
          { email: search.toLowerCase() },
        ],
      },
      attributes: ["id", "nin", "surname", "otherNames", "phone", "email", "gender"],
    });

    return NextResponse.json({ users });
  } catch (err) {
    console.error("ADMIN USER SEARCH ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
