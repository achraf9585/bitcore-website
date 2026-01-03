
import { NextResponse } from "next/server";
import Stripe from "stripe";

// Initialize Stripe with the secret key from environment variables
// Note: In a real app, you must set STRIPE_SECRET_KEY in your .env file
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  // apiVersion: "2024-12-18.acacia", // Removed to use default version and avoid type mismatch
});

export async function POST(req: Request) {
  try {
    const { packageName, price, items } = await req.json();

    let line_items = [];

    if (items && Array.isArray(items) && items.length > 0) {
      line_items = items.map((item: any) => {
        const match = item.price.toString().match(/[\d,]+/);
        const numericPart = match ? match[0].replace(/,/g, '') : "0";
        const numericPrice = parseInt(numericPart) || 0;
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: numericPrice * 100,
          },
          quantity: 1,
        }
      });
    } else if (packageName && price) {
        // Fallback for single item
        const match = price.toString().match(/[\d,]+/);
        const numericPart = match ? match[0].replace(/,/g, '') : "100";
        const numericPrice = parseInt(numericPart) || 100;

        line_items = [
            {
            price_data: {
                currency: "usd",
                product_data: {
                name: packageName,
                },
                unit_amount: numericPrice * 100,
            },
            quantity: 1,
            },
        ];
    } else {
      return NextResponse.json(
        { error: "Missing items or package details" },
        { status: 400 }
      );
    }

    // Create a Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: line_items,
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
