import express from "express";
import dotenv from "dotenv";
import { openai } from "../index.js";
import * as openaiController from "../controllers/openaiController.js";

dotenv.config();
const openaiRouter = express.Router();

openaiRouter.route("/text").post(openaiController.text);

export { openaiRouter };
