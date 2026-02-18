import { NextResponse } from "next/server";
import { User } from "@/lib/models/User";
import { Purchase } from "@/lib/models/Purchase"; // import Purchase
import { Op } from "sequelize";

export async function GET(req) {
  try {
    const { search } = Object.fromEntries(req.nextUrl.searchParams);

    let where = {};
    if (search && search.trim()) {
      const query = search.trim().toLowerCase();
      // search by NIN, phone, or email (case-insensitive)
      where = {
        [Op.or]: [
          { nin: query },
          { phone: query },
          { email: query },
        ],
      };
    }

    const users = await User.findAll({
      where,
      attributes: [
        "id",
        "nin",
        "surname",
        "otherNames",
        "phone",
        "email",
        "gender",
        "qrCode" // include QR code
      ],
      include: [
        {
          model: Purchase,
          as: "purchases",
          attributes: ["purchaseDate"],
        },
      ],
    });
console.log("API returning users:", users.map(u => ({
  id: u.id,
  email: u.email,
  qrLen: u.qrCode?.length
})));
    
    const usersWithDaysLeft = users.map(user => {
      const purchases = user.purchases.map(p => {
        const purchaseDate = new Date(p.purchaseDate);
        const diffDays = Math.max(
          0,
          30 - Math.floor((new Date() - purchaseDate) / (1000 * 60 * 60 * 24))
        );
        return { purchaseDate, daysLeft: diffDays };
      });

      const userData = user.toJSON();

      // trim QR code to remove unwanted spaces or newlines
      if (userData.qrCode) {
        userData.qrCode = userData.qrCode.trim();
      }

      return { ...userData, purchases };
    });

    return NextResponse.json({ users: usersWithDaysLeft });
  } catch (err) {
    console.error("ADMIN USER SEARCH ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
