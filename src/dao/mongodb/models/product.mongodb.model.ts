import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { string } from "zod";

export const productsCollection = "products";

const productsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  thumbnail: {
    type: [String],
    default: [],
  },
  owner: {
    type: String,
    default: "admin",
  },
});

productsSchema.plugin(mongoosePaginate);

export const productsModel = mongoose.model(productsCollection, productsSchema);
