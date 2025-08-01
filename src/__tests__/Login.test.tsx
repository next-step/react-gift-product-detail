import AuthProvider from '@/contexts/AuthContext';
import Login from '@/pages/Login';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import userEvent from '@testing-library/user-event';

export const renderWithRouter = (ui: React.ReactElement, route = '/login') => {
  const queryClient = new QueryClient();

  window.history.pushState({}, 'Test page', route);

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <Routes>
              <Route path="/login" element={ui} />
              <Route path="/" element={<div>홈 페이지</div>} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe('로그인 페이지 테스트 코드입니다.', () => {
  it('1. 로그인 페이지에 접속했을 때 이메일, 비밀번호, 로그인 버튼이 보여요.', () => {
    //Given, When : 로그인 페이지에 접속했을 때
    renderWithRouter(<Login />);
    //Then
    expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호를 입력하세요')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });
  it('2. 이메일과 비밀번호가 유효성에 맞지 않으면 에러 토스트가 떠요.', async () => {
    //Given: 로그인 페이지 렌더링
    renderWithRouter(<Login />);

    //When: 잘못된 이메일과 비밀번호를 입력했을 때
    await userEvent.type(screen.getByPlaceholderText('이메일을 입력하세요'), 'wrong email!!!');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력하세요'), '11');

    //Then: 실제 validation 메시지가 토스트로 뜬다.
    expect(await screen.findByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument();
    expect(await screen.findByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
  });
  it('3. 유효성 검사 통과 시 버튼의 투명도가 바뀌어요.', async () => {
    //Given: 로그인 페이지 렌더링
    renderWithRouter(<Login />);

    //When: 이메일과 비밀번호를 제대로 입력했을 때
    await userEvent.type(screen.getByPlaceholderText('이메일을 입력하세요'), 'hyemo@kakao.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력하세요'), '123456789');
    const loginBtn = screen.getByRole('button', { name: '로그인' });
    //then: 로그인 버튼의 스타일 투명도가 1로 바뀜
    expect(loginBtn).toHaveStyle('opacity:1');
  });
  it('4. 유효성 통과, 로그인 버튼 클릭 시 선물하기 홈으로 가요.', async () => {
    //Given: 로그인 페이지 렌더링
    renderWithRouter(<Login />);

    //When: 이메일과 비밀번호를 제대로 입력했을 때
    await userEvent.type(screen.getByPlaceholderText('이메일을 입력하세요'), 'hyemo@kakao.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호를 입력하세요'), '123456789');
    const loginBtn = screen.getByRole('button', { name: '로그인' });
    await userEvent.click(loginBtn);
    //then: 홈으로 감
    expect(await screen.findByText('홈 페이지')).toBeInTheDocument();
  });
 
});
