import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { IProduct } from "./product.interface";
import { productServices } from "./product.services";

const getAllProducts = catchAsyncFunc(async (req, res) => {
  const result = await productServices.getAllProductsFromDB();

  sendResponse(res, httpStatus.OK, "Products fetched successfully!", result);
});

const getSingleProduct = catchAsyncFunc(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.getSingleProductFromDB(productId);

  sendResponse(res, httpStatus.OK, "Product fetched successfully!", result);
});

const createProduct = catchAsyncFunc(async (req, res) => {
  const product: IProduct = req.body;
  const { _id, ...result } = await productServices.createProductIntoDB(product);

  sendResponse(res, httpStatus.CREATED, "Product created successfully!", result);
});

const updateSingleProduct = catchAsyncFunc(async (req, res) => {
  const { productId } = req.params;
  const updatingData: Partial<IProduct> = req.body;

  const result = await productServices.updateSingleProductIntoDB(productId, updatingData);

  sendResponse(res, httpStatus.OK, "Product updated successfully!", result);
});

export const productcontroller = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateSingleProduct,
};
