import { Router } from "express";
import { productcontroller } from "./product.controller";
import validateRequest from "../../middlewares/validateRequest";
import { productsValidations } from "./product.validation";
const productRoutes: Router = Router();

productRoutes.get("/products", productcontroller.getAllProducts);

productRoutes.post("/products", validateRequest(productsValidations.productCreateSchema), productcontroller.createProduct);

productRoutes.put("/products/:productId", validateRequest(productsValidations.productUpdateSchema), productcontroller.updateSingleProduct);

productRoutes.get("/products/:productId", productcontroller.getSingleProduct);

productRoutes.delete("/products/:productId", productcontroller.deleteSingleProduct);

export default productRoutes;
