import mongoose from "mongoose";

export const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL as string);
    console.log("DB connected!");
  } catch (error) {
    console.log("Failed to connect to mongo DB.", error);
  }
};
