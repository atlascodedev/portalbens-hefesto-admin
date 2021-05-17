export const CARD_COLLECTION_UPDATE_START = "CARD_COLLECTION_UPDATE_START";
export const CARD_COLLECTION_UPDATE_SUCCESS = "CARD_COLLECTION_UPDATE_SUCCESS";
export const CARD_COLLECTION_UPDATE_FAIL = "CARD_COLLECTION_UPDATE_FAIL";

export interface CardCollectionItem {
  cardNotes?: string;
  administradora: string;
  cardType: "Imóvel" | "Automóvel";
  cardValor: string;
  cardEntrada: string;
  cardDestaque: boolean;
  cardSituation: boolean;
  cardExpire: string;
  cardInstallment: Array<{
    installmentMonths: string;
    installmentValue: number;
  }>;
}

interface CardCollectionUpdateStart {
  type: typeof CARD_COLLECTION_UPDATE_START;
}

interface CardCollectionUpdateSuccess {
  type: typeof CARD_COLLECTION_UPDATE_SUCCESS;
}

interface CardCollectionUpdateFail {
  type: typeof CARD_COLLECTION_UPDATE_FAIL;
}

export type CardCollectionUpdateActionTypes =
  | CardCollectionUpdateStart
  | CardCollectionUpdateSuccess
  | CardCollectionUpdateFail;

export const CARD_COLLECTION_CHECK_START = "CARD_COLLECTION_CHECK_START";
export const CARD_COLLECTION_CHECK_SUCCESS = "CARD_COLLECTION_CHECK_SUCCESS";
export const CARD_COLLECTION_CHECK_FAIL = "CHECK_COLLECTION_CHECK_FAIL";

interface CardCollectionCheckStart {
  type: typeof CARD_COLLECTION_CHECK_START;
}

interface CardCollectionCheckSucess {
  type: typeof CARD_COLLECTION_CHECK_SUCCESS;
  payload: {
    allCards: CardCollectionItem[];
    expiredCards: CardCollectionItem[];
    unexpiredCards: CardCollectionItem[];
  };
}

interface CardCollectionCheckFail {
  type: typeof CARD_COLLECTION_CHECK_FAIL;
  payload: {
    error: string;
  };
}

export type CardCollectionCheckActionTypes =
  | CardCollectionCheckStart
  | CardCollectionCheckSucess
  | CardCollectionCheckFail;

export interface CardCollectionState {
  cards: any;
  cardsExpired: any;
  cardsUnexpired: any;
  searching: boolean;
}

export type CardCollectionActionTypes =
  | CardCollectionCheckActionTypes
  | CardCollectionUpdateActionTypes;
