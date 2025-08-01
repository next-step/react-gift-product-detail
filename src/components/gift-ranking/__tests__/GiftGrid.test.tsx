import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import GiftGrid from '../GiftGrid';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0, 
      },
    },
  });

const renderGiftGrid = () => {
  const queryClient = createTestQueryClient();

  render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <GiftGrid category="BIRTHDAY" gender="FEMALE" />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};
describe('GiftGrid 컴포넌트', () => {
  it('상품 목록을 렌더링한다 (상품 1, 상품 2)', async () => {
    renderGiftGrid();

    await waitFor(() => {
      expect(screen.queryByText(/로딩 중/i)).not.toBeInTheDocument();
    });

    expect(await screen.findByText('상품 1')).toBeInTheDocument();
    expect(await screen.findByText('상품 2')).toBeInTheDocument();
  });

  it('"더보기" 버튼이 렌더링된다', async () => {
    renderGiftGrid();

    await waitFor(() => {
      expect(screen.queryByText(/로딩 중/i)).not.toBeInTheDocument();
    });

    expect(await screen.findByRole('button', { name: /더보기/i })).toBeInTheDocument();
  });
});
