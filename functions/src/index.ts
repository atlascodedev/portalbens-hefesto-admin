import * as functions from "firebase-functions";
import express from "express";
import adonisRouter from "./routes/adonis";
import collectionsRouter from "./routes/collections";

const app = express();

app.use("/adonis", adonisRouter);

app.use("/collections", collectionsRouter);

export const api = functions.https.onRequest(app);

// admin.atlascode.dev/api/v0/
