import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { ThemeProvider } from '@emotion/react';
import {theme} from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { renderWithProviders } from '@/test-utils';
import ProductRankingListSection from './index';

const server = setupServer(
  rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
    res(ctx.json([]))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductRankingListSection', () => {
  it('로딩 상태를 보여준다', () => {
    server.use(
      rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
        res(ctx.delay(100), ctx.json([]))
      )
    );

    renderWithProviders(<ProductRankingListSection />);
    expect(screen.getByText('로딩 중…')).toBeInTheDocument();
  });

  it('에러가 발생하면 에러 메시지를 보여준다', async () => {
    server.use(
      rest.get(/\/api\/products\/ranking.*/, (_req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    renderWithProviders(<ProductRankingListSection />);
    await waitFor(() =>
      expect(
        screen.getByText('랭킹을 불러오는 중 오류가 발생했습니다.')
      ).toBeInTheDocument()
    );
  });
});