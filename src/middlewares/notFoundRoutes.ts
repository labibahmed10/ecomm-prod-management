import { NextFunction, Request, Response } from "express";

const notFoundRoutes = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
};

export default notFoundRoutes;
