import Stripe from "stripe";

const STRIPE_KEY = process.env.STRIPE_KEY;

if (!STRIPE_KEY) throw new Error("Stripe key is missing")

export const stripe = new Stripe(STRIPE_KEY)
