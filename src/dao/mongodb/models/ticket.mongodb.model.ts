import mongoose from "mongoose";
import { generateCode } from "../../../utils/functions";

export const ticketsCollection = "tickets";

const ticketsSchema = new mongoose.Schema({
  code: {
    type: String,
    unique: true,
  },
  purchaseDatetime: {
    type: Date,
    default: Date.now,
  },
  amount: {
    type: Number,
    required: true,
  },
  purchaser: {
    type: String,
    required: true,
  },
});

/** Middleware */
ticketsSchema.pre("save", function (next) {
  if (!this.code) {
    this.code = generateCode("TICKET");
  }
  next();
});

const ticketsModel = mongoose.model(ticketsCollection, ticketsSchema);

export default ticketsModel;
