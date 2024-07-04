import { Router } from "express";
import { productcontroller } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productsValidations } from "./product.validation";
const productRoutes: Router = Router();

productRoutes.get("/products", productcontroller.getAllProducts);

productRoutes.post("/products", validateRequest(productsValidations.ProductCreateSchema), productcontroller.createProduct);

productRoutes.get("/products/:productId", productcontroller.getSingleProduct);
export default productRoutes;
