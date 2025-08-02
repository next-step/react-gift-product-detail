// src/pages/ProductDetailContent.test.tsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProductDetailContent from './ProductDetailContent';

const PRODUCT_ID = '42';
const dummyInfo = {
  imageURL: 'https://example.com/img.png',
  name: '테스트 상품',
  price: { sellingPrice: 12345 },
};
const dummyDetail = {
  description: '<p>상품 설명입니다</p>',
  announcement: [
    { name: 'B', value: 'b', displayOrder: 2 },
    { name: 'A', value: 'a', displayOrder: 1 },
  ],
};
const dummyReviews= [
  { id: 'r1', authorName: '철수', content: '좋아요!' },
  { id: 'r2', authorName: '영희', content: '별로예요' },
];
const dummyWish = { wishCount: 3, isWished: false };

const server = setupServer(
  rest.get(`/api/products/${PRODUCT_ID}`, (_req, res, ctx) =>
    res(ctx.json({ data: dummyInfo }))
  ),
  rest.get(`/api/products/${PRODUCT_ID}/detail`, (_req, res, ctx) =>
    res(ctx.json({ data: dummyDetail }))
  ),
  rest.get(`/api/products/${PRODUCT_ID}/highlight-review`, (_req, res, ctx) =>
    res(ctx.json({ data: { reviews: dummyReviews } }))
  ),
  rest.get(`/api/products/${PRODUCT_ID}/wish`, (_req, res, ctx) =>
    res(ctx.json({ data: dummyWish }))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

function renderWithClient() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[`/product/${PRODUCT_ID}`]}>
        <Routes>
          <Route path="/product/:productId" element={<ProductDetailContent />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe('ProductDetailContent 비즈니스 로직', () => {
  it('로딩 중에는 “로딩 중…” 문구를 보여준다', async () => {
    server.use(
      rest.get(`/api/products/${PRODUCT_ID}`, (_req, res, ctx) =>
        res(ctx.delay(200), ctx.json({ data: dummyInfo }))
      )
    );

    renderWithClient();
    expect(screen.getByText('로딩 중…')).toBeInTheDocument();
  });

  it('에러가 발생하면 에러 메시지를 보여준다', async () => {
    server.use(
      rest.get(`/api/products/${PRODUCT_ID}`, (_req, res, ctx) =>
        res(ctx.status(500))
      )
    );

    renderWithClient();
    await waitFor(() =>
      expect(
        screen.getByText('데이터 로딩 중 오류가 발생했습니다.')
      ).toBeInTheDocument()
    );
  });

  it('기본 정보, 설명·리뷰·상세정보 탭, 정렬, 찜하기를 정상 동작시킨다', async () => {
    renderWithClient();

    await waitFor(() => expect(screen.queryByText('로딩 중…')).not.toBeInTheDocument());

    expect(screen.getByRole('img')).toHaveAttribute('src', dummyInfo.imageURL);
    expect(screen.getByText(dummyInfo.name)).toBeInTheDocument();
    expect(screen.getByText('12,345원')).toBeInTheDocument();

    expect(screen.getByText('상품 설명입니다')).toBeInTheDocument();

    fireEvent.click(screen.getByText('선물후기'));
    expect(screen.getByText('철수')).toBeInTheDocument();
    expect(screen.getByText(/좋아요!/)).toBeInTheDocument();
    expect(screen.getByText('영희')).toBeInTheDocument();
    expect(screen.getByText(/별로예요/)).toBeInTheDocument();

    fireEvent.click(screen.getByText('상세정보'));
    const items = screen.getAllByRole('listitem');
    expect(items[0]).toHaveTextContent('A');
    expect(items[1]).toHaveTextContent('B');

    const wishBtn = screen.getByRole('button', { name: /🤍 3/ });
    expect(wishBtn).toBeEnabled();

    fireEvent.click(wishBtn);
    const updatedWishBtn = await screen.findByRole('button', { name: /❤️/ });
    expect(updatedWishBtn).toHaveTextContent('4');
  });
});
