import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { Global, ThemeProvider } from "@emotion/react";
import { GlobalResetStyle } from "@styles/index";
import { theme } from "@styles/index";
import { Container } from "@/components/layout/Container";

async function enableMocking() {
  if (import.meta.env.VITE_ENABLE_MSW === "true") {
    const { client } = await import("./__mock__/client.ts");
    return client.start({});
  }
}

enableMocking().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <Global styles={GlobalResetStyle} />
        <Container>
          <App />
        </Container>
      </ThemeProvider>
    </StrictMode>,
  );
});
