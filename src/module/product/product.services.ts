import { FilterQuery } from "mongoose";
import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const getAllProductsFromDB = async (query: FilterQuery<IProduct>) => {
  const { searchTerm } = query;
  const queryVal = searchTerm
    ? {
        name: { $regex: searchTerm, $options: "i" },
      }
    : {};
  const result = await ProductModel.find(queryVal).select("-_id");
  return result;
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findOne({ _id: id }).select("-_id");
  return result;
};

const createProductIntoDB = async (product: IProduct) => {
  const result = await ProductModel.create(product);
  return result.toJSON();
};

const updateSingleProductIntoDB = async (productId: string, data: Partial<IProduct>) => {
  const { inventory, tags, variants, ...restQuery } = data;
  const product = await ProductModel.findProductById(productId);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  const updateObject: { [key: string]: any } = {
    ...restQuery,
  };

  console.log(updateObject, tags, inventory, variants);

  if (Object.entries(updateObject).length <= 0 && (!tags || tags!.length <= 0) && (!variants || variants!.length <= 0) && !inventory) {
    throw new AppError(httpStatus.NOT_FOUND, "Cannot update the product");
  }

  let result;
  if (tags && tags.length > 0) {
    result = await ProductModel.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        $addToSet: { tags: { $each: tags } },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      throw new AppError(httpStatus.NOT_MODIFIED, "Couldn't update tags of the product");
    }
  }

  if (variants && variants.length > 0) {
    result = await ProductModel.findByIdAndUpdate(
      {
        _id: productId,
      },
      {
        $addToSet: { variants: { $each: variants } },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!result) {
      throw new AppError(httpStatus.NOT_MODIFIED, "Couldn't update variants of the product");
    }
  }

  if (inventory && Object.entries(inventory).length > 0) {
    console.log(inventory);
    for (const [key, value] of Object.entries(inventory)) {
      console.log(key, value);
      updateObject[`inventory.${key}`] = value;
      updateObject[`inventory.${"inStock"}`] = value > 0;
    }
  }

  result = await ProductModel.findByIdAndUpdate(
    {
      _id: productId,
    },
    {
      $set: updateObject,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return result!.toJSON();
};

const deleteSingleProductFromDB = async (productId: string) => {
  const result = await ProductModel.deleteOne({ _id: productId });
  return result;
};

export const productServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateSingleProductIntoDB,
  deleteSingleProductFromDB,
};
