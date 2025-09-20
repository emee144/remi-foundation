import { NextResponse } from "next/server";
import { Purchase } from "@/lib/models/Purchase"; // define model
import { User } from "@/lib/models/User";

export async function GET(req) {
  try {
    // assume userId comes from session/JWT
    const userId = 1;

    const purchases = await Purchase.findAll({
      where: { userId },
      order: [["purchaseDate", "DESC"]],
    });

    return NextResponse.json({ purchases });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const userId = 1;

    // Check last purchase
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
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
