import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ThemeProvider } from '@emotion/react';
import {theme} from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import ProductRankingListSection from './index';

const server = setupServer(
  rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
    res(ctx.json([]))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithProviders = () => {
  const qc = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ProductRankingListSection />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('ProductRankingListSection (간소화)', () => {
  it('로딩 상태를 보여준다', () => {
    // 응답에 딜레이를 줘서 로딩 UI가 보이게 함
    server.use(
      rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
        res(ctx.delay(100), ctx.json([]))
      )
    );

    renderWithProviders();
    expect(screen.getByText('로딩 중…')).toBeInTheDocument();
  });

  it('에러가 발생하면 에러 메시지를 보여준다', async () => {
    server.use(
      rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    renderWithProviders();
    await waitFor(() =>
      expect(
        screen.getByText('랭킹을 불러오는 중 오류가 발생했습니다.')
      ).toBeInTheDocument()
    );
  });
});
