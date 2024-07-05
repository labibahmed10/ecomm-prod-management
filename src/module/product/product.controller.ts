import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { IProduct } from "./product.interface";
import { productServices } from "./product.services";

const getAllProducts = catchAsyncFunc(async (req, res) => {
  const result = await productServices.getAllProductsFromDB(req.query);
  const message =
    Object.entries(req.query).length > 0
      ? `Products matching search term '${req.query?.searchTerm}' searched successfully!`
      : "Products fetched successfully!";
  sendResponse(res, httpStatus.OK, message, result);
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

  const { _id, ...result } = await productServices.updateSingleProductIntoDB(productId, updatingData);

  sendResponse(res, httpStatus.OK, "Product updated successfully!", result);
});

const deleteSingleProduct = catchAsyncFunc(async (req, res) => {
  const { productId } = req.params;
  const result = await productServices.deleteSingleProductFromDB(productId);

  sendResponse(res, httpStatus.OK, "Product deleted successfully!", result.deletedCount > 0 ? null : "");
});

export const productcontroller = {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
