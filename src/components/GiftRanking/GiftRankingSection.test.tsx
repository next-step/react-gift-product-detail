import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import GiftRankingSection from './GiftRankingSection';
import { server } from '@/mocks/server';
import { http, HttpResponse } from 'msw';
import { beforeEach, describe, it, expect, vi } from 'vitest';
import { theme } from '@/styles/theme';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>{children}</BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('GiftRankingSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    server.resetHandlers();
  });

  it('전체 - 많이 찜한', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();

    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('많이 찜한')).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText('부드러운 고구마 라떼 케이크')
      ).toBeInTheDocument();
      expect(screen.getByText('5만원권')).toBeInTheDocument();
    });
  });

  it('전체 - 많이 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const manyReceiveTab = screen.getByText('많이 받은');
    await userEvent.click(manyReceiveTab);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedSort',
      'MANY_RECEIVE'
    );

    await waitFor(() => {
      expect(screen.getByText('스트로베리 요거트 생크림')).toBeInTheDocument();
      expect(screen.getByText('아메리카노 세트')).toBeInTheDocument();
    });
  });

  it('전체 - 많이 찜하고 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const manyWishReceiveTab = screen.getByText('많이 찜하고 받은');
    await userEvent.click(manyWishReceiveTab);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedSort',
      'MANY_WISH_RECEIVE'
    );

    await waitFor(() => {
      expect(screen.getByText('케이크')).toBeInTheDocument();
    });
  });

  it('여성 - 많이 찜한', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const femaleTab = screen.getByText('여성');
    await userEvent.click(femaleTab);

    const manyWishTab = screen.getByText('많이 찜한');
    await userEvent.click(manyWishTab);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedCategory',
      'FEMALE'
    );

    await waitFor(() => {
      expect(screen.getByText('위시캣 케이크')).toBeInTheDocument();
    });
  });

  it('여성 - 많이 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const femaleTab = screen.getByText('여성');
    await userEvent.click(femaleTab);

    const manyReceiveTab = screen.getByText('많이 받은');
    await userEvent.click(manyReceiveTab);

    await waitFor(() => {
      expect(screen.getByText('떠먹는 화이트 케이크')).toBeInTheDocument();
    });
  });

  it('여성 - 많이 찜하고 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const femaleTab = screen.getByText('여성');
    await userEvent.click(femaleTab);

    const manyWishReceiveTab = screen.getByText('많이 찜하고 받은');
    await userEvent.click(manyWishReceiveTab);

    await waitFor(() => {
      expect(screen.getByText('치킨 + 콜라')).toBeInTheDocument();
    });
  });

  it('남성 - 많이 찜한', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const maleTab = screen.getByText('남성');
    await userEvent.click(maleTab);

    await waitFor(() => {
      expect(screen.getByText('반반콤보웨지감자세트')).toBeInTheDocument();
    });
  });

  it('남성 - 많이 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const maleTab = screen.getByText('남성');
    await userEvent.click(maleTab);

    const manyReceiveTab = screen.getByText('많이 받은');
    await userEvent.click(manyReceiveTab);

    await waitFor(() => {
      expect(screen.getByText('후라이드치킨 + 콜라')).toBeInTheDocument();
    });
  });

  it('남성 - 많이 찜하고 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const maleTab = screen.getByText('남성');
    await userEvent.click(maleTab);

    const manyWishReceiveTab = screen.getByText('많이 찜하고 받은');
    await userEvent.click(manyWishReceiveTab);

    await waitFor(() => {
      expect(screen.getByText('골라먹는 27 큐브')).toBeInTheDocument();
    });
  });

  it('10대 - 많이 찜한', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const teenTab = screen.getByText('10대');
    await userEvent.click(teenTab);

    await waitFor(() => {
      expect(screen.getByText('파인트 아이스크림')).toBeInTheDocument();
    });
  });

  it('10대 - 많이 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const teenTab = screen.getByText('10대');
    await userEvent.click(teenTab);

    const manyReceiveTab = screen.getByText('많이 받은');
    await userEvent.click(manyReceiveTab);

    await waitFor(() => {
      expect(screen.getByText('애플망고치즈설빙')).toBeInTheDocument();
    });
  });

  it('10대 - 많이 찜하고 받은', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const teenTab = screen.getByText('10대');
    await userEvent.click(teenTab);

    const manyWishReceiveTab = screen.getByText('많이 찜하고 받은');
    await userEvent.click(manyWishReceiveTab);

    await waitFor(() => {
      expect(screen.getByText('싱글레귤러 아이스크림')).toBeInTheDocument();
    });
  });

  it('상품이 없을 때 "상품이 없습니다" 메시지를 표시한다', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    server.use(
      http.get('http://localhost:3000/api/products/ranking', () => {
        return HttpResponse.json({
          data: [],
        });
      })
    );

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("'상품이 없습니다.'")).toBeInTheDocument();
    });
  });

  it('필터 변경 시 localStorage에 올바른 값이 저장된다', async () => {
    localStorageMock.getItem.mockReturnValue(null);

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    const femaleTab = screen.getByText('여성');
    await userEvent.click(femaleTab);

    const manyReceiveTab = screen.getByText('많이 받은');
    await userEvent.click(manyReceiveTab);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedCategory',
      'FEMALE'
    );
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'selectedSort',
      'MANY_RECEIVE'
    );
  });

  it('localStorage에 저장된 값으로 초기 상태를 설정한다', async () => {
    localStorageMock.getItem
      .mockReturnValueOnce('MALE')
      .mockReturnValueOnce('MANY_RECEIVE');

    render(
      <TestWrapper>
        <GiftRankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('후라이드치킨 + 콜라')).toBeInTheDocument();
    });
  });
});
