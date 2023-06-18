import mongoose from "mongoose";

export default function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    const url = process.env.MONGODB_URL;
    if (!url) {
      throw new Error("url not defined");
    }

    return mongoose.connect(url);
  }
}
