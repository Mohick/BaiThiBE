


import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SchemaAccount = new Schema({
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, trim: true },
    avatar: { type: String, default: "", trim: true },
    verify: { type: Boolean, trim: true, default: false },
}, { timestamps: true });

const modelsAccount = mongoose.model("Account", SchemaAccount);
export default modelsAccount