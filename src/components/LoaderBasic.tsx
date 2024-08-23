import React from "react";

export const LoaderBasic: React.FC = () => {
  return (
    <>
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-t-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
      </div>
    </>
  );
};
