import Ranking from '@/components/ranking/Ranking';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AuthProvider from '@/contexts/AuthContext';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
const renderWithProviders = (ui) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
describe('랭킹 페이지 테스트 코드입니다. ', () => {
  test('1. 랭킹 API로 상품을 가져와요', async () => {
    //Given: Ranking 컴포넌트를 렌더링
    renderWithProviders(<Ranking />);
    //expect
    const item = await screen.findByText('스트로베리 초콜릿 생크림');

    expect(item).toBeInTheDocument();
    screen.debug();
  });
});
