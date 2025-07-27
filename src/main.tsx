import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App.tsx";
import { AuthProvider } from "@/contexts/AuthContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import ErrorFallback from "./components/common/ErrorFallback";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={<LoadingSpinner />}>
          <AuthProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </AuthProvider>
        </Suspense>
      </ErrorBoundary>
    </QueryClientProvider>
  </StrictMode>
);
