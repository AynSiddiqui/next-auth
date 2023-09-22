import mongoose from "mongoose";
export async function connection (){
  const str=process.env.MONGODB_URI as string;
  try {
    await mongoose.connect(str);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};