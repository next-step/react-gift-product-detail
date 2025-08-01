import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import TrendRanking from '@/features/Gift/components/TrendRanking/TrendRanking';

describe('실시간 급상승 선물랭킹', () => {
  const queryClient = new QueryClient();

  beforeEach(() => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <TrendRanking />
        </QueryClientProvider>
      </MemoryRouter>
    );
  });

  it('상단 성별 탭이 화면에 표시된다', () => {
    const mainTab = screen.getByText(/남성이/i);
    expect(mainTab).toBeInTheDocument();
  });

  it('하단 유형 탭이 화면에 표시된다', () => {
    const subTab = screen.getByText(/많이 선물한/i);
    expect(subTab).toBeInTheDocument();
  });

  it('로딩 후 상품 리스트가 화면에 표시된다', async () => {
    const productName = await screen.findByText(/스트로베리 초콜릿 생크림/i);
    expect(productName).toBeInTheDocument();
  });

  it('상품 클릭 시 상세 페이지로 이동한다', async () => {
    const product = await screen.findByText(/스트로베리 초콜릿 생크림/i);
    fireEvent.click(product);
    expect(product).toBeInTheDocument();
  });
});
