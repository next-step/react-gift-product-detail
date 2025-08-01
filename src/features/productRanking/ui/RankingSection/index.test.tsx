import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
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

    // gender와 action 필터의 유효성을 자동 검사하게함 (Mock데이터 배열 인덱스 순서대로 불러오는데 가장 위에 정의해둠)
    expect(screen.queryByText('여성을 위한 립스틱')).not.toBeInTheDocument();
    expect(screen.queryByText('5만원권')).not.toBeInTheDocument();
  });

  it("'MALE'과 'MANY_WISH_RECEIVE' 필터를 순차적으로 적용하면 해당하는 상품만 표시되어야 한다.", async () => {
    const user = userEvent.setup();

    // Given - 기본 상품 데이터가 렌더링된 상태
    renderWithProviders(<RankingSection />);
    await screen.findByText('스트로베리 요거트 생크림');

    // When - 'MALE' 버튼과 'MANY_WISH_RECEIVE' 버튼을 클릭한다.
    await user.click(screen.getByText('남성이'));
    await user.click(screen.getByText('위시로 받은'));

    // Then - 'MALE'이면서 'MANY_WISH_RECEIVE' 상품이 표시되는지 확인
    const targetProduct = await screen.findByText('행운 가득 복 케이크');
    expect(targetProduct).toBeInTheDocument();

    // Then - 다른 상품들은 화면에 보이지 않는지 확인
    expect(screen.queryByText('5만원권')).not.toBeInTheDocument();
    expect(screen.queryByText('여성을 위한 립스틱')).not.toBeInTheDocument();
  });

  it("'더보기'와 '접기' 버튼이 올바르게 동작해야 한다.", async () => {
    // 1. Given - 6개 이상의 데이터를 가진 상태로 컴포넌트를 렌더링한다.
    const user = userEvent.setup();
    renderWithProviders(<RankingSection />);
    await screen.findByText(
      '마이넘버원 초코생크림 조각케이크+마이넘버원 고구마 조각케이크 +아이스 아메리카노 2잔'
    );
    // 7번째 상품은 보이지 않는 상태여야 한다.
    expect(screen.queryByText('위시캣 아이냥 케이크(픽업가능)')).not.toBeInTheDocument();

    // 2. When - '더보기' 버튼을 클릭한다.
    const moreButton = screen.getByRole('button', { name: '더보기' });
    await user.click(moreButton);

    // 3. Then - 7번째 상품이 화면에 나타날 때까지 기다리고, 확인한다.
    const seventhItem = await screen.findByText('위시캣 아이냥 케이크(픽업가능)');
    expect(seventhItem).toBeInTheDocument();

    // 4. When - 이제 '접기' 버튼으로 바뀌었을 것이므로, 클릭한다.
    const collapseButton = screen.getByRole('button', { name: '접기' });
    await user.click(collapseButton);

    // 5. Then - 7번째 상품이 화면에서 사라졌는지 확인한다.
    await waitFor(() => {
      expect(screen.queryByText('위시캣 아이냥 케이크(픽업가능)')).not.toBeInTheDocument();
    });
  });
});
