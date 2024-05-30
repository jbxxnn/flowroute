import type Stripe from "stripe"

type Customer = Stripe.Customer | Stripe.DeletedCustomer
type Subscription = Stripe.Subscription
type Plan = Stripe.Plan


export type CustomStripeSubscription = Subscription & {
  plan: Plan & {name:string},
  frequency: 'day' | 'month' | 'week' | 'year';
  upcoming_invoice : {
    amount_due?: number,
    start?: number,
    end?: number,
  }
}

export type CustomCustomer = Customer & {
  email:string;
  phone:string;
  created:number;
  shipping:Stripe.Customer.Shipping 
}

export type StripeDataEndpointResponse = {
  customer : CustomCustomer,
  subscriptions : CustomStripeSubscription[]
}
