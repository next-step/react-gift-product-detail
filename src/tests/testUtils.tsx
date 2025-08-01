import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import theme from '@/styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { UserProvider } from '@/contexts/UserContext';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderCustom = (ui: ReactNode) => {
  const queryClient = createTestQueryClient();

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <UserProvider>
            {ui}
            <ToastContainer position="top-center" autoClose={2000} />
          </UserProvider>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
