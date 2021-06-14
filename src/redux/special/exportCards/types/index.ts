export const EXPORT_CARD_VISIBILITY_SHOW = "EXPORT_CARD_VISIBILITY_SHOW";
export const EXPORT_CARD_VISIBILITY_HIDDEN = "EXPORT_CARD_VISIBILITY_HIDDEN";

interface ExportCardVisibilityShow {
  type: typeof EXPORT_CARD_VISIBILITY_SHOW;
}

interface ExportCardVisibilityHidden {
  type: typeof EXPORT_CARD_VISIBILITY_HIDDEN;
}

export type ExportCardVisibilityActionTypes =
  | ExportCardVisibilityShow
  | ExportCardVisibilityHidden;

export type ExportCardActionTypes = ExportCardVisibilityActionTypes;

export interface ExportCardState {
  open: boolean;
}
