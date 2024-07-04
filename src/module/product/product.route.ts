import { Router } from "express";
import { productcontroller } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productsValidations } from "./product.validation";
const productRoutes: Router = Router();

productRoutes.post("/products", validateRequest(productsValidations.ProductCreateSchema), productcontroller.createProduct);

export default productRoutes;
