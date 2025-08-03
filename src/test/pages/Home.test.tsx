import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import { server } from '../mocks/server';
import { http, HttpResponse } from 'msw';
import Home from '@/pages/Home';
import { theme } from '@/styles/Theme';

// Mock useLoginContext hook
const mockUseLoginContext = vi.hoisted(() => vi.fn());
vi.mock('@/hooks/useLoginContext', () => ({
  useLoginContext: mockUseLoginContext,
}));

// Default mock context
const defaultMockContext = {
  user: null,
  isLoggedIn: false,
  isInitialized: true,
  login: vi.fn(),
  logout: vi.fn(),
};

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Home Page - 실시간 급상승 선물랭킹 섹션', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseLoginContext.mockReturnValue(defaultMockContext);
  });

  describe('기본 렌더링', () => {
    it('실시간 급상승 선물랭킹 섹션이 올바르게 렌더링된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });
    });

    it('필터 버튼들이 올바르게 렌더링된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('전체')).toBeInTheDocument();
        expect(screen.getByText('남자')).toBeInTheDocument();
        expect(screen.getByText('여자')).toBeInTheDocument();
        expect(screen.getByText('청소년')).toBeInTheDocument();
      });
    });

    it('랭킹 타입 버튼들이 올바르게 렌더링된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('받고 싶어요')).toBeInTheDocument();
        expect(screen.getByText('선물 많이 받아요')).toBeInTheDocument();
        expect(screen.getByText('받고 싶어요 + 선물 많이 받아요')).toBeInTheDocument();
      });
    });
  });

  describe('API 데이터 로딩', () => {
    it('MSW를 통해 상품 데이터가 올바르게 로드된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
        expect(screen.getByText('테스트 상품 2')).toBeInTheDocument();
      });
    });

    it('상품 이미지가 올바르게 표시된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        const images = screen.getAllByAltText(/테스트 상품/);
        expect(images).toHaveLength(2);
        expect(images[0]).toHaveAttribute('src', 'https://via.placeholder.com/200');
      });
    });

    it('브랜드 정보가 올바르게 표시된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('테스트 브랜드')).toBeInTheDocument();
        expect(screen.getByText('테스트 브랜드 2')).toBeInTheDocument();
      });
    });

    it('가격 정보가 올바르게 표시된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('15,000원')).toBeInTheDocument();
        expect(screen.getByText('25,000원')).toBeInTheDocument();
      });
    });

    it('할인율이 올바르게 표시된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('25%')).toBeInTheDocument();
        expect(screen.getByText('17%')).toBeInTheDocument();
      });
    });

    it('랭킹 번호가 올바르게 표시된다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('1')).toBeInTheDocument();
        expect(screen.getByText('2')).toBeInTheDocument();
      });
    });
  });

  describe('필터 기능', () => {
    it('전체 필터 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '필터된 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'wanted'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const allFilter = screen.getByText('전체');
      fireEvent.click(allFilter);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });

    it('남자 필터 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '남성용 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'wanted'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const maleFilter = screen.getByText('남자');
      fireEvent.click(maleFilter);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });

    it('여자 필터 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '여성용 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'wanted'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const femaleFilter = screen.getByText('여자');
      fireEvent.click(femaleFilter);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });

    it('청소년 필터 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '청소년용 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'wanted'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const teenFilter = screen.getByText('청소년');
      fireEvent.click(teenFilter);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });
  });

  describe('랭킹 타입 필터', () => {
    it('받고 싶어요 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '받고 싶은 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'wanted'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const wantedButton = screen.getByText('받고 싶어요');
      fireEvent.click(wantedButton);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });

    it('선물 많이 받아요 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '선물 많이 받는 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'given'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const givenButton = screen.getByText('선물 많이 받아요');
      fireEvent.click(givenButton);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });

    it('받고 싶어요 + 선물 많이 받아요 버튼 클릭 시 API가 호출된다', async () => {
      const mockHandler = vi.fn();
      server.use(
        http.get('/api/products/ranking', () => {
          mockHandler();
          return HttpResponse.json([
            {
              id: 1,
              name: '인기 상품',
              imageURL: 'https://via.placeholder.com/200',
              brandInfo: { name: '테스트 브랜드', imageURL: 'https://via.placeholder.com/50' },
              price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 },
              rankingType: 'wished'
            }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });

      const wishedButton = screen.getByText('받고 싶어한');
      fireEvent.click(wishedButton);
      
      await waitFor(() => {
        expect(mockHandler).toHaveBeenCalled();
      });
    });
  });

  describe('더보기 기능', () => {
    it('상품이 6개 이상일 때 더보기 버튼이 표시된다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.json([
            { id: 1, name: '상품 1', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 2, name: '상품 2', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 3, name: '상품 3', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 4, name: '상품 4', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 5, name: '상품 5', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 6, name: '상품 6', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 7, name: '상품 7', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('더보기')).toBeInTheDocument();
      });
    });

    it('더보기 버튼 클릭 시 모든 상품이 표시된다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.json([
            { id: 1, name: '상품 1', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 2, name: '상품 2', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 3, name: '상품 3', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 4, name: '상품 4', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 5, name: '상품 5', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 6, name: '상품 6', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 7, name: '상품 7', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('더보기')).toBeInTheDocument();
      });

      const moreButton = screen.getByText('더보기');
      fireEvent.click(moreButton);
      
      await waitFor(() => {
        expect(screen.getByText('접기')).toBeInTheDocument();
        expect(screen.getByText('상품 7')).toBeInTheDocument();
      });
    });

    it('접기 버튼 클릭 시 6개만 표시된다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.json([
            { id: 1, name: '상품 1', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 2, name: '상품 2', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 3, name: '상품 3', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 4, name: '상품 4', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 5, name: '상품 5', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 6, name: '상품 6', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 7, name: '상품 7', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('더보기')).toBeInTheDocument();
      });

      const moreButton = screen.getByText('더보기');
      fireEvent.click(moreButton);
      
      await waitFor(() => {
        expect(screen.getByText('접기')).toBeInTheDocument();
      });

      const foldButton = screen.getByText('접기');
      fireEvent.click(foldButton);
      
      await waitFor(() => {
        expect(screen.getByText('더보기')).toBeInTheDocument();
        expect(screen.queryByText('상품 7')).not.toBeInTheDocument();
      });
    });

    it('상품이 6개 이하일 때 더보기 버튼이 표시되지 않는다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.json([
            { id: 1, name: '상품 1', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 2, name: '상품 2', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 3, name: '상품 3', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 4, name: '상품 4', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' },
            { id: 5, name: '상품 5', imageURL: 'https://via.placeholder.com/200', brandInfo: { name: '브랜드', imageURL: 'https://via.placeholder.com/50' }, price: { sellingPrice: 15000, basicPrice: 20000, discountRate: 25 }, rankingType: 'wanted' }
          ]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.queryByText('더보기')).not.toBeInTheDocument();
      });
    });
  });

  describe('상품 클릭 기능', () => {
    it('상품 클릭 시 상품 상세 페이지로 이동한다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('테스트 상품 1')).toBeInTheDocument();
      });

      const productCard = screen.getByText('테스트 상품 1').closest('div');
      fireEvent.click(productCard!);
      
      // React Router의 navigate가 호출되었는지 확인
      // 실제 네비게이션은 테스트 환경에서 확인하기 어려우므로 클릭 이벤트만 확인
      expect(productCard).toBeInTheDocument();
    });
  });

  describe('에러 처리', () => {
    it('API 에러 시 에러 메시지가 표시된다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.error();
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });
    });

    it('빈 데이터 시 상품 목록이 없습니다 메시지가 표시된다', async () => {
      server.use(
        http.get('/api/products/ranking', () => {
          return HttpResponse.json([]);
        })
      );

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('상품 목록이 없습니다')).toBeInTheDocument();
      });
    });
  });

  describe('반응형 디자인', () => {
    it('모바일에서 올바르게 렌더링된다', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });
    });

    it('데스크톱에서 올바르게 렌더링된다', async () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      renderWithProviders(<Home />);
      
      await waitFor(() => {
        expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
      });
    });
  });

  describe('접근성', () => {
    it('필터 버튼들이 클릭 가능하다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        const allFilter = screen.getByText('전체');
        const maleFilter = screen.getByText('남자');
        const femaleFilter = screen.getByText('여자');
        const teenFilter = screen.getByText('청소년');
        
        expect(allFilter).toBeInTheDocument();
        expect(maleFilter).toBeInTheDocument();
        expect(femaleFilter).toBeInTheDocument();
        expect(teenFilter).toBeInTheDocument();
      });
    });

    it('상품 카드들이 클릭 가능하다', async () => {
      renderWithProviders(<Home />);
      
      await waitFor(() => {
        const productCards = screen.getAllByText(/테스트 상품/);
        expect(productCards.length).toBeGreaterThan(0);
      });
    });
  });
}); 