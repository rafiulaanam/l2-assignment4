import { Schema, model } from "mongoose";
import { TCategory } from "./category.interface";

const categorySchema = new Schema<TCategory>({
  name: { type: String, unique: true, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: String, default: new Date().toISOString() },
  updatedAt: { type: String, default: new Date().toISOString() }
});

export const CategoryModel = model<TCategory>("Category", categorySchema);


