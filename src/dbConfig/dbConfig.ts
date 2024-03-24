import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const { connection } = mongoose;
    connection.on("connected", () => console.log("mongoose is connected!!"));
    connection.on("error", (err) => {
      console.error(err);
      process.exit();
    });
  } catch (err) {
    console.error("something went wrong!!!", err);
  }
}
