import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@eric/react";
import "@eric/tokens/css";
import "./docs.css";
import { App } from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
