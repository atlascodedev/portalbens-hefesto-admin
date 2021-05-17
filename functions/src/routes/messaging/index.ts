import express, { Router } from "express";
import { storeFormMessage } from "../../controllers/messaging";
const cors = require("cors");

const messagingRouter: Router = express.Router();

messagingRouter.options("*", cors());

messagingRouter.post("/contactform", cors(), storeFormMessage);

export default messagingRouter;
