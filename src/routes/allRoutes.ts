import { Router } from "express";
import productRoutes from "../module/product/product.route";

const allRoutes = Router();

const appRoutes = [
  {
    path: "/",
    routes: productRoutes,
  },
];

appRoutes.forEach((routes) => allRoutes.use(routes.path, routes.routes));

export default allRoutes;
