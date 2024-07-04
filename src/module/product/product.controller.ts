import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { IProduct } from "./product.interface";
import { productServices } from "./product.services";

const getAllProducts = catchAsyncFunc(async (req, res) => {
  const result = await productServices.getAllProductsFromDB();

  sendResponse(res, httpStatus.OK, "Products fetched successfully!", result);
});

const createProduct = catchAsyncFunc(async (req, res) => {
  const product: IProduct = req.body;
  const { _id, ...result } = await productServices.createProductIntoDB(product);

  sendResponse(res, httpStatus.CREATED, "Product created successfully!", result);
});

export const productcontroller = {
  getAllProducts,
  createProduct,
};
