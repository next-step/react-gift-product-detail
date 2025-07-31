// src/widgets/ranking-section/ui/RankingSection.test.tsx

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { Suspense } from 'react';
import RankingSection from '../../ui/RankingSection';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/app/styles/theme';

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Suspense fallback={<div>로딩 중...</div>}>{ui}</Suspense>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

describe('<RankingSection />', () => {
  it('초기 렌더링 시 기본 랭킹 데이터가 올바르게 표시되어야 한다.', async () => {
    renderWithProviders(<RankingSection />);

    expect(screen.getByText('로딩 중...')).toBeInTheDocument();

    const firstItem = await screen.findByText('스트로베리 요거트 생크림');
    expect(firstItem).toBeInTheDocument();

    expect(screen.getByText('실시간 급상승 선물랭킹')).toBeInTheDocument();
    expect(screen.getByText('스트로베리 요거트 생크림')).toBeInTheDocument();
    expect(screen.queryByText('여성을 위한 립스틱')).not.toBeInTheDocument();
  });

  it("'여성' 필터 버튼을 클릭하면, 여성 상품 랭킹이 표시되어야 한다.", async () => {
    const user = userEvent.setup();

    // Given - 기본 상품 데이터가 화면에 렌더링된 상태이다.
    renderWithProviders(<RankingSection />);
    await screen.findByText('스트로베리 요거트 생크림');

    // When - '여성이'라는 필터 버튼을 클릭했을 때
    const femaleFilterButton = screen.getByText('여성이');
    await user.click(femaleFilterButton);

    // Then - 여성 필터에 해당하는 새로운 데이터가 화면에 나타나야 함
    const femaleProduct = await screen.findByText('여성을 위한 립스틱');
    expect(femaleProduct).toBeInTheDocument();

    // 기존에 있던 기본 데이터는 더 이상 보이지 않는지 확인한다.
    expect(screen.queryByText('스트로베리 요거트 생크림')).not.toBeInTheDocument();
  });
});
