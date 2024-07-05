import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { ordersController } from "./orders.controller";
import { ordersValidation } from "./orders.validation";
const orderRoutes: Router = Router();

orderRoutes.get("/orders", ordersController.getAllOrders);

orderRoutes.post("/orders", validateRequest(ordersValidation.OrderCreateSchema), ordersController.createOrders);

export default orderRoutes;
