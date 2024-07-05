import { FilterQuery } from "mongoose";
import { IOrder } from "./orders.interface";
import { OrderModel } from "./orders.model";

// const getAllProductsFromDB = async (query: FilterQuery<IOrder>) => {
//   const result = await OrderModel.find(query);
//   return result;
// };

const createProductIntoDB = async (product: IOrder) => {
  const result = await OrderModel.create(product);
  return result.toJSON();
};

export const productServices = {
  // getAllProductsFromDB,
  createProductIntoDB,
};
