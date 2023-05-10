import mongoose from "mongoose";

const connectDB = async () => {
  try 
  {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongodb database ${conn.connection.host}`.bgGreen.white);
  }catch (error) {
    console.log(`Error in mongodb ${error}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;

