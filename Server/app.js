import express from "express";
import dotenv from "dotenv";
import Stripe from "stripe";
import cors from "cors";
import nodemon from "nodemon";
import Order from "./models/Order.js";
// .env file load hogi
dotenv.config();

const app = express();

// JSON data ko read karne ke liye
app.use(cors());
// Stripe object create
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    try {
      console.log("Webhook request received");

      const event = JSON.parse(req.body.toString());

      console.log("Event type:", event.type);

      if (event.type === "checkout.session.completed") {
        console.log("Payment successfully completed!");

        const session = event.data.object;

        console.log("Session ID:", session.id);
        console.log("Amount:", session.amount_total);
        console.log("Currency:", session.currency);
        console.log("Payment status:", session.payment_status);

        const lineItems = await stripe.checkout.sessions.listLineItems(
          session.id
        );

        const item = lineItems.data[0];

        console.log("Product:", item.description);
        console.log("Quantity:", item.quantity);
        console.log("Total:", item.amount_total);
        console.log("Currency:", item.currency);

        const order = {
          sessionId: session.id,
          product: item.description,
          quantity: item.quantity,
          amount: item.amount_total,
          currency: item.currency,
          paymentStatus: session.payment_status,
        };

        console.log("Order:", order);
        const existingOrder = await Order.findOne({
  sessionId: session.id,
});
        if (existingOrder) {
          console.log("Order already exists in database:", existingOrder);
          res.sendStatus(200);
          return;
        }
        const savedOrder = await Order.create(order);

        console.log("Order saved to database:", savedOrder);
      }

      res.sendStatus(200);

    } catch (error) {
      console.error("Webhook Error:", error);
      res.sendStatus(500);
    }
  }
);
app.use(express.json());


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
app.get("/orders", async (req, res) => {
  try {
    const orders = await Order.find();

    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

app.get("/orders/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.json(order);
  } catch (error) {
    console.error("Error fetching order:", error);
    res.status(500).json({
      message: "Failed to fetch order",
    });
  }
});
app.delete("/deleteOrders/:id", async (req, res) => {
  try {
    const deleteOrder = await Order.deleteOne({
      _id: req.params.id
    });

    res.json(deleteOrder);
  } catch (error) {

    console.error("Error deleting order:", error);

    res.status(500).json({
      message: "Failed to delete Order",
    });
  }
});
app.put("/updateOrders/:id", async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);

    res.status(500).json({
      message: "Failed to update order",
    });
  }
});
app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",

            product_data: {
              name: "Nike Shoes",
            },

            unit_amount: 10000, // $100 in cents
          },

          quantity: 2,
        },
      ],
      success_url: "http://localhost:5173/success",

      cancel_url: "http://localhost:5173/cancel",
    });
    res.json({
      url: session.url
    });
  } catch (error) {
    console.error("Error creating checkout session:", error);
  }
});

export default app;