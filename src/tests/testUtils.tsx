import { render } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import theme from '@/styles/theme';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import type { ReactNode } from 'react';
import { UserProvider } from '@/contexts/UserContext';
import RankingSection from '@/components/main/RankingSection';

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

export const renderCustom2 = () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <RankingSection />
          </ThemeProvider>
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  );
};
