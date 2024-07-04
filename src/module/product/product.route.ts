import { Router } from "express";
import { productcontroller } from "./product.controller";
const productRoutes = Router();

productRoutes.post("/products", productcontroller.createProduct);

export default productRoutes;
