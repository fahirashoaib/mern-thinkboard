import mongoose from "mongoose"

const connectDB = async (callback) => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected successfully");
        callback();
    }
    catch(error){
        console.error("MongoDB connection failed:", error)
        process.exit(1); // 1 means exit with failure, 0 means exit with success
    }
}

export default connectDB