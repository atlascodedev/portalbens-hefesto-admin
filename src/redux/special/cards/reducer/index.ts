import { CardCollectionActionTypes, CardCollectionState } from "../types";

const initialState: CardCollectionState = {
  cards: [],
  cardsExpired: [],
  cardsUnexpired: [],
  searching: false,
};

export const cardCollectionReducer = (
  state = initialState,
  action: CardCollectionActionTypes
) => {
  switch (action.type) {
    default:
      return state;
  }
};
