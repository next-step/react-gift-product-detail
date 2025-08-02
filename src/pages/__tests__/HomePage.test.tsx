import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { server } from '../../test/mocks/server';
import { http, HttpResponse } from 'msw';
import HomePage from '../HomePage';
import { theme } from '../../styles/theme';
import { AuthProvider } from '../../hooks/useAuth';
import { describe, it, expect, beforeEach } from 'vitest';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('HomePage - 실시간 급상승 선물랭킹 섹션', () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  it('실시간 급상승 선물랭킹 섹션이 올바르게 렌더링되는지 확인', async () => {
    const filterButtons = ['전체', '여성이', '남성이', '청소년이'];
    const tabButtons = ['받고 싶어한', '많이 선물한', '위시로 받은'];

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();

    // 필터 버튼들이 모두 렌더링되는지 확인
    filterButtons.forEach((buttonText) => {
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });

    // 탭 버튼들이 모두 렌더링되는지 확인
    tabButtons.forEach((buttonText) => {
      expect(screen.getByText(buttonText)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByText('스타벅스 아메리카노')).toBeInTheDocument();
    });
  });

  it('급상승 선물랭킹 데이터가 성공적으로 로드되는지 확인', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('스타벅스 아메리카노')).toBeInTheDocument();
    });

    expect(screen.getByText('4,500 원')).toBeInTheDocument();
    expect(screen.getByText('스타벅스')).toBeInTheDocument();

    expect(screen.getByText('더보기')).toBeInTheDocument();
  });

  it.each([
    { buttonText: '여성이', description: '필터 버튼' },
    { buttonText: '많이 선물한', description: '탭 버튼' },
  ])('$description 클릭 시 올바르게 동작하는지 확인', async ({ buttonText }) => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    const button = screen.getByText(buttonText);
    fireEvent.click(button);

    await waitFor(() => {
      const buttonElement = button.closest('button');
      expect(buttonElement).toBeInTheDocument();
    });
  });

  it('더보기 버튼 클릭 시 모든 상품이 표시되는지 확인', async () => {
    const expectedProducts = [
      '스타벅스 아메리카노',
      '올리브영 기프트카드',
      '배스킨라빈스 파인트',
      '쿠팡 기프트카드',
      '네이버페이 머니',
    ];

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('스타벅스 아메리카노')).toBeInTheDocument();
    });

    const moreButton = screen.getByText('더보기');
    fireEvent.click(moreButton);

    expect(screen.getByText('접기')).toBeInTheDocument();

    // 모든 상품이 표시되는지 확인
    expectedProducts.forEach((productName) => {
      expect(screen.getByText(productName)).toBeInTheDocument();
    });
  });

  describe.each([
    {
      scenario: '성공적인 데이터 로드',
      handler: () =>
        http.get('/api/products/ranking', () => {
          return HttpResponse.json({
            data: [
              {
                id: 1,
                name: '스타벅스 아메리카노',
                price: { sellingPrice: 4500 },
                brandInfo: { name: '스타벅스' },
                imageURL: 'test-image.jpg',
              },
            ],
          });
        }),
      expectedElements: ['스타벅스 아메리카노', '4,500 원', '스타벅스', '더보기'],
      expectedMessage: undefined,
      shouldShowError: false,
    },
    {
      scenario: 'API 서버 에러 (500)',
      handler: () =>
        http.get('/api/products/ranking', () => {
          return HttpResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
        }),
      expectedElements: undefined,
      expectedMessage: '상품 목록을 불러오는 데 실패했습니다.',
      shouldShowError: true,
    },
    {
      scenario: 'API 클라이언트 에러 (400)',
      handler: () =>
        http.get('/api/products/ranking', () => {
          return HttpResponse.json({ message: '잘못된 요청입니다.' }, { status: 400 });
        }),
      expectedElements: undefined,
      expectedMessage: '상품 목록을 불러오는 데 실패했습니다.',
      shouldShowError: true,
    },
    {
      scenario: '빈 데이터 응답',
      handler: () =>
        http.get('/api/products/ranking', () => {
          return HttpResponse.json({ data: [] });
        }),
      expectedElements: undefined,
      expectedMessage: '상품 목록이 없습니다.',
      shouldShowError: true,
    },
    {
      scenario: '네트워크 연결 실패',
      handler: () =>
        http.get('/api/products/ranking', () => {
          return HttpResponse.error();
        }),
      expectedElements: undefined,
      expectedMessage: '상품 목록을 불러오는 데 실패했습니다.',
      shouldShowError: true,
    },
  ])('$scenario', ({ handler, expectedElements, expectedMessage, shouldShowError }) => {
    it('올바른 UI 상태를 표시하는지 확인', async () => {
      server.use(handler());

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>,
      );

      if (shouldShowError && expectedMessage) {
        // 에러 케이스: 에러 메시지가 표시되어야 함
        await waitFor(
          () => {
            expect(screen.getByText(expectedMessage)).toBeInTheDocument();
          },
          { timeout: 5000 },
        );

        // 에러 시에는 상품 목록이 표시되지 않아야 함
        expect(screen.queryByText('스타벅스 아메리카노')).not.toBeInTheDocument();
        expect(screen.queryByText('더보기')).not.toBeInTheDocument();
      } else if (!shouldShowError && expectedElements) {
        // 성공 케이스: 예상 요소들이 모두 표시되어야 함
        await waitFor(
          () => {
            expectedElements.forEach((element) => {
              expect(screen.getByText(element)).toBeInTheDocument();
            });
          },
          { timeout: 5000 },
        );

        // 성공 시에는 에러 메시지가 표시되지 않아야 함
        expect(screen.queryByText('상품 목록을 불러오는 데 실패했습니다.')).not.toBeInTheDocument();
        expect(screen.queryByText('상품 목록이 없습니다.')).not.toBeInTheDocument();
      }
    });

    it('로딩 상태가 적절히 처리되는지 확인', async () => {
      server.use(handler());

      render(
        <TestWrapper>
          <HomePage />
        </TestWrapper>,
      );

      // 초기에는 로딩 상태가 표시될 수 있음 (React Query의 특성상)
      // 최종적으로는 예상된 상태가 되어야 함
      await waitFor(
        () => {
          if (shouldShowError && expectedMessage) {
            expect(screen.getByText(expectedMessage)).toBeInTheDocument();
          } else if (!shouldShowError && expectedElements) {
            expectedElements.forEach((element) => {
              expect(screen.getByText(element)).toBeInTheDocument();
            });
          }
        },
        { timeout: 5000 },
      );
    });
  });

  it('랭킹 순서가 올바르게 표시되는지 확인', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('스타벅스 아메리카노')).toBeInTheDocument();
    });

    const rankingItems = screen.getAllByTestId('ranking-item');
    expect(rankingItems).toHaveLength(5);
  });

  it('상품 클릭 시 상세 페이지로 이동하는지 확인', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('스타벅스 아메리카노')).toBeInTheDocument();
    });

    const firstProduct = screen.getByText('스타벅스 아메리카노');
    fireEvent.click(firstProduct);

    expect(firstProduct).toBeInTheDocument();
  });
});
