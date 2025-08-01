import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import RankingSection from '@/Components/RankingSection';
import { server } from '@/test/mocks/server';
import { http, HttpResponse } from 'msw';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('RankingSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('should render ranking section with title', () => {
      render(<RankingSection />);
      
      expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
    });

    it('should render all filter buttons', () => {
      render(<RankingSection />);
      
      expect(screen.getByText('전체')).toBeInTheDocument();
      expect(screen.getByText('남자')).toBeInTheDocument();
      expect(screen.getByText('여자')).toBeInTheDocument();
      expect(screen.getByText('청소년')).toBeInTheDocument();
    });

    it('should render ranking type buttons', () => {
      render(<RankingSection />);
      
      expect(screen.getByText('받고 싶어한')).toBeInTheDocument();
      expect(screen.getByText('많이 선물한')).toBeInTheDocument();
      expect(screen.getByText('위시로 받은')).toBeInTheDocument();
    });
  });

  describe('필터 기능', () => {
    it('should have "전체" filter selected by default', () => {
      render(<RankingSection />);
      
      const allFilter = screen.getByText('전체').closest('button');
      expect(allFilter).toHaveStyle('background: rgb(74, 144, 226)'); // #4A90E2
    });

    it('should change filter when filter button is clicked', async () => {
      render(<RankingSection />);
      
      const maleFilter = screen.getByText('남자').closest('button');
      await userEvent.click(maleFilter!);
      
      expect(maleFilter).toHaveStyle('background: rgb(74, 144, 226)');
    });

    it('should change ranking type when ranking type button is clicked', async () => {
      render(<RankingSection />);
      
      const givenButton = screen.getByText('많이 선물한');
      await userEvent.click(givenButton);
      
      expect(givenButton).toHaveStyle('background: rgb(74, 144, 226)');
    });
  });

  describe('MSW를 사용한 API 테스트', () => {
    it('should display products when API call is successful', async () => {
      // MSW 핸들러 설정
      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                name: '테스트 상품 1',
                imageURL: 'https://via.placeholder.com/200',
                brandInfo: {
                  name: '테스트 브랜드',
                  imageURL: 'https://via.placeholder.com/50'
                },
                price: {
                  sellingPrice: 15000,
                  basicPrice: 20000,
                  discountRate: 25
                },
                rankingType: 'wanted'
              },
              {
                id: 2,
                name: '테스트 상품 2',
                imageURL: 'https://via.placeholder.com/200',
                brandInfo: {
                  name: '테스트 브랜드 2',
                  imageURL: 'https://via.placeholder.com/50'
                },
                price: {
                  sellingPrice: 25000,
                  basicPrice: 30000,
                  discountRate: 17
                },
                rankingType: 'given'
              }
            ]
          });
        })
      );

      render(<RankingSection />);
      
      // 상품들이 로드될 때까지 대기
      await waitFor(() => {
        expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
        expect(screen.getByText('테스트 상품 2')).toBeInTheDocument();
      });
    });

    it('should display product cards with correct information', async () => {
      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                name: '테스트 상품 1',
                imageURL: 'https://via.placeholder.com/200',
                brandInfo: {
                  name: '테스트 브랜드',
                  imageURL: 'https://via.placeholder.com/50'
                },
                price: {
                  sellingPrice: 15000,
                  basicPrice: 20000,
                  discountRate: 25
                },
                rankingType: 'wanted'
              }
            ]
          });
        })
      );

      render(<RankingSection />);
      
      await waitFor(() => {
        expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
        expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
        expect(screen.getByText('15,000원')).toBeInTheDocument();
      });
    });

    it('should show rank badges on product cards', async () => {
      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                name: '테스트 상품 1',
                imageURL: 'https://via.placeholder.com/200',
                brandInfo: {
                  name: '테스트 브랜드',
                  imageURL: 'https://via.placeholder.com/50'
                },
                price: {
                  sellingPrice: 15000,
                  basicPrice: 20000,
                  discountRate: 25
                },
                rankingType: 'wanted'
              }
            ]
          });
        })
      );

      render(<RankingSection />);
      
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
      });
    });

    it('should handle API error gracefully', async () => {
      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.error();
        })
      );

      render(<RankingSection />);
      
      // 에러 상태에서도 기본 UI는 렌더링되어야 함
      expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      expect(screen.getByText('전체')).toBeInTheDocument();
    });
  });

  describe('더보기 기능', () => {
    it('should show "더보기" button when there are more than 6 products', async () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `테스트 상품 ${i + 1}`,
        imageURL: 'https://via.placeholder.com/200',
        brandInfo: {
          name: '테스트 브랜드',
          imageURL: 'https://via.placeholder.com/50'
        },
        price: {
          sellingPrice: 15000,
          basicPrice: 20000,
          discountRate: 25
        },
        rankingType: 'wanted'
      }));

      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({ data: manyProducts });
        })
      );

      render(<RankingSection />);
      
      await waitFor(() => {
        expect(screen.getByText('더보기')).toBeInTheDocument();
      });
    });

    it('should show "접기" button when all products are visible', async () => {
      const manyProducts = Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: `테스트 상품 ${i + 1}`,
        imageURL: 'https://via.placeholder.com/200',
        brandInfo: {
          name: '테스트 브랜드',
          imageURL: 'https://via.placeholder.com/50'
        },
        price: {
          sellingPrice: 15000,
          basicPrice: 20000,
          discountRate: 25
        },
        rankingType: 'wanted'
      }));

      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({ data: manyProducts });
        })
      );

      render(<RankingSection />);
      
      await waitFor(() => {
        const moreButton = screen.getByText('더보기');
        fireEvent.click(moreButton);
        expect(screen.getByText('접기')).toBeInTheDocument();
      });
    });

    it('should not show "더보기" button when there are 6 or fewer products', async () => {
      const fewProducts = Array.from({ length: 5 }, (_, i) => ({
        id: i + 1,
        name: `테스트 상품 ${i + 1}`,
        imageURL: 'https://via.placeholder.com/200',
        brandInfo: {
          name: '테스트 브랜드',
          imageURL: 'https://via.placeholder.com/50'
        },
        price: {
          sellingPrice: 15000,
          basicPrice: 20000,
          discountRate: 25
        },
        rankingType: 'wanted'
      }));

      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({ data: fewProducts });
        })
      );

      render(<RankingSection />);
      
      await waitFor(() => {
        expect(screen.queryByText('더보기')).not.toBeInTheDocument();
      });
    });
  });

  describe('상품 클릭 기능', () => {
    it('should navigate to product detail page when product is clicked', async () => {
      server.use(
        http.get('/api/ranking/products', () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                name: '테스트 상품 1',
                imageURL: 'https://via.placeholder.com/200',
                brandInfo: {
                  name: '테스트 브랜드',
                  imageURL: 'https://via.placeholder.com/50'
                },
                price: {
                  sellingPrice: 15000,
                  basicPrice: 20000,
                  discountRate: 25
                },
                rankingType: 'wanted'
              }
            ]
          });
        })
      );

      render(<RankingSection />);
      
      await waitFor(() => {
        const productCard = screen.getByText('테스트 상품 1');
        fireEvent.click(productCard);
        expect(mockNavigate).toHaveBeenCalledWith('/product/1');
      });
    });
  });

  describe('반응형 디자인', () => {
    it('should have proper grid layout', () => {
      render(<RankingSection />);
      
      const grid = screen.getByText('실시간 급상승 선물랭킹').nextElementSibling?.nextElementSibling;
      expect(grid).toHaveClass('Grid');
    });

    it('should have proper filter button styling', () => {
      render(<RankingSection />);
      
      const allFilter = screen.getByText('전체').closest('button');
      expect(allFilter).toHaveClass('FilterBtn');
    });
  });

  describe('접근성', () => {
    it('should have proper heading structure', () => {
      render(<RankingSection />);
      
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('실시간 급상승 선물랭킹');
    });

    it('should have clickable filter buttons', () => {
      render(<RankingSection />);
      
      const filterButtons = screen.getAllByRole('button');
      filterButtons.forEach(button => {
        expect(button).toBeEnabled();
      });
    });
  });
}); 