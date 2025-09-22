import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { Purchase } from "@/lib/models/Purchase"; // import Purchase
import { Op } from "sequelize";

export async function GET(req) {
  try {
    const { search } = Object.fromEntries(req.nextUrl.searchParams);

    let where = {};
    if (search && search.trim()) {
      // search by NIN, phone, or email
      where = {
        [Op.or]: [
          { nin: search },
          { phone: search },
          { email: search.toLowerCase() },
        ],
      };
    }
    // else leave 'where' empty to fetch all users

    const users = await User.findAll({
      where,
      attributes: ["id", "nin", "surname", "otherNames", "phone", "email", "gender"],
      include: [
        {
          model: Purchase,
          as: "purchases", // must match your association alias
          attributes: ["purchaseDate"],
        },
      ],
    });

    // calculate days left for each purchase
    const usersWithDaysLeft = users.map(user => {
      const purchases = user.purchases.map(p => {
        const purchaseDate = new Date(p.purchaseDate);
        const diffDays = Math.max(
          0,
          30 - Math.floor((new Date() - purchaseDate) / (1000 * 60 * 60 * 24))
        );
        return { purchaseDate, daysLeft: diffDays };
      });
      return { ...user.toJSON(), purchases };
    });

    return NextResponse.json({ users: usersWithDaysLeft });
  } catch (err) {
    console.error("ADMIN USER SEARCH ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
