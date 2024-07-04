import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";

async function connectDB() {
  try {
    await mongoose.connect(config.databaseURL as string);
    console.log("⚡ Database has connected successfully");

    app.listen(config.port, () => {
      console.log(`The port is connected to ${config.port} ⚓`);
    });
  } catch (error) {
    console.log(error);
  }
}

connectDB();
