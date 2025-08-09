import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogCancel,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogAction,
} from "./ui/alert-dialog";
import React from "react";

interface AlertBoxProps {
  showAlert: boolean;
  setShowAlert: (show: boolean) => void;
  alertDescription: string;
  alertTitle: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  confirmText?: string;
  cancelText?: string;
}

const AlertBox = ({
  showAlert,
  setShowAlert,
  alertDescription,
  alertTitle,
  onConfirm,
  onCancel,
  confirmText = "Continue",
  cancelText = "Cancel",
}: AlertBoxProps) => {
  const handleCancel = () => {
    setShowAlert(false);
    onCancel?.();
  };

  const handleConfirm = () => {
    setShowAlert(false);
    onConfirm?.();
  };

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>
            {cancelText}
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>
            {confirmText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertBox;
