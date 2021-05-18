import { Request, Response } from "express";
import { db } from "../../firebase";

interface AdminLog {
  date: string;
  collection: string;
  user: string;
  id: string;
  actionType: string;
}

export const logOnEntryWrite = (
  req: Request<{}, {}, AdminLog, {}>,
  res: Response
) => {
  const logObject: AdminLog = {
    actionType: req.body.actionType,
    collection: req.body.collection,
    date: new Date().toLocaleString("PT-BR"),
    id: req.body.id,
    user: req.body.user,
  };

  db.collection("collections")
    .doc("adminActions")
    .collection("entries")
    .add(logObject)
    .then(() => {
      return res.status(200).json({ message: "Action logged successfully" });
    })
    .catch((error) => {
      return res.status(500).json({ error: error.message });
    });
};
