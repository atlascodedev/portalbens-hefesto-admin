import express, { Router } from "express";
import { logOnEntryWrite } from "../../controllers/log";
const cors = require("cors");

const logRouter: Router = express.Router();

logRouter.options("*", cors());

logRouter.post("/entry", cors(), logOnEntryWrite);

export default logRouter;
