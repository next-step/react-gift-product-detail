import { vi, describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PresentRanking from '@/components/PresentRanking';
import { theme } from '@/theme/theme';
import { server } from '@/setupTests';
import { http, HttpResponse } from 'msw';

export const navigateSpy = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return { ...actual, useNavigate: () => navigateSpy };
});
vi.mock('@/hooks/useAuth', () => ({ useAuth: () => ({ user: { id: 1 } }) }));

const renderComponent = () => {
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <PresentRanking />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('PresentRanking – 실시간 급상승 선물랭킹', () => {
  it('API 성공 시 카드 6개를 보여주고 클릭하면 상세 페이지로 이동한다', async () => {
    const mockProducts = Array.from({ length: 8 }).map((_, i) => ({
      id: 11526198 + i,
      name: `상품 ${i + 1}`,
      price: { basicPrice: 1000, sellingPrice: 1000, discountRate: 0 },
      imageURL: `https://example.com/prod${i}.jpg`,
      brandInfo: { id: 1, name: '투썸플레이스', imageURL: '' },
    }));

    server.use(http.get('/api/products/ranking', () => HttpResponse.json({ data: mockProducts })));

    renderComponent();

    expect(await screen.findByText('상품 1')).toBeInTheDocument();
    expect(screen.getAllByText(/상품 \d/)).toHaveLength(6);

    await userEvent.click(screen.getByText('상품 1'));
    expect(navigateSpy).toHaveBeenCalledWith('/products/11526198');
  });

  it('200 성공 + 빈 배열 → “상품이 없습니다.” 노출', async () => {
    server.use(http.get('/api/products/ranking', () => HttpResponse.json({ data: [] })));

    renderComponent();

    expect(await screen.findByText('상품이 없습니다.')).toBeInTheDocument();
    expect(screen.queryByText('상품 1')).not.toBeInTheDocument();
  });
});
