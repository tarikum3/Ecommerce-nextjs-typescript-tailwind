import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { getCartByIdUtil } from "@/lib/actions/actions";

export async function POST(req: Request) {
  const session = await auth();

  if (!session?.user.id) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    const cart = await getCartByIdUtil();

    if (!cart) {
      return NextResponse.json({ message: "Cart not found" }, { status: 404 });
    }

    if (!cart.items || cart.items.length === 0) {
      return NextResponse.json({ message: "Cart is empty" }, { status: 400 });
    }

    // Convert cart items to Stripe line items format
    const line_items = cart.items.map((item: any) => {
      if (!item.variant) {
        throw new Error("Product variant not found");
      }

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.variant.product.name,
            description: item.variant.product.description || "",
            images: item.variant.product.images || [],
            metadata: {
              productId: item.variant.productId,
              variantId: item.variantId,
            },
          },
          unit_amount: Math.round(item.variant.price * 100),
        },
        quantity: item.quantity,
      };
    });

    const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      //   shippingOptions : [
      //     {
      //         shipping_rate_data: {
      //             type: "fixed_amount",
      //             fixed_amount: {
      //                 amount: Math.round( 100),
      //                 currency: "usd",
      //             },
      //             display_name: "shipping methode name",
      //         },
      //     },
      // ],
      mode: "payment",
      success_url: `${baseUrl}/checkout/success`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        userId: session.user.id,
        cartId: cart.id,
      },
      // customer_email: session.user.email || undefined,
      // shipping_address_collection: {
      //   allowed_countries: ["US", "CA", "GB"],
      // },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes from now
    });

    //  return NextResponse.json({ url: checkoutSession.url });
    return NextResponse.json({ sessionId: checkoutSession.id });
  } catch (error) {
    console.error("[CHECKOUT_ERROR]", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
