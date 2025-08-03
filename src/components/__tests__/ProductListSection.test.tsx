import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ProductListSection } from '@/components/ProductListSection';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { productListMock } from '@/data/productListMock';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{ui}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('ProductListSection', () => {
  const setupSuccessHandlers = () => {
    server.use(
      http.get('/api/products/ranking*', () => {
        return HttpResponse.json({ data: productListMock });
      })
    );
  };

  afterEach(() => {
    server.resetHandlers();
  });

  it('초기 렌더링 시 제목과 상품 목록이 올바르게 표시되는지 확인합니다.', async () => {
    setupSuccessHandlers();
    renderWithProviders(<ProductListSection />);

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();

    const firstProduct = productListMock[0];
    expect(await screen.findByText(firstProduct.name)).toBeInTheDocument();

    const productGrid = screen.getByRole('grid');
    const productItems = within(productGrid).getAllByRole('listitem');
    expect(productItems).toHaveLength(6);

    expect(screen.getByRole('button', { name: '더보기' })).toBeInTheDocument();
  });

  it('API 에러 발생 시 에러 메시지를 표시합니다.', async () => {
    server.use(
      http.get('/api/products/ranking*', () => new HttpResponse(null, { status: 500 }))
    );

    renderWithProviders(<ProductListSection />);

    expect(await screen.findByText('상품 목록을 불러오는데 실패했습니다.')).toBeInTheDocument();
  });

  it('상품 목록이 비어있을 때 메시지를 표시합니다.', async () => {
    server.use(http.get('/api/products/ranking*', () => HttpResponse.json({ data: [] })));

    renderWithProviders(<ProductListSection />);

    expect(await screen.findByText('상품 목록이 없습니다.')).toBeInTheDocument();
  });

  it('더보기 버튼 클릭 시 모든 상품을 표시합니다.', async () => {
    setupSuccessHandlers();
    renderWithProviders(<ProductListSection />);

    const moreButton = await screen.findByRole('button', { name: '더보기' });
    await userEvent.click(moreButton);

    await waitFor(() => {
      const productGrid = screen.getByRole('grid');
      const productItems = within(productGrid).getAllByRole('listitem');
      expect(productItems).toHaveLength(10);
    });

    expect(screen.getByRole('button', { name: '접기' })).toBeInTheDocument();
  });

  it('탭 클릭 시 해당 탭의 상품 목록을 불러오는지 확인합니다.', async () => {
    setupSuccessHandlers();
    renderWithProviders(<ProductListSection />);

    const femaleTab = screen.getByRole('tab', { name: '👩 여성이' });
    await userEvent.click(femaleTab);

    const firstProduct = productListMock[0];
    expect(await screen.findByText(firstProduct.name)).toBeInTheDocument();
  });
});
