import React from "react";

const LoadingSpinner = () => {
  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-primary"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
