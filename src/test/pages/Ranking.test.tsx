import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import Ranking from '@/Layout/Ranking';
import type { SexType } from '@/types/sex';
import type { CategoryType } from '@/types/category';
import type { ProductBasicInfo } from '@/types/DTO/productDTO';

vi.mock('@/pages/SexContainer', () => ({
  default: ({ handleSelect }: { handleSelect: (sex: SexType) => void }) => (
    <div data-testid="sex-container">
      <button onClick={() => handleSelect('ALL')}>전체</button>
      <button onClick={() => handleSelect('MALE')}>남성</button>
      <button onClick={() => handleSelect('FEMALE')}>여성</button>
    </div>
  ),
}));

vi.mock('@/pages/CategoryContainer', () => ({
  default: ({ handleCategoryClick }: { handleCategoryClick: (category: CategoryType) => void }) => (
    <div data-testid="category-container">
      <button onClick={() => handleCategoryClick('MANY_WISH')}>인기</button>
      <button onClick={() => handleCategoryClick('MANY_RECEIVE')}>많이 선물한</button>
    </div>
  ),
}));

vi.mock('@/pages/ItemContainer', () => ({
  default: ({ itemList }: { itemList: ProductBasicInfo[] }) => (
    <div data-testid="item-container">
      {Array.isArray(itemList) &&
        itemList?.map((item: ProductBasicInfo) => (
          <div key={item.id} data-testid={`item-${item.id}`}>
            {item.name} - {item.price.basicPrice}원
          </div>
        ))}
    </div>
  ),
}));

const renderRankingWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>{component}</BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

describe('실시간 급상승 선물랭킹 테스트', () => {
  describe('정상적인 데이터 로딩', () => {
    it('랭킹 컴포넌트가 올바르게 렌더링되어야 한다', async () => {
      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
        expect(screen.getByTestId('sex-container')).toBeInTheDocument();
        expect(screen.getByTestId('category-container')).toBeInTheDocument();
        expect(screen.getByTestId('item-container')).toBeInTheDocument();
      });
    });

    it('랭킹 데이터가 성공적으로 로드되어야 한다', async () => {
      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        expect(screen.getByText('상품 1 - 1000원')).toBeInTheDocument();
        expect(screen.getByText('상품 2 - 2000원')).toBeInTheDocument();
        expect(screen.getByText('상품 3 - 3000원')).toBeInTheDocument();
      });
    });
  });

  describe('로딩 상태', () => {
    it('데이터 로딩 중 로딩 메시지가 표시되어야 한다', () => {
      server.use(
        http.get('/api/products/ranking', async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({ data: [] });
        }),
      );

      renderRankingWithProviders(<Ranking />);

      expect(screen.getByText('로딩중입니다.')).toBeInTheDocument();
    });
  });

  describe('에러 상태', () => {
    it('API 에러 시 에러 메시지가 표시되어야 한다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.error();
        }),
      );

      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        expect(screen.getByText(/Error:/)).toBeInTheDocument();
      });
    });
  });

  describe('성별 선택', () => {
    it('성별 선택 버튼이 올바르게 렌더링되어야 한다', async () => {
      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        expect(screen.getByText('전체')).toBeInTheDocument();
        expect(screen.getByText('남성')).toBeInTheDocument();
        expect(screen.getByText('여성')).toBeInTheDocument();
      });
    });
  });

  describe('카테고리 선택', () => {
    it('카테고리 선택 버튼이 올바르게 렌더링되어야 한다', async () => {
      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        expect(screen.getByText('인기')).toBeInTheDocument();
        expect(screen.getByText('많이 선물한')).toBeInTheDocument();
      });
    });
  });

  describe('상품 목록', () => {
    it('상품 아이템이 올바르게 렌더링되어야 한다', async () => {
      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        expect(screen.getByTestId('item-1')).toBeInTheDocument();
        expect(screen.getByTestId('item-2')).toBeInTheDocument();
        expect(screen.getByTestId('item-3')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('랭킹 제목이 적절한 스타일을 가져야 한다', async () => {
      renderRankingWithProviders(<Ranking />);

      await waitFor(() => {
        const title = screen.getByText('실시간 급상승 선물랭킹');
        expect(title).toBeInTheDocument();
      });
    });
  });
});
