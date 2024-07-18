import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { cartsCollection } from "./cart.mongodb.model";

export const usersCollection = "users";

const documentsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: true,
    },
  },
  { _id: false }
);

const usersSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  age: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  rol: {
    type: String,
    enum: ["user", "premium"],
    default: "user",
  },
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: cartsCollection,
  },
  resetToken: {
    type: String,
    default: "",
  },
  resetTokenExpires: {
    type: Number,
    default: 0,
  },
  documents: {
    type: [documentsSchema],
    default: [],
  },
  last_connection: {
    type: Date,
    default: null,
  },
});

usersSchema.plugin(mongoosePaginate);

export const usersModel = mongoose.model(usersCollection, usersSchema);
