import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать не менее 6 символов").isLength({
    min: 6,
  }),
];

export const registerValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать не менее 6 символов").isLength({
    min: 6,
  }),
];
