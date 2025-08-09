import React from "react";

import { sideBardata } from "../constant";

interface StepHeaderProps {
  Step: number;
}

const StepHeader = ({ Step }: StepHeaderProps) => {
  return (
    <div>
      {sideBardata[Step - 1] && (
        <div className="flex flex-col items-center mb-10 space-y-2">
          {React.createElement(sideBardata[Step - 1].icon)}
          <h1 className="font-bold text-primary text-2xl text-center">
            {sideBardata[Step - 1].title}
          </h1>
          <p className="text-primary-foreground text-sm text-center">
            {sideBardata[Step - 1].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default StepHeader;
