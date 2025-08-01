import { render, screen } from '@testing-library/react';

import Navbar from '@/components/navbar/Navbar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from '@/contexts/AuthContext';
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
describe("네비게이션 바 테스트 코드입니다. ", ()=>{
it("1.네비게이션 바가 렌더링이 되면 이전버튼과 마이페이지 버튼이 보여요.", async()=>{
     renderWithProviders(<Navbar/>)
const backButton = screen.getByRole('button', { name: '뒤로 가기' })
const myPageButton = screen.getByRole('button', { name: '마이페이지' })

expect(backButton).toBeInTheDocument();
expect(myPageButton).toBeInTheDocument();


})

})