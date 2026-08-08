import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import nodemon from "nodemon";
// .env file load hogi
dotenv.config();

const app = express();

// JSON data ko read karne ke liye
app.use(cors());
app.use(express.json());

// Stripe object create
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Home Route
app.get("/", (req, res) => {
  res.send("MiniShop API is Running...");
});

// Stripe Test Route
app.get("/stripe-test", (req, res) => {
  res.json({
    message: "Stripe Connected Successfully",
    keyExists: !!process.env.STRIPE_SECRET_KEY,
  });
});
app.post("/create-checkout-session", async (req, res) => {
  try{
  const session = await stripe.checkout.sessions.create({
    mode:"payment",
    line_items: [
    {
      price_data: {
        currency: "usd",

        product_data: {
          name: "Nike Shoes",
        },

        unit_amount: 10000, // $100 in cents
      },

      quantity: 5,
    },
  ],
     success_url: "http://localhost:5173/success",

    cancel_url: "http://localhost:5173/cancel",
  });
 res.json({
 url: session.url});
}catch (error) {
  console.error("Error creating checkout session:", error);
}});

export default app;