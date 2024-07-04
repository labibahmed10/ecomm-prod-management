import { IProduct } from "./product.interface";
import { ProductModel } from "./product.model";

const getAllProductsFromDB = async () => {
  const result = await ProductModel.find({});
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

  const updateObject: { [key: string]: any } = {
    ...restQuery,
  };

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
      new Error("Couldn't update tags of the product");
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
      new Error("Couldn't update variants of the product");
    }
  }

  if (inventory && Object.entries(inventory).length > 0) {
    for (const [key, value] of Object.entries(inventory)) {
      console.log(key, value);
      updateObject[`inventory.${key}`] = value;
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

  return result;
};

export const productServices = {
  getAllProductsFromDB,
  getSingleProductFromDB,
  createProductIntoDB,
  updateSingleProductIntoDB,
};
