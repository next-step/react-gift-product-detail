import { AuthProvider } from "@/contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/theme";
import { ToastContainer } from "react-toastify";

export const TestWrapper = ({ children }: { children: React.ReactNode }) => (
    <BrowserRouter>
      <QueryClientProvider client={new QueryClient()}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            {children}
            <ToastContainer />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );