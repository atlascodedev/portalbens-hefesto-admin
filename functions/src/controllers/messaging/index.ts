import { Request, Response } from "express";
import { db } from "../../firebase";
import { nanoid } from "nanoid";

interface UserMessage {
  uuid: string;
  name: string;
  email: string;
  message: string;
}

export const storeFormMessage = async (
  req: Request<{}, {}, { name: string; email: string; message: string }, {}>,
  res: Response
) => {
  if (!req.body.name || !req.body.email || !req.body.message) {
    return res.status(400).json({
      error: `The request did not match the required format.`,
    });
  }

  const transactionUUID: string = nanoid();

  const userMessage: UserMessage = {
    email: req.body.email,
    name: req.body.name,
    message: req.body.message,
    uuid: transactionUUID,
  };

  db.collection("messages")
    .add(userMessage)
    .then((docCreated) => {
      res.status(200).json({ message: "Message stored successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
};
