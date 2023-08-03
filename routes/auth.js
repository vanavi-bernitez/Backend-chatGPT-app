import express from "express";
import dotenv from "dotenv";

import * as authController from "../controllers/authController.js";

const authRouther = express.Router();

authRouther.route("/login").post(authController)  
authRouther.route("/signup").post(authController)