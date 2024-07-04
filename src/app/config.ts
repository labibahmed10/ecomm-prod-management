import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const config = {
  port: process.env.PORT,
  databaseURL: process.env.DATABASE_URL,
};

export default config;
