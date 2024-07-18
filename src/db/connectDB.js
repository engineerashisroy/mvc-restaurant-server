import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(`${process.env.MONGODB_URI}`);
    console.log(
      `Mongodb connection successfully, ${connection.connection.host}`
    );
  } catch (error) {
    console.log("connection fails to database", error);
    process.exit(1);
  }
};

export default connectDB;
