import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    sessionId: {
      type: String,
      required: true,
    },

    product: {
      type: String,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      required: true,
    },

    paymentStatus: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;