


import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SchemaAdmin = new Schema({
    adminID: { type: String, required: true, trim: true, unique: true },
}, { timestamps: true });

const modelsAdmin = mongoose.model("Admin", SchemaAdmin);
export default modelsAdmin