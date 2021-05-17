import * as functions from "firebase-functions";
import express from "express";
import adonisRouter from "./routes/adonis";
import collectionsRouter from "./routes/collections";
import staticBuildRouter from "./routes/staticBuild";
import messagingRouter from "./routes/messaging";

const app = express();

app.use("/adonis", adonisRouter);

app.use("/collections", collectionsRouter);

app.use("/build", staticBuildRouter);

app.use("/messaging", messagingRouter);

export const api = functions.https.onRequest(app);

// admin.atlascode.dev/api/v0/
