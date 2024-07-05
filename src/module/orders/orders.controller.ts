import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { IOrder } from "./orders.interface";
import { productServices } from "./orders.services";

// const getAllOrders = catchAsyncFunc(async (req, res) => {
//   const { searchTerm } = req.query;
//   const query = searchTerm
//     ? {
//         name: { $regex: searchTerm, $options: "i" },
//       }
//     : {};
//   const result = await productServices.getAllProductsFromDB(query);
//   const message = searchTerm ? `Products matching search term '${searchTerm}' searched successfully!` : "Products fetched successfully!";
//   sendResponse(res, httpStatus.OK, message, result);
// });

const createOrders = catchAsyncFunc(async (req, res) => {
  const product: IOrder = req.body;
  const { _id, ...result } = await productServices.createProductIntoDB(product);

  sendResponse(res, httpStatus.CREATED, "Order created successfully!", result);
});

export const ordersController = {
  // getAllOrders,
  createOrders,
};
