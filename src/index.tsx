import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { App } from "./App";
import { MqttProvider } from "./context/MqttContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <MqttProvider>
      <App />
    </MqttProvider>
  </React.StrictMode>
);
