import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

interface CustomDropDownProps {
  isModal?: boolean;
  dropdownContent: React.ReactNode;
  dropdownTrigger: React.ReactNode;
}

const CustomDropDown = ({
  isModal,
  dropdownContent = [],
  dropdownTrigger,
}: CustomDropDownProps) => {
  return (
    <div>
      <DropdownMenu modal={isModal}>
        <DropdownMenuTrigger></DropdownMenuTrigger>
        <DropdownMenuContent>
          {Array(dropdownContent).map((item, index) => (
            <DropdownMenuItem key={index}>{item}</DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default CustomDropDown;
