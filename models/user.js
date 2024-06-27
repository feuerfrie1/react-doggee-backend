import mongoose from "mongoose";
import Pet from "./pet.js";

const UserModel = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false,
    },
    registrationAddress: {
      type: String,
      required: false,
    },
    birthDate: {
      type: String,
      required: false,
    },
    pets: [Pet.schema],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserModel);
