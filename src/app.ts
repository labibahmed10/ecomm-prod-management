import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
import allRoutes from "./routes/allRoutes";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import notFoundRoutes from "./middlewares/notFoundRoutes";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//url encoded -  url json hok ba je type e hok amra parse korte parbo
app.use(urlencoded({ extended: true }));

app.use("/api", allRoutes);

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    message: "Welcome to product management service",
  });
});

app.use(globalErrorHandler);

app.all("*", notFoundRoutes);

export default app;
