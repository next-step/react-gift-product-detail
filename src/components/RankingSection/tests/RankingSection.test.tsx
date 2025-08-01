import { render, screen, fireEvent, waitFor } from '@testing-library/react';
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
      // Given: 기본 필터 조건으로 랭킹 섹션을 렌더링
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // Then: 해당 필터 조건에 맞는 상품 이름이 렌더링되어야 함
      await waitFor(() => {
        const names = screen
          .getAllByTestId('product-name')
          .map(el => el.textContent?.replace(/\s/g, ''));
        expect(names).toEqual(
          expect.arrayContaining([
            expect.stringContaining('부드러운고구마라떼케이크'),
            expect.stringContaining('우유가득생크림케이크1호'),
          ])
        );
      });
    });

    it('기본 필터에 맞지 않는 상품들은 렌더링되지 않는다.', async () => {
      // Given: 기본 필터 조건으로 렌더링
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // Then: FEMALE 전용 상품은 화면에 나타나지 않아야 함
      await waitFor(() => {
        const names = screen
          .getAllByTestId('product-name')
          .map(el => el.textContent?.replace(/\s/g, ''));
        expect(names).not.toEqual(
          expect.arrayContaining([
            expect.stringContaining('맛초킹+치즈볼+콜라1.25L'),
          ])
        );
      });
    });
  });

  describe('성별 필터 변경: FEMALE', () => {
    it('FEMALE 조건에 맞는 상품만 표시된다.', async () => {
      // Given: 기본 상태로 컴포넌트를 렌더링
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // When: "여성이" 필터 버튼을 클릭
      const femaleButton = screen.getByRole('button', { name: /여성이/i });
      fireEvent.click(femaleButton);

      // Then: FEMALE 전용 상품이 화면에 나타나야 함
      await waitFor(() => {
        const names = screen
          .getAllByTestId('product-name')
          .map(el => el.textContent?.replace(/\s/g, ''));
        expect(names).toEqual([
          expect.stringContaining('맛초킹+치즈볼+콜라1.25L'),
        ]);
      });
    });
  });

  describe('더보기/접기 기능', () => {
    it('더보기 버튼 클릭 시 전체 상품이 표시된다.', async () => {
      // Given: 기본 상태로 6개 상품이 렌더링된 상태
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);

      // When: "더보기" 버튼을 클릭
      const expandButton = await screen.findByTestId('expand-button');
      fireEvent.click(expandButton);

      // Then: 전체 상품이 모두 표시되어야 함
      await waitFor(() => {
        const names = screen
          .getAllByTestId('product-name')
          .map(el => el.textContent?.replace(/\s/g, ''));
        expect(names.length).toBeGreaterThan(6);
        expect(names).toContain(
          '마이넘버원초코생크림조각케이크+마이넘버원고구마조각케이크+아이스아메리카노2잔'
        );
      });
    });

    it('접기 버튼 클릭 시 다시 6개만 표시된다.', async () => {
      // Given: 전체 상품이 확장된 상태
      renderWithProviders(<RankingGroup />);
      await screen.findByText(/실시간 급상승 선물랭킹/i);
      const expandButton = await screen.findByTestId('expand-button');
      fireEvent.click(expandButton);

      // When: "접기" 버튼을 클릭
      const collapseButton = await screen.findByTestId('expand-button');
      fireEvent.click(collapseButton);

      // Then: 다시 6개만 화면에 표시되어야 함
      await waitFor(() => {
        const names = screen.getAllByTestId('product-name');
        expect(names.length).toBeLessThanOrEqual(6);
      });
    });
  });
});
