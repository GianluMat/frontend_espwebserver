import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/HomePage";
import { LightsPage } from "./pages/sensors/LightsPage";
import { SettingsPage } from "./pages/SettingsPage";
import { TempsPage } from "./pages/sensors/TempsPage";

export const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="lights" element={<LightsPage />} />
          <Route path="temperatures" element={<TempsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};
