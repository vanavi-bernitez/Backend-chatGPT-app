import express from "express";
import dotenv from "dotenv";

import * as openaiController from "../controllers/openaiController.js";

dotenv.config();
const openaiRouter = express.Router();

openaiRouter.route("/text").post(openaiController.text);
openaiRouter.route("/code").post(openaiController.code);
openaiRouter.route("/assist").post(openaiController.assist);

export { openaiRouter };
