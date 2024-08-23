import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { TopBar } from "../components/TopBar";

export const MainLayout: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="relative flex-1 flex flex-col">
        <TopBar />
        <div className="relative flex-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
