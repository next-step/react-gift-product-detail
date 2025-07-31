import { render, screen, fireEvent } from '@testing-library/react';
import RankingGroup from '@/components/RankingSection/RankingGroup';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { Suspense } from 'react';
import { AuthProvider } from '@/contexts/AuthContext/AuthProvider';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false, gcTime: 0 } },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <AuthProvider>
            <Suspense fallback={<div>로딩 중...</div>}>{ui}</Suspense>
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

describe('실시간 급상승 선물랭킹 섹션', () => {
  it('기본 필터(ALL + MANY_WISH) 상품들이 정상적으로 렌더링됨', async () => {
    renderWithProviders(<RankingGroup />);

    await screen.findByText(/실시간 급상승 선물랭킹/i);

    expect(
      await screen.findByText(text =>
        text.includes('부드러운 고구마 라떼 케이크')
      )
    ).toBeInTheDocument();

    expect(
      await screen.findByText(text =>
        text.includes('우유가득 생크림케이크 1호')
      )
    ).toBeInTheDocument();
  });

  it('성별 필터를 FEMALE로 변경 시 해당 상품만 렌더링됨', async () => {
    renderWithProviders(<RankingGroup />);
    const femaleButton = screen.getByRole('button', { name: /여성이/i });
    fireEvent.click(femaleButton);

    expect(
      await screen.findByText(text => text.includes('맛초킹+치즈볼+콜라1.25L'))
    ).toBeInTheDocument();
  });

  it('더보기 버튼 클릭 시 전체 상품이 렌더링됨', async () => {
    renderWithProviders(<RankingGroup />);

    await screen.findByText(text =>
      text.includes('부드러운 고구마 라떼 케이크')
    );

    const moreButton = screen.getByRole('button', { name: /더보기/i });
    fireEvent.click(moreButton);

    expect(
      await screen.findByText(text =>
        text.includes(
          '마이넘버원 초코생크림 조각케이크+마이넘버원 고구마 조각케이크 +아이스 아메리카노 2잔'
        )
      )
    ).toBeInTheDocument();
  });
});
