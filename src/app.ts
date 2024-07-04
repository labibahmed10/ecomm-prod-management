import express, { Application, Request, Response, urlencoded } from "express";
import cors from "cors";
const app: Application = express();

// parser
app.use(express.json());
app.use(cors());

//url encoded -  url json hok ba je type e hok amra parse korte parbo
app.use(urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});

export default app;
