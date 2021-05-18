import { db } from "../../firebase";

const firebaseFetch = (
  callback: (...args: any[]) => void,
  collectionPath: string
) => {
  let unsub: any;

  unsub = db.collection(collectionPath).onSnapshot((collectionSnapshot) => {
    let collectionArrayInternal: any[] = [];

    collectionSnapshot.forEach((collectionDocs) => {
      collectionArrayInternal.push(collectionDocs.data());
    });

    callback([...collectionArrayInternal]);
  });

  return unsub;
};

export default firebaseFetch;
