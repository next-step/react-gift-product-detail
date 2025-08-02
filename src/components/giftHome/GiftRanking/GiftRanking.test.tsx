
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import GiftRanking from './GiftRanking';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const queryClient = new QueryClient();

describe('GiftRanking', () => {
  test('renders product ranking data', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MemoryRouter>
            <AuthProvider>
              <GiftRanking />
            </AuthProvider>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('테스트 상품')).toBeInTheDocument();
    });
  });
});
