import { Dispatch } from "react";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../..";
import { db } from "../../../../firebase";
import {
  CardCollectionCheckActionTypes,
  CARD_COLLECTION_CHECK_FAIL,
  CARD_COLLECTION_CHECK_START,
  CARD_COLLECTION_CHECK_SUCCESS,
} from "../types";

export const checkCardsExpiring = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<CardCollectionCheckActionTypes>,
    getState: () => RootState
  ) => {
    dispatch({
      type: CARD_COLLECTION_CHECK_START,
    });

    db.collection("collections")
      .doc("cartas")
      .collection("entries")
      .get()
      .then((cardSnapshot) => {
        let cardDocs: any[] = [];

        cardSnapshot.forEach((cardDoc) => {
          cardDocs.push(cardDoc.data());
        });

        dispatch({
          type: CARD_COLLECTION_CHECK_SUCCESS,
          payload: [...cardDocs],
        });
      })
      .catch((error) => {
        dispatch({
          type: CARD_COLLECTION_CHECK_FAIL,
          payload: {
            error:
              "Ocorreu um erro durante o processo de verificação de cartas vencidas, atualize a página e tente novamente e se o erro persistir, contate o desenvolvedor responsável.",
          },
        });
        console.log(error);
      });
  };
};
