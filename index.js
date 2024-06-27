import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { loginValidation, registerValidation } from "./validation/auth.js";

import checkAuth from "./utils/checkAuth.js";

import {
  register,
  login,
  getMe,
  editUser,
  addPets,
} from "./controllers/userController.js";
import handeValidationErrors from "./utils/handeValidationErrors.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.67nms1h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB OK"))
  .catch((err) => console.log("DB err", err));

const app = express();

app.use(express.json());
app.use(cors());

app.post("/auth/login", loginValidation, handeValidationErrors, login);

app.post("/auth/register", registerValidation, handeValidationErrors, register);

app.get("/auth/me", checkAuth, getMe);

app.patch("/users/:id", editUser);

app.post("/users/:id/pets", addPets);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server OK");
});
