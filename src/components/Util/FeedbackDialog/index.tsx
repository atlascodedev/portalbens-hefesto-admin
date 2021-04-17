import React from "react";
import AtlasBackdrop from "../AtlasBackdrop";
import FeedbackDialogLayout, { FeedbackDialogLayoutProps } from "./styles";

interface Props extends FeedbackDialogLayoutProps {
  open: boolean;
  onClose: (...args: any[]) => void;
  closeFn: (open: boolean) => void;
}

const FeedbackDialog = ({
  closeFn,
  onClose,
  callback,
  open,
  message,
  severity,
  title,
}: Props) => {
  return (
    <AtlasBackdrop closeFn={closeFn} onClose={onClose} open={open}>
      <FeedbackDialogLayout
        message={message}
        severity={severity}
        title={title}
        closeFn={closeFn}
        callback={callback}
      />
    </AtlasBackdrop>
  );
};

export default FeedbackDialog;
