import { FilterQuery } from "mongoose";
import { IOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

const getAllOrdersFromDB = async (query: FilterQuery<IOrder>) => {
  const { email } = query;
  const queryValue = email ? { email: { $eq: email } } : {};

  const result = await OrderModel.find(queryValue);
  return result;
};

const createOrdersIntoDB = async (product: IOrder) => {
  const result = await OrderModel.create(product);
  return result.toJSON();
};

export const orderServices = {
  getAllOrdersFromDB,
  createOrdersIntoDB,
};
