



import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SchemaRequireResetPassword = new Schema({
  email: { type: String, required: true, trim: true, unique: true },
  expiresAt: {
    type: Date,
    default: () => new Date(Date.now()+ 5 * 60 * 1000), // 55 phút sau
    expires: 0 // TTL kích hoạt khi đến đúng thời điểm expiresAt
  }
}, { timestamps: true });

const modelsRequirePassword = mongoose.model("Require-Reset-Password", SchemaRequireResetPassword);
export default modelsRequirePassword