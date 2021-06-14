import {
  ExportCardVisibilityActionTypes,
  EXPORT_CARD_VISIBILITY_HIDDEN,
  EXPORT_CARD_VISIBILITY_SHOW,
} from "../types";

export const exportCardOpen = (): ExportCardVisibilityActionTypes => {
  return {
    type: EXPORT_CARD_VISIBILITY_SHOW,
  };
};

export const exportCardClose = (): ExportCardVisibilityActionTypes => {
  return {
    type: EXPORT_CARD_VISIBILITY_HIDDEN,
  };
};
