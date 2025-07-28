import { createRoot } from "react-dom/client";
import "@src/index.css";
import App from "@src/App.tsx";

if (import.meta.env.VITE_MSW_MOCK === "true") {
  const { worker } = await import("@src/mock/msw/client");
  worker.start();
}

createRoot(document.getElementById("root")!).render(
  //Strict mode disabled for preventing double calls for useEffect
  // <StrictMode>
  //   <App />
  // </StrictMode>
  <App />
);
