import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GiftRankingSection from '@/sections/GiftRankingSection';
import { BrowserRouter } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme/theme';
import { server } from '@/mocks/test/server';
import { http, HttpResponse } from 'msw';

const renderGiftRanking = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <GiftRankingSection />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('GiftRankingSection 단위 테스트', () => {
  test('초기 렌더링 시 제목과 로딩 스피너가 보인다', async () => {
    window.history.pushState({}, '', '/?targetType=ALL&rankType=MANY_WISH');
    renderGiftRanking();

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
    expect(screen.getByTestId('spinner')).toBeInTheDocument();

    await waitFor(() => {
      const el = screen.getByRole('img', { name: /부드러운 고구마 라떼 케이크/i });
      expect(el).toBeInTheDocument();
    });
  });

  test('필터 및 탭 변경 시 변경된 상품이 보인다', async () => {
    window.history.pushState({}, '', '/?targetType=FEMALE&rankType=MANY_GIFT');
    renderGiftRanking();

    await waitFor(() => {
      const el = screen.getByRole('img', { name: /황올반\+BBQ양념반\+콜라1\.25L/i });
      expect(el).toBeInTheDocument();
    });
  });

  test('상품이 없을 때 안내 메시지가 표시된다', async () => {
    window.history.pushState({}, '', '/?targetType=TEEN&rankType=MANY_WISH');
    server.use(
      http.get('/api/products/ranking', () => HttpResponse.json({ data: [] }, { status: 200 })),
    );

    renderGiftRanking();

    await waitFor(() => {
      expect(screen.getByText('상품이 없습니다.')).toBeInTheDocument();
    });
  });

  test('더보기 버튼 클릭 시 상품이 추가로 렌더링된다', async () => {
    window.history.pushState({}, '', '/?targetType=ALL&rankType=MANY_WISH');
    renderGiftRanking();

    const initialItems = await waitFor(() => {
      const items = screen.getAllByRole('img');
      if (items.length === 0) throw new Error('no images yet');
      return items;
    });

    expect(initialItems.length).toBeLessThan(12);

    const moreButton = screen.getByRole('button', { name: /더보기/i });
    await userEvent.click(moreButton);

    await waitFor(() => {
      const afterClickItems = screen.getAllByRole('img');
      expect(afterClickItems.length).toBeGreaterThan(initialItems.length);
    });
  });
});
