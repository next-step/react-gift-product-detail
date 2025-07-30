import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { theme } from '@/styles/theme/theme';
import type { ReactElement } from "react";

export function renderWithTheme(ui: ReactElement) {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </QueryClientProvider>
  );
}


