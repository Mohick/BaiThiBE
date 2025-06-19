import mongoose from "mongoose";




export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL as string);
        console.log("Connected to DB");
    } catch (error) {
        console.log("không tìm thấy DB");
        console.log(error);
    }
}


