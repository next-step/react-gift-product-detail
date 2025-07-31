import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ProductList from '../ProductList';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock AuthContext
vi.mock('@/contexts/AuthContext', () => ({
  useAuth: () => ({
    user: { id: 1, name: '테스트 사용자' },
  }),
}));

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderProductList = () => {
  const queryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ProductList />
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('ProductList 컴포넌트 (MSW 테스트)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('트렌딩 선물 랭킹 데이터가 올바르게 로드되어야 한다', async () => {
    renderProductList();

    // 데이터 로드 후 확인
    await waitFor(() => {
      expect(screen.getByText('트렌딩 선물 1')).toBeInTheDocument();
      expect(screen.getByText('트렌딩 선물 2')).toBeInTheDocument();
      expect(screen.getByText('트렌딩 선물 3')).toBeInTheDocument();
    });
  });

  it('랭킹 배지가 올바르게 표시되어야 한다', async () => {
    renderProductList();

    await waitFor(() => {
      // 1등, 2등, 3등 배지 확인
      expect(screen.getByText('1')).toBeInTheDocument();
      expect(screen.getByText('2')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  it('상품 가격이 올바르게 표시되어야 한다', async () => {
    renderProductList();

    await waitFor(() => {
      expect(screen.getByText('50,000 원')).toBeInTheDocument();
      expect(screen.getByText('30,000 원')).toBeInTheDocument();
      expect(screen.getByText('70,000 원')).toBeInTheDocument();
    });
  });

  it('상품 클릭 시 상품 상세 페이지로 이동해야 한다', async () => {
    renderProductList();

    await waitFor(() => {
      const firstProduct = screen.getByText('트렌딩 선물 1');
      fireEvent.click(firstProduct.closest('li')!);

      expect(mockNavigate).toHaveBeenCalledWith('/products/1');
    });
  });

  it('더보기 버튼이 올바르게 작동해야 한다', async () => {
    renderProductList();

    await waitFor(() => {
      const moreButton = screen.getByText('더보기');
      expect(moreButton).toBeInTheDocument();

      fireEvent.click(moreButton);

      // 접기 버튼으로 변경되어야 함
      expect(screen.getByText('접기')).toBeInTheDocument();
    });
  });

  it('접기 버튼이 올바르게 작동해야 한다', async () => {
    renderProductList();

    await waitFor(() => {
      const moreButton = screen.getByText('더보기');
      fireEvent.click(moreButton);

      const foldButton = screen.getByText('접기');
      fireEvent.click(foldButton);

      // 더보기 버튼으로 다시 변경되어야 함
      expect(screen.getByText('더보기')).toBeInTheDocument();
    });
  });

  it('상품 이미지가 올바르게 표시되어야 한다', async () => {
    renderProductList();

    await waitFor(() => {
      const images = screen.getAllByRole('img');
      expect(images).toHaveLength(3);

      // 각 이미지의 alt 텍스트 확인
      expect(images[0]).toHaveAttribute('alt', '트렌딩 선물 1');
      expect(images[1]).toHaveAttribute('alt', '트렌딩 선물 2');
      expect(images[2]).toHaveAttribute('alt', '트렌딩 선물 3');
    });
  });

  it('showRank가 false일 때 랭킹 배지가 표시되지 않아야 한다', async () => {
    const queryClient = createTestQueryClient();
    render(
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ProductList showRank={false} />
        </BrowserRouter>
      </QueryClientProvider>,
    );

    await waitFor(() => {
      expect(screen.queryByText('1')).toBeNull();
      expect(screen.queryByText('2')).toBeNull();
      expect(screen.queryByText('3')).toBeNull();
    });
  });
});
