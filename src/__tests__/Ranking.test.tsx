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
    window.history.pushState({}, '', '/ranking?targetType=ALL&rankType=MANY_RECEIVE');

    //Given: Ranking 컴포넌트를 렌더링
    renderWithProviders(<Ranking />);
    //expect
    const name = await screen.findByText('됐다!');
    expect(name).toBeInTheDocument();
    screen.debug();
  });
});
