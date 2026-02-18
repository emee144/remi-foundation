import { NextResponse } from "next/server";
import { User } from "../../../../lib/models/User";
import { Purchase } from "../../../../lib/models/Purchase";

export async function POST(req) {
  try {
    const { userId } = await req.json(); // userId must come from request body
    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    // Include with correct alias
    const user = await User.findByPk(userId, {
      include: { model: Purchase, as: "purchases" },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const lastPurchase = user.purchases[user.purchases.length - 1];
    if (lastPurchase) {
      const diffDays =
        (new Date() - new Date(lastPurchase.purchaseDate)) / (1000 * 60 * 60 * 24);
      if (diffDays < 30) {
        return NextResponse.json(
          { error: `Next purchase allowed in ${Math.ceil(30 - diffDays)} days` },
          { status: 400 }
        );
      }
    }

    const newPurchase = await Purchase.create({
      userId,
      purchaseDate: new Date(),
    });

    return NextResponse.json({ success: true, purchase: newPurchase });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to make purchase" }, { status: 500 });
  }
}
