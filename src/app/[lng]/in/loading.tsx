import React from "react";

const LoadingIn = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="border-main-100 animate-spin rounded-full h-32 w-32 border-t-2 border-b-4 border-main-menu"></div>
    </div>
  );
};

export default LoadingIn;
