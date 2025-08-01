import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App.tsx";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW === "true") {
    console.log("Enabling Mock Service Worker...");
    const { worker } = await import("./mocks/browser");
    console.log("Mock Service Worker is enabled");
    return worker.start();
  }
}

enableMocking().then(() => {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("Root element not found");

  createRoot(rootElement).render(
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
