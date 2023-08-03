import express from "express";

import * as authController from "../controllers/authController.js";

const authRouther = express.Router();

authRouther.route("/login").post(authController.login);
authRouther.route("/signup").post(authController.signup);

export { authRouther };
