import { FilterQuery } from "mongoose";
import { IOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";
import { ProductModel } from "../product/product.model";

const getAllOrdersFromDB = async (query: FilterQuery<IOrder>) => {
  const { email } = query;
  const queryValue = email ? { email: { $eq: email } } : {};

  const result = await OrderModel.find(queryValue).select("-_id");
  return result;
};

const createOrdersIntoDB = async (product: IOrder) => {
  const availableQuantity = await ProductModel.findOne({ _id: product.productId }).select("-_id inventory");

  console.log(availableQuantity);
  const result = await OrderModel.create(product);
  return result.toJSON();
};

export const orderServices = {
  getAllOrdersFromDB,
  createOrdersIntoDB,
};
