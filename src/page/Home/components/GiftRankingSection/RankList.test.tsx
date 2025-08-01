import { UserInfoProvider } from '@/contexts/UserInfoContext';
import { render, screen } from '@/tests/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import GiftRankingSection from '.';

const queryClient = new QueryClient();

describe('GiftPage', () => {
  test('MSW를 사용하여 랭킹 데이터를 불러와 표시한다.', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserInfoProvider>
            <GiftRankingSection />
          </UserInfoProvider>
        </MemoryRouter>
      </QueryClientProvider>
    );

    const product1 = await screen.findByText('부드러운 고구마 라떼 케이크');
    const product2 = await screen.findByText('5만원권');

    expect(product1).toBeInTheDocument();
    expect(product2).toBeInTheDocument();
  });
});
