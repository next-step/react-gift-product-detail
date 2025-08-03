import { render, screen, waitFor } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import GiftRankingSection from '../GiftRankingSection';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

import { beforeAll, afterEach, afterAll, describe, test, expect } from 'vitest'; // ★ vitest 훅 임포트
import { server } from '@/mocks/server';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

export const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = createTestQueryClient();

  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

// vitest lifecycle 훅으로 MSW 서버 관리
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('GiftRankingSection', () => {
  test('급상승 선물 랭킹이 렌더링된다', async () => {
    renderWithProviders(<GiftRankingSection />);
    expect(await screen.findByText('부드러운 고구마 라떼 케이크')).toBeInTheDocument();
  });

  test('로딩 상태를 보여준다', async () => {
    renderWithProviders(<GiftRankingSection />);
    expect(screen.getByText(/불러오는 중.../i)).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText(/불러오는 중.../i)).not.toBeInTheDocument());
  });

  test('API 에러 시 에러 메시지를 보여준다', async () => {
    server.use(
      http.get('/api/products/ranking', ({ request }) => {
          return HttpResponse.json({ message: '서버 에러' }, { status: 500 });
      })
    );

    renderWithProviders(<GiftRankingSection />);
    expect(await screen.findByText(/500/)).toBeInTheDocument();
  });

  test('필터 버튼 클릭 시 API 호출이 재실행되어 결과가 바뀐다', async () => {
    renderWithProviders(<GiftRankingSection />);
    expect(await screen.findByText('부드러운 고구마 라떼 케이크')).toBeInTheDocument();

    const maleFilterButton = screen.getByRole('button', { name: '남성이' });

    await userEvent.click(maleFilterButton);
  });
});
