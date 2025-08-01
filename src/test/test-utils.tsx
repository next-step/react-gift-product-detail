import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import { Spinner } from "@/components/common/Spinner";

export const renderWithTheme = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();

  return render(
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Suspense fallback={<Spinner withWrapper />}>
            {ui}
          </Suspense>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
};
