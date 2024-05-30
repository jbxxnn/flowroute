import { NextResponse } from "next/server";
import Stripe from 'stripe'

const STRIPE_KEY = process.env.STRIPE_SECRET_KEY!
const stripe = new Stripe(STRIPE_KEY)

export async function POST(request: Request, {params}:{params:{customer_slug:string}}) {
  const data = await request.json()
  const customer_id = data.customer_slug

  if (!customer_id){
    return NextResponse.json({success:false, message:"Customer ID is invalid"},{status:403})
  }


  try {
    const subscriptions = await stripe.subscriptions.list({ customer: customer_id, status: "all" });
    const customer = await stripe.customers.retrieve(customer_id);
    // Fetch product details for each subscription
    const subscriptionDetails = await Promise.all(subscriptions.data.map(async (subscription) => {
      //@ts-ignore
      const plan = await stripe.plans.retrieve(subscription.plan.id);
      //@ts-ignore
      const product = await stripe.products.retrieve(plan.product);
      const upcoming_invoice = subscription.status === "active" ? await stripe.invoices.retrieveUpcoming({
        customer: customer_id,
        subscription: subscription.id,
      }) : {
          amount_due : undefined,
          period_start : undefined,
          period_end : undefined,
        };

      return {
        ...subscription,
        plan: {
          //@ts-ignore
          ...subscription.plan,
            name: product.name,
        },
        frequency: plan.interval,
        upcoming_invoice: {
          amount_due: upcoming_invoice?.amount_due,
          start: upcoming_invoice?.period_start,
          end: upcoming_invoice?.period_end,
        },
      };
    }));

    return NextResponse.json({customer, subscriptions:subscriptionDetails},{status:200})
  } catch (error: any) {
    console.log({error})
    return NextResponse.json({message:"something went wrong", success:false},{status:500})
  }
}

