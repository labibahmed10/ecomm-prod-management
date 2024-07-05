import { FilterQuery } from "mongoose";
import { IOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";
import { ProductModel } from "../product/product.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const getAllOrdersFromDB = async (query: FilterQuery<IOrder>) => {
  const { email } = query;
  const queryValue = email ? { email: { $eq: email } } : {};

  const result = await OrderModel.find(queryValue).select("-_id");
  return result;
};

const createOrdersIntoDB = async (product: IOrder) => {
  const prodFound = await ProductModel.findOne({ _id: product.productId }).select("-_id inventory");
  if (!prodFound) {
    throw new AppError(httpStatus.NOT_FOUND, "Product with this id could not found");
  }
  const availablequantity = prodFound?.inventory?.quantity as number;
  if (product.quantity > availablequantity) {
    throw new AppError(httpStatus.CONFLICT, "Insufficient quantity available in inventory");
  }

  const result = await OrderModel.create(product);
  const updatedQuantity = availablequantity - product.quantity;

  if (result) {
    await ProductModel.updateOne(
      { _id: product.productId },
      {
        $set: { "inventory.quantity": updatedQuantity, "inventory.inStock": updatedQuantity > 0 },
      },
      { runValidators: true }
    );
  }

  return result.toJSON();
};

export const orderServices = {
  getAllOrdersFromDB,
  createOrdersIntoDB,
};
