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
  setShowAlert: () => void;
  alertDescription: string;
  alertTitle: string;
}

const AlertBox = ({
  showAlert,
  setShowAlert,
  alertDescription,
  alertTitle,
}: AlertBoxProps) => {
  return (
    <div>
      <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
            <AlertDialogDescription>{alertDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AlertBox;
