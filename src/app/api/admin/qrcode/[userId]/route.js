import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import Purchase from "@/lib/models/Purchase"; 

export async function POST(req, { params }) {
  try {
    const { userId } = params;

    // Find the user
    const user = await User.findByPk(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Optional: check if user already has a purchase within last 30 days
    const lastPurchase = await Purchase.findOne({
      where: { userId },
      order: [["purchaseDate", "DESC"]],
    });

    const now = new Date();
    if (lastPurchase) {
      const diffDays = Math.floor((now - new Date(lastPurchase.purchaseDate)) / (1000 * 60 * 60 * 24));
      if (diffDays < 30) {
        return NextResponse.json({ error: "User already has an active purchase" }, { status: 400 });
      }
    }

    // Create a new purchase
    const purchase = await Purchase.create({
      userId,
      purchaseDate: now,
    });

    return NextResponse.json({ success: true, purchase });
  } catch (err) {
    console.error("Purchase error:", err);
    return NextResponse.json({ error: "Failed to create purchase" }, { status: 500 });
  }
}
