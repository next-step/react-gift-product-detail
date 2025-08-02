import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';
import RankingSection from '../pages/Home/components/RankingSection/RankingSection';
import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';
import { UserManagementProvider } from '../pages/Login/contexts/UserManagement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// 1) mock 데이터 20개 생성
const mockRankingItems = Array.from({ length: 20 }).map((_, i) => ({
  id: i + 1,
  name: `상품 ${i + 1}`,
  price: {
    basicPrice: 10000 + i * 1000,
    sellingPrice: 9000 + i * 900,
    discountRate: 10,
  },
  imageURL: `https://placehold.it/150x150?text=상품${i + 1}`,
  brandInfo: {
    id: 1,
    name: '브랜드A',
    imageURL: '',
  },
}));

// 2) 수정된 MSW 핸들러
const server = setupServer(
  http.get('/api/products/ranking', () => {
    return HttpResponse.json({ data: mockRankingItems });
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const mockUser = {
  authToken: 'mock-token',
  email: 'test@example.com',
  name: '테스트 유저',
};

const setupLocalStorageUser = () => {
  localStorage.setItem('kakao-login-user', JSON.stringify(mockUser));
};

const renderWithProviders = () => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <UserManagementProvider>
            <RankingSection />
          </UserManagementProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('RankingSection', () => {
  beforeEach(() => {
    localStorage.clear();
    setupLocalStorageUser();
  });

  it('초기 렌더링 시 상품이 6개만 보여진다', async () => {
    renderWithProviders();
    expect(screen.getByText(/로딩 중.../)).toBeInTheDocument();

    await waitFor(() => {
      const items = screen.getAllByText(/상품 \d+/);
      expect(items.length).toBe(6);
    });

    expect(screen.getByRole('button', { name: /더보기/ })).toBeInTheDocument();
  });

  it('"더보기" 버튼 클릭 시 전체 상품이 모두 보여진다', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getAllByText(/상품 \d+/).length).toBe(6);
    });

    fireEvent.click(screen.getByRole('button', { name: /더보기/ }));

    await waitFor(() => {
      expect(screen.getAllByText(/상품 \d+/).length).toBe(20);
    });

    expect(screen.getByRole('button', { name: /접기/ })).toBeInTheDocument();
  });

  it('"접기" 버튼 클릭 시 다시 6개만 보여진다', async () => {
    renderWithProviders();

    await waitFor(() => {
      expect(screen.getAllByText(/상품 \d+/).length).toBe(6);
    });

    fireEvent.click(screen.getByRole('button', { name: /더보기/ }));

    await waitFor(() => {
      expect(screen.getAllByText(/상품 \d+/).length).toBe(20);
    });

    fireEvent.click(screen.getByRole('button', { name: /접기/ }));

    await waitFor(() => {
      expect(screen.getAllByText(/상품 \d+/).length).toBe(6);
    });

    expect(screen.getByRole('button', { name: /더보기/ })).toBeInTheDocument();
  });
});
