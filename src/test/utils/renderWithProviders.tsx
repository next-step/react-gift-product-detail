// src/test/utils/renderWithProviders.tsx

import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/tokens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>{ui}</AuthProvider>
          <ToastContainer position="top-center" autoClose={3000} />
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}
