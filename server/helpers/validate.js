import { body } from "express-validator";

const validateRegister = [
  body("username").trim().escape().notEmpty(),
  body("email").trim().escape().notEmpty().isEmail(),
  body("password")
    .trim()
    .escape()
    .notEmpty()
    .isLength({
      min: 8,
    })
    .matches(/\d/)
    .withMessage("Password must contain a number")
    .matches(/[A-Z]/)
    .withMessage("Password must contain an uppercase letter"),
];

const validateLogin = [
  body("email").trim().escape().notEmpty().isEmail(),
  body("password").trim().escape().notEmpty(),
];

const validateUpdate = [
  body("username").trim().escape().notEmpty(),
  body("email").trim().escape().notEmpty().isEmail(),
];

export { validateRegister, validateLogin, validateUpdate };
