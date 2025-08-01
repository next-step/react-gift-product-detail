import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import RankingSection from '@/components/main/RankingSection';
import { UserProvider } from '@/contexts/UserContext';
import { PRODUCTS_PUB_DATA } from '@/mocks/tests';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

const renderWithProviders = () => {
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

describe('RankingSection (MSW)', () => {
  it('초기 상품 목록이 표시된다', async () => {
    renderWithProviders();
    expect(await screen.findByText('실시간 급상승 선물랭킹')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(PRODUCTS_PUB_DATA[0].name)).toBeInTheDocument();
    });
  });

  it('랭크 탭을 누르면 상품이 변경된다', async () => {
    renderWithProviders();

    const tab = await screen.findByText('받고 싶어한');
    fireEvent.click(tab);

    await waitFor(() => {
      expect(screen.getByText(PRODUCTS_PUB_DATA[6].name)).toBeInTheDocument();
    });
  });

  it('성별 탭을 누르면 해당 성별 상품이 표시된다', async () => {
    renderWithProviders();

    const teenTab = await screen.findByText('청소년이');
    fireEvent.click(teenTab);

    await waitFor(() => {
      expect(screen.getByText(PRODUCTS_PUB_DATA[9].name)).toBeInTheDocument();
    });
  });

  it('더보기 버튼을 누르면 전체 상품이 표시된다', async () => {
    renderWithProviders();

    const toggle = await screen.findByText('더보기');
    fireEvent.click(toggle);

    await waitFor(() => {
      expect(screen.getByText(PRODUCTS_PUB_DATA[5].name)).toBeInTheDocument();
    });
  });

  it('"상품이 없습니다" 메시지를 표시한다', async () => {
    server.use(
      http.get('http://localhost:3000/api/products/ranking', () => {
        return HttpResponse.json({ data: [] });
      })
    );

    renderWithProviders();

    expect(await screen.findByText('상품이 없습니다.')).toBeInTheDocument();
  });
});
