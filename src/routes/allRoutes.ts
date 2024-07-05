import { Router } from "express";
import productRoutes from "../module/product/product.route";
import orderRoutes from "../module/orders/orders.route";

const allRoutes: Router = Router();

const appRoutes = [
  {
    path: "/",
    routes: productRoutes,
  },
  {
    path: "/",
    routes: orderRoutes,
  },
];

appRoutes.forEach((routes) => allRoutes.use(routes.path, routes.routes));

export default allRoutes;
