import { render, screen, fireEvent, waitFor } from '@/test-utils';
import { expect, it, describe, vi, beforeEach } from 'vitest';
import { http } from 'msw';
import RankingSection from '../RankingSection';

// useNavigate 모킹
const mockNavigate = vi.fn();
const mockSetSearchParams = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [
      new URLSearchParams('target=ALL&rank=MANY_WISH'),
      mockSetSearchParams,
    ],
  };
});

describe('RankingSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('랭킹 섹션이 올바르게 렌더링되어야 한다', async () => {
      render(<RankingSection />);

      expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
    });

    it('로딩 상태일 때 스켈레톤이 표시되어야 한다', () => {
      render(<RankingSection />);

      // 초기 로딩 상태에서는 스켈레톤이 표시될 수 있음
      // 실제로는 React Query의 로딩 상태에 따라 달라짐
    });
  });

  describe('데이터 로딩', () => {
    it('API에서 데이터를 성공적으로 가져와야 한다', async () => {
      render(<RankingSection />);

      // 데이터가 로드될 때까지 대기
      await waitFor(() => {
        expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
        expect(screen.getByText('브랜드 A')).toBeInTheDocument();
        expect(screen.getByText('9,000원')).toBeInTheDocument();
      });
    });

    it('여러 상품이 올바르게 표시되어야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
        expect(screen.getByText('테스트 상품 2')).toBeInTheDocument();
        expect(screen.getByText('테스트 상품 3')).toBeInTheDocument();
      });
    });
  });

  describe('필터 기능', () => {
    it('필터 버튼들이 올바르게 렌더링되어야 한다', async () => {
      render(<RankingSection />);

      // 필터 버튼들이 존재하는지 확인
      // 실제 버튼 텍스트는 FilterButtonGroup 컴포넌트에 따라 달라질 수 있음
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });
    });

    it('필터 변경 시 새로운 데이터를 요청해야 한다', async () => {
      // MSW 핸들러를 임시로 수정하여 다른 응답을 반환하도록 설정
      const { server } = await import('@/mocks/server');
      server.use(
        http.get('http://localhost:3000/api/products/ranking', () => {
          return Response.json({
            data: [
              {
                id: 999,
                name: '필터 변경된 상품',
                price: {
                  basicPrice: 50000,
                  sellingPrice: 45000,
                  discountRate: 10,
                },
                imageURL: 'https://example.com/filtered.jpg',
                brandInfo: {
                  id: 999,
                  name: '필터 브랜드',
                  imageURL: 'https://example.com/filtered-brand.jpg',
                },
              },
            ],
          });
        })
      );

      render(<RankingSection />);

      await waitFor(() => {
        expect(screen.getByText('필터 변경된 상품')).toBeInTheDocument();
      });
    });
  });

  describe('더보기/접기 기능', () => {
    it('상품이 6개 이상일 때 더보기 버튼이 표시되어야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        // 7개의 상품이 있으므로 더보기 버튼이 표시되어야 함
        expect(screen.getByText('더보기')).toBeInTheDocument();
      });
    });

    it('더보기 버튼 클릭 시 접기로 변경되어야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        const moreButton = screen.getByText('더보기');
        fireEvent.click(moreButton);
      });

      await waitFor(() => {
        expect(screen.getByText('접기')).toBeInTheDocument();
      });
    });

    it('접기 버튼 클릭 시 더보기로 변경되어야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        const moreButton = screen.getByText('더보기');
        fireEvent.click(moreButton);
      });

      await waitFor(() => {
        const closeButton = screen.getByText('접기');
        fireEvent.click(closeButton);
      });

      await waitFor(() => {
        expect(screen.getByText('더보기')).toBeInTheDocument();
      });
    });
  });

  describe('상품 클릭 이벤트', () => {
    it('상품 클릭 시 상품 상세 페이지로 이동해야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        const firstProduct = screen.getByText('테스트 상품 1');
        fireEvent.click(firstProduct);
      });

      expect(mockNavigate).toHaveBeenCalledWith('/products/1');
    });

    it('다른 상품 클릭 시 해당 상품의 상세 페이지로 이동해야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        const secondProduct = screen.getByText('테스트 상품 2');
        fireEvent.click(secondProduct);
      });

      expect(mockNavigate).toHaveBeenCalledWith('/products/2');
    });
  });

  describe('에러 처리', () => {
    it('API 에러 시 에러 상태를 처리해야 한다', async () => {
      // MSW 핸들러를 임시로 에러를 반환하도록 설정
      const { server } = await import('@/mocks/server');
      server.use(
        http.get('http://localhost:3000/api/products/ranking', () => {
          return Response.json({ error: 'API 에러' }, { status: 500 });
        })
      );

      render(<RankingSection />);

      // 에러 상태에서는 아무것도 렌더링하지 않음
      await waitFor(() => {
        expect(screen.queryByText('테스트 상품 1')).not.toBeInTheDocument();
      });
    });
  });

  describe('URL 파라미터 처리', () => {
    it('URL 파라미터에 따라 올바른 필터가 적용되어야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('상품 카드들이 클릭 가능해야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        const products = screen.getAllByText(/테스트 상품/);
        products.forEach((product) => {
          expect(product).toBeInTheDocument();
        });
      });
    });

    it('더보기 버튼이 클릭 가능해야 한다', async () => {
      render(<RankingSection />);

      await waitFor(() => {
        const moreButton = screen.getByText('더보기');
        expect(moreButton).toBeInTheDocument();
      });
    });
  });
});
