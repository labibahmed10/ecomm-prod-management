import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find({});
  return result;
};

const createProductIntoDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result.toJSON();
};

export const productServices = {
  getAllProductsFromDB,
  createProductIntoDB,
};
