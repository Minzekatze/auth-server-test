import { Router } from "express";
import {
  checkEmptyUser,
  checkEmptyLogin,
  validateInput,
  checkUnique,
  findOne,
} from "../middlewares/validationMiddleware.js";
import verifyToken from "../middlewares/verifyMiddleware.js";
import {
  signInUser,
  signUpUser,
  getOneUser,
  getUsers,
} from "../controllers/authController.js";

const authRoute = Router();

authRoute.post(
  "/signup",
  checkEmptyUser,
  validateInput,
  checkUnique,
  signUpUser
);
authRoute.post("/signin", checkEmptyLogin, findOne, signInUser);
authRoute.get("/me", verifyToken, getOneUser);
authRoute.get("/all", getUsers);

export default authRoute;
