import express from "express";

import * as openaiController from "../controllers/openaiController.js";

const openaiRouter = express.Router();

openaiRouter.route("/text").post(openaiController.text);
openaiRouter.route("/code").post(openaiController.code);
openaiRouter.route("/assist").post(openaiController.assist);

export { openaiRouter };
