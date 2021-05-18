import { nanoid } from "nanoid";
import { auth, db } from "../../firebase";

type LogActions = "CRIAR" | "DELETAR" | "ATUALIZAR";

const firebaseLog = (collection: string, actionType: LogActions) => {
  db.collection("log")
    .add({
      uuid: nanoid(),
      collection: collection,
      user: auth.currentUser?.email,
      actionType: actionType,
    })
    .then(() => {
      return 0;
    })
    .catch((error) => console.log(error));
};

export default firebaseLog;
