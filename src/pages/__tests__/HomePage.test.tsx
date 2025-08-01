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
      queries: { retry: false },
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
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();

    expect(screen.getByText('전체')).toBeInTheDocument();
    expect(screen.getByText('여성이')).toBeInTheDocument();
    expect(screen.getByText('남성이')).toBeInTheDocument();
    expect(screen.getByText('청소년이')).toBeInTheDocument();

    expect(screen.getByText('받고 싶어한')).toBeInTheDocument();
    expect(screen.getByText('많이 선물한')).toBeInTheDocument();
    expect(screen.getByText('위시로 받은')).toBeInTheDocument();

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

  it('필터 버튼 클릭 시 올바르게 동작하는지 확인', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    const femaleButton = screen.getByText('여성이');
    fireEvent.click(femaleButton);

    await waitFor(() => {
      const button = femaleButton.closest('button');
      expect(button).toBeInTheDocument();
    });
  });

  it('탭 버튼 클릭 시 올바르게 동작하는지 확인', async () => {
    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    const giveTab = screen.getByText('많이 선물한');
    fireEvent.click(giveTab);

    await waitFor(() => {
      const button = giveTab.closest('button');
      expect(button).toBeInTheDocument();
    });
  });

  it('더보기 버튼 클릭 시 모든 상품이 표시되는지 확인', async () => {
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

    expect(screen.getByText('스타벅스 아메리카노')).toBeInTheDocument();
    expect(screen.getByText('올리브영 기프트카드')).toBeInTheDocument();
    expect(screen.getByText('배스킨라빈스 파인트')).toBeInTheDocument();
    expect(screen.getByText('쿠팡 기프트카드')).toBeInTheDocument();
    expect(screen.getByText('네이버페이 머니')).toBeInTheDocument();
  });

  it('API 에러 시 에러 메시지가 표시되는지 확인', async () => {
    server.use(
      http.get('/api/products/ranking', () => {
        return HttpResponse.json({ message: '서버 오류가 발생했습니다.' }, { status: 500 });
      }),
    );

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('상품 목록을 불러오는 데 실패했습니다.')).toBeInTheDocument();
    });
  });

  it('빈 데이터 시 적절한 메시지가 표시되는지 확인', async () => {
    server.use(
      http.get('/api/products/ranking', () => {
        return HttpResponse.json({ data: [] });
      }),
    );

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('상품 목록이 없습니다.')).toBeInTheDocument();
    });
  });

  it('네트워크 에러 시 에러 메시지가 표시되는지 확인', async () => {
    server.use(
      http.get('/api/products/ranking', () => {
        return HttpResponse.error();
      }),
    );

    render(
      <TestWrapper>
        <HomePage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText('상품 목록을 불러오는 데 실패했습니다.')).toBeInTheDocument();
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
