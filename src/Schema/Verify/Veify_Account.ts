







import mongoose from "mongoose";
const Schema = mongoose.Schema;

const VeirifyEmail = new Schema({
    adminID: { type: String, required: true, trim: true, unique: true },
}, { timestamps: true });

const modelVerifyEmail = mongoose.model("VeirifyEmail", VeirifyEmail);
export default modelVerifyEmail