import { model, Schema } from "mongoose";
import { IOrder } from "./orders.interface";

const orderSchema: Schema<IOrder> = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product ID is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be a positive number"],
    },
    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },
  },
  { timestamps: false, versionKey: false }
);

export const OrderModel = model<IOrder>("Order", orderSchema);
