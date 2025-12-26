
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
// Note: In a real app, you must set STRIPE_SECRET_KEY in your .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  // apiVersion: "2024-12-18.acacia", // Removed to use default version and avoid type mismatch
});

export async function POST(req: Request) {
  try {
    const { packageName, price } = await req.json();

    // Basic validation
    if (!packageName || !price) {
      return NextResponse.json(
        { error: "Missing package name or price" },
        { status: 400 }
      );
    }

    // Convert price string (e.g., "$400 – $700") to a fixed amount.
    // We strictly extract the first numeric value found.
    const match = price.match(/[\d,]+/);
    const numericPart = match ? match[0].replace(/,/g, '') : "100";
    const numericPrice = parseInt(numericPart) || 100;

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: packageName,
            },
            unit_amount: numericPrice * 100, // Amount in cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.get("origin")}/?success=true`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe error:", err);
    return NextResponse.json(
      { error: err.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
