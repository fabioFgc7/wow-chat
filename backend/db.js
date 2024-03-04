import mongoose from "mongoose";
import { MONGO_URL, PORT } from "./config.js";
export const conectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Base de datos conectados");
  } catch (error) {
    console.log(error);
  }
};
