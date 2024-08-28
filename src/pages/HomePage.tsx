import React from "react";
import { MyGridLayout } from "../components/GridLayout";

export const HomePage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold">Welcome to the Home Page</h1>
      <p className="mt-4">This is the home page content.</p>
      <div className="w-full"></div>
      <MyGridLayout />
    </div>
  );
};
