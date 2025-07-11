import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
//import { db } from '@/lib/db'; // Your database client
import Stripe from "stripe";
export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get("Stripe-Signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    return new NextResponse("Webhook error", { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  switch (event.type) {
    case "checkout.session.completed":
      await handleCheckoutSessionCompleted(session);
      break;
    case "payment_intent.succeeded":
      // Backup handler
      break;
    case "checkout.session.expired":
      await handleExpiredSession(session);
      break;
  }

  return new NextResponse(null, { status: 200 });
}

async function handleCheckoutSessionCompleted(
  session: Stripe.Checkout.Session
) {
  // Verify the payment was successful
  if (session.payment_status !== "paid") return;

  // Create order in database
  // await db.order.create({
  //   data: {
  //     id: session.id,
  //     userId: session.metadata?.userId || 'anonymous',
  //     amount: session.amount_total ? session.amount_total / 100 : 0,
  //     currency: session.currency || 'usd',
  //     status: 'COMPLETED',
  //     shippingDetails: session.shipping_details
  //       ? {
  //           create: {
  //             name: session.shipping_details.name || '',
  //             address: {
  //               create: {
  //                 line1: session.shipping_details.address?.line1 || '',
  //                 line2: session.shipping_details.address?.line2 || '',
  //                 city: session.shipping_details.address?.city || '',
  //                 state: session.shipping_details.address?.state || '',
  //                 postalCode: session.shipping_details.address?.postal_code || '',
  //                 country: session.shipping_details.address?.country || '',
  //               },
  //             },
  //           },
  //         }
  //       : undefined,
  //     items: {
  //       create: session.metadata?.items
  //         ? JSON.parse(session.metadata.items).map((item: any) => ({
  //             productId: item.productId,
  //             quantity: item.quantity,
  //             price: item.price,
  //           }))
  //         : [],
  //     },
  //   },
  // });

  // // Send confirmation email
  // await sendConfirmationEmail(session.customer_email, session.id);
}

async function handleExpiredSession(session: Stripe.Checkout.Session) {
  // await db.order.create({
  //   data: {
  //     id: session.id,
  //     status: "EXPIRED",
  //     userId: session.metadata?.userId || "anonymous",
  //   },
  // });
}
