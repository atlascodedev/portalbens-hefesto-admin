import { add } from "date-fns";
import { Dispatch } from "react";
import { Action } from "redux";
import { ThunkAction } from "redux-thunk";
import { RootState } from "../../..";
import { db } from "../../../../firebase";
import {
  CardCollectionCheckActionTypes,
  CardCollectionItem,
  CardCollectionUpdateActionTypes,
  CARD_COLLECTION_CHECK_FAIL,
  CARD_COLLECTION_CHECK_START,
  CARD_COLLECTION_CHECK_SUCCESS,
  CARD_COLLECTION_UPDATE_FAIL,
  CARD_COLLECTION_UPDATE_START,
  CARD_COLLECTION_UPDATE_SUCCESS,
} from "../types";

export const checkAndUpdateExpiredCards = (): ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
> => {
  return async (
    dispatch: Dispatch<
      CardCollectionCheckActionTypes | CardCollectionUpdateActionTypes
    >,
    getState: () => RootState
  ) => {
    dispatch({
      type: CARD_COLLECTION_UPDATE_START,
    });

    db.collection("collections")
      .doc("cartas")
      .collection("entries")
      .get()
      .then((cardSnapshot) => {
        let allCards: CardCollectionItem[] = [];
        let expiredCards: CardCollectionItem[] = [];
        let unexpiredCards: CardCollectionItem[] = [];

        cardSnapshot.forEach((cardDoc) => {
          allCards.push(cardDoc.data() as CardCollectionItem);
        });

        allCards.forEach((card, index: number) => {
          let todayDate = Date.now();
          let cardExpiration = Date.parse(card.cardExpire);

          if (todayDate > cardExpiration) {
            expiredCards.push(card);
          } else {
            unexpiredCards.push(card);
          }
        });

        if (expiredCards.length <= 0) {
          dispatch({
            type: CARD_COLLECTION_UPDATE_SUCCESS,
            payload: {
              message:
                "A checagem foi concluída com sucesso, porém nenhuma carta encontra-se vencida",
            },
          });
          return;
        }
        expiredCards.forEach((cardExpired, index) => {
          db.collection("collections")
            .doc("cartas")
            .collection("entries")
            .where("uuid", "==", cardExpired.uuid)
            .get()
            .then((expiredCardSnapshot) => {
              expiredCardSnapshot.forEach((cardExpiredDoc) => {
                let currentCard: CardCollectionItem = {
                  ...(cardExpiredDoc.data() as CardCollectionItem),
                };

                let updateCard: CardCollectionItem = {
                  ...currentCard,
                  cardExpire: add(Date.parse(currentCard.cardExpire), {
                    months: 1,
                  }).toJSON(),
                  cardInstallment: [...currentCard.cardInstallment],
                  cardEntrada: (
                    parseInt(currentCard.cardEntrada) +
                    currentCard.cardInstallment[0].installmentValue
                  ).toString(),
                };

                let updatedInstallment =
                  parseInt(currentCard.cardInstallment[0].installmentMonths) -
                  1;

                if (updatedInstallment <= 0) {
                  updateCard.cardInstallment.shift();
                } else {
                  updateCard.cardInstallment[0].installmentMonths =
                    updatedInstallment.toString();
                }
                cardExpiredDoc.ref
                  .update(updateCard)
                  .then(() => {
                    dispatch({
                      type: CARD_COLLECTION_UPDATE_SUCCESS,
                    });
                  })
                  .catch((error) => {
                    dispatch({
                      type: CARD_COLLECTION_UPDATE_FAIL,
                    });
                  })
                  .catch((error) => {
                    dispatch({
                      type: CARD_COLLECTION_UPDATE_FAIL,
                    });
                  });
              });
            })
            .catch((error) => {
              console.log(error);
              dispatch({
                type: CARD_COLLECTION_UPDATE_FAIL,
              });
            });
        });
      });
  };
};
