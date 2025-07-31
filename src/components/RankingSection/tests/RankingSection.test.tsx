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
  describe('기본 필터: ALL + MANY_WISH', () => {
    it('해당 조건에 맞는 상품들이 렌더링된다.', async () => {
      // Given: 컴포넌트가 초기 렌더링됨
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // Then: 기본 필터 조건에 맞는 상품이 표시됨
      expect(
        await screen.findByText(text =>
          text.replace(/\s/g, '').includes('부드러운고구마라떼케이크')
        )
      ).toBeInTheDocument();

      expect(
        await screen.findByText(text =>
          text.replace(/\s/g, '').includes('우유가득생크림케이크1호')
        )
      ).toBeInTheDocument();
    });

    it('기본 필터에 맞지 않는 상품들은 렌더링되지 않는다.', async () => {
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // Then: FEMALE 필터용 상품은 보이지 않아야 함
      expect(
        screen.queryByText(text =>
          text.replace(/\s/g, '').includes('맛초킹+치즈볼+콜라1.25L')
        )
      ).not.toBeInTheDocument();
    });
  });

  describe('성별 필터 변경: FEMALE', () => {
    it('FEMALE 조건에 맞는 상품만 표시된다.', async () => {
      // Given: 초기 상태로 컴포넌트 렌더링
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // When: FEMALE 필터 버튼 클릭
      const femaleButton = screen.getByRole('button', { name: /여성이/i });
      fireEvent.click(femaleButton);

      // Then: FEMALE에 해당하는 상품이 표시됨
      expect(
        await screen.findByText(text =>
          text.replace(/\s/g, '').includes('맛초킹+치즈볼+콜라1.25L')
        )
      ).toBeInTheDocument();
    });
  });

  describe('더보기/접기 기능', () => {
    it('더보기 버튼 클릭 시 전체 상품이 표시된다.', async () => {
      // Given: 기본 6개 상품이 렌더링된 상태
      renderWithProviders(<RankingGroup />);
      await screen.findByText(text =>
        text.replace(/\s/g, '').includes('부드러운고구마라떼케이크')
      );

      // When: 더보기 버튼 클릭
      const moreButton = screen.getByRole('button', { name: /더보기/i });
      fireEvent.click(moreButton);

      // Then: 7번째 상품이 나타남
      expect(
        await screen.findByText(text =>
          text
            .replace(/\s/g, '')
            .includes(
              '마이넘버원초코생크림조각케이크+마이넘버원고구마조각케이크+아이스아메리카노2잔'
            )
        )
      ).toBeInTheDocument();
    });

    it('접기 버튼 클릭 시 다시 6개만 표시된다.', async () => {
      renderWithProviders(<RankingGroup />);
      await screen.findByText(text =>
        text.replace(/\s/g, '').includes('부드러운고구마라떼케이크')
      );

      const moreButton = screen.getByRole('button', { name: /더보기/i });
      fireEvent.click(moreButton);

      const collapseButton = await screen.findByRole('button', {
        name: /접기/i,
      });
      fireEvent.click(collapseButton);

      // Then: 7번째 상품은 사라짐
      expect(
        screen.queryByText(text =>
          text
            .replace(/\s/g, '')
            .includes(
              '마이넘버원초코생크림조각케이크+마이넘버원고구마조각케이크+아이스아메리카노2잔'
            )
        )
      ).not.toBeInTheDocument();
    });
  });
});
