import {
  CardCollectionActionTypes,
  CardCollectionState,
  CARD_COLLECTION_CHECK_FAIL,
  CARD_COLLECTION_CHECK_START,
  CARD_COLLECTION_CHECK_SUCCESS,
} from "../types";

const initialState: CardCollectionState = {
  cards: [],
  cardsExpired: [],
  cardsUnexpired: [],
  searching: false,
};

export const cardCollectionReducer = (
  state = initialState,
  action: CardCollectionActionTypes
): CardCollectionState => {
  switch (action.type) {
    case CARD_COLLECTION_CHECK_START:
      return { ...state, searching: true };

    case CARD_COLLECTION_CHECK_SUCCESS:
      return {
        ...state,
        searching: false,
        cards: action.payload.allCards,
        cardsExpired: action.payload.expiredCards,
        cardsUnexpired: action.payload.unexpiredCards,
      };

    case CARD_COLLECTION_CHECK_FAIL:
      return { ...state, searching: false };

    default:
      return state;
  }
};
