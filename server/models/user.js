import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const USER_TYPES = {
  CONSUMER: "consumer",
  SUPPORT: "support",
};

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    name: String,
    email: String,
    avatar: String,
    type: String,
  },
  {
    timestamps: true,
    collection: "User",
  }
);

export default mongoose.model("user", userSchema);