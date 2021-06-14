import {
  ExportCardActionTypes,
  ExportCardState,
  EXPORT_CARD_VISIBILITY_HIDDEN,
  EXPORT_CARD_VISIBILITY_SHOW,
} from "../types";

const initialState: ExportCardState = {
  open: false,
};

const exportCardReducer = (
  state = initialState,
  action: ExportCardActionTypes
): ExportCardState => {
  switch (action.type) {
    case EXPORT_CARD_VISIBILITY_SHOW:
      return { ...state, open: true };

    case EXPORT_CARD_VISIBILITY_HIDDEN:
      return { ...state, open: false };

    default:
      return state;
  }
};

export default exportCardReducer;
