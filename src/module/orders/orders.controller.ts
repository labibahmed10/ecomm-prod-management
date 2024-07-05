import httpStatus from "http-status";
import catchAsyncFunc from "../../utils/catchAsyncFunc";
import sendResponse from "../../utils/sendResponse";
import { IOrder } from "./orders.interface";
import { orderServices } from "./orders.services";

const getAllOrders = catchAsyncFunc(async (req, res) => {
  const result = await orderServices.getAllOrdersFromDB(req.query);
  const message = Object.entries(req.query).length > 0 ? "Orders fetched successfully for user email!" : "Orders fetched successfully!";
  sendResponse(res, httpStatus.OK, message, result);
});

const createOrders = catchAsyncFunc(async (req, res) => {
  const product: IOrder = req.body;
  const { _id, ...result } = await orderServices.createOrdersIntoDB(product);

  sendResponse(res, httpStatus.CREATED, "Order created successfully!", result);
});

export const ordersController = {
  getAllOrders,
  createOrders,
};
