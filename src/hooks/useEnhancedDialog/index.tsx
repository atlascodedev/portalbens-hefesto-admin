import React from "react";
import FeedbackDialog from "../../components/Util/FeedbackDialog";
import { FeedbackSeverity } from "../../components/Util/FeedbackDialog/styles";

interface EnhancedDialog {
  readonly visibility: boolean;
  toggleVisibility: (open: boolean) => void;
  setCallback: (callback: (...args: any[]) => void) => void;
  EnhancedDialog: () => JSX.Element;
}

const useEnhancedDialog = (
  title: string,
  message: string,
  severity: FeedbackSeverity
): EnhancedDialog => {
  const [dialogVisibility, setDialogVisibility] = React.useState<boolean>(
    false
  );

  const [dialogCallback, setDialogCallback] = React.useState<
    ((...args: any[]) => void) | null
  >(null);

  const toggleDialogVisibility = (open: boolean) => {
    setDialogVisibility(open);
  };

  const handleDialogCallback = (callback: (...args: any[]) => void) => {
    setDialogCallback(callback);
  };

  const EnhancedDialog = () => {
    return (
      <FeedbackDialog
        closeFn={() => toggleDialogVisibility(false)}
        open={dialogVisibility}
        callback={dialogCallback}
        message={message}
        severity={severity}
        title={title}
      />
    );
  };

  return {
    EnhancedDialog: EnhancedDialog,
    setCallback: handleDialogCallback,
    toggleVisibility: toggleDialogVisibility,
    visibility: dialogVisibility,
  };
};

export default useEnhancedDialog;
