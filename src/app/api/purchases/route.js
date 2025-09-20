import { NextResponse } from "next/server";
import { Purchase } from "@/lib/models/Purchase";
import jwt from "jsonwebtoken";

// Helper to get userId from JWT
const getUserIdFromReq = (req) => {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader) throw new Error("Missing Authorization header");

  const token = authHeader.split(" ")[1];
  if (!token) throw new Error("Missing token");

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload.id;
};

export async function GET(req) {
  try {
    const userId = getUserIdFromReq(req);

    const purchases = await Purchase.findAll({
      where: { userId },
      order: [["purchaseDate", "DESC"]],
    });

    return NextResponse.json({ purchases });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}

export async function POST(req) {
  try {
    const userId = getUserIdFromReq(req);

    // Check last purchase for this user
    const lastPurchase = await Purchase.findOne({
      where: { userId },
      order: [["purchaseDate", "DESC"]],
    });

    if (lastPurchase) {
      const diffDays =
        (new Date() - new Date(lastPurchase.purchaseDate)) /
        (1000 * 60 * 60 * 24);

      if (diffDays < 30) {
        return NextResponse.json(
          { error: "You must wait 30 days before another purchase" },
          { status: 400 }
        );
      }
    }

    const newPurchase = await Purchase.create({ userId });
    return NextResponse.json({ purchase: newPurchase });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 401 });
  }
}
