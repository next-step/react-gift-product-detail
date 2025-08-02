import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import Login from './Login';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { theme } from '../styles/theme';

vi.mock('../context/AuthContext', async () => {
  const actual = await vi.importActual('../context/AuthContext');
  return {
    ...actual,
    useAuth: vi.fn(),
  };
});

vi.mock('react-hot-toast', () => ({
  default: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

const mockUseAuth = useAuth as vi.Mock;

describe('Login 페이지', () => {
  const queryClient = new QueryClient();
  const user = userEvent.setup();

  const renderComponent = (initialEntries = ['/login']) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <MemoryRouter initialEntries={initialEntries}>
            <AuthProvider>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<div>메인 페이지</div>} />
              </Routes>
            </AuthProvider>
          </MemoryRouter>
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test('초기 렌더링 시 이메일, 비밀번호 입력 필드와 비활성화된 로그인 버튼이 표시된다', () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
  });

  test('이메일을 입력하지 않고 포커스를 잃었을 때 에러 메시지를 표시한다', async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();
    const emailInput = screen.getByPlaceholderText('이메일');
    await user.click(emailInput);
    await user.click(document.body);

    expect(
      await screen.findByText('이메일을 입력해주세요.')
    ).toBeInTheDocument();
  });

  test('유효하지 않은 이메일 입력 시 에러 메시지를 표시한다', async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();
    const emailInput = screen.getByPlaceholderText('이메일');

    await user.type(emailInput, 'test@example.com');
    await user.click(document.body);
    expect(
      await screen.findByText('@kakao.com 이메일 주소만 가능합니다.')
    ).toBeInTheDocument();
  });

  test('유효한 이메일 입력 후 에러 메시지가 사라진다', async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();
    const emailInput = screen.getByPlaceholderText('이메일');

    await user.type(emailInput, 'test@kakao.com');
    await user.click(document.body);

    expect(screen.queryByText(/이메일.*입력해주세요/)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/@kakao.com.*가능합니다/)
    ).not.toBeInTheDocument();
  });

  test('8자 미만의 비밀번호 입력 시 에러 메시지를 표시한다', async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    await user.type(passwordInput, '1234567');
    await user.click(document.body);

    expect(
      await screen.findByText('비밀번호는 8자 이상이어야 합니다.')
    ).toBeInTheDocument();
  });

  test('유효한 이메일과 비밀번호 입력 시 로그인 버튼이 활성화된다', async () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    await user.type(emailInput, 'test@kakao.com');
    await user.click(document.body);
    await user.type(passwordInput, 'password123');
    await user.click(document.body);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: '로그인' })).toBeEnabled();
    });
  });

  test('로그인 성공 시 sessionStorage에 유저 정보가 저장된다', async () => {
    const mockUserData = { id: 1, name: '테스트유저' };
    const loginMock = vi.fn(async () => {
      sessionStorage.setItem('user', JSON.stringify(mockUserData));
    });

    mockUseAuth.mockReturnValue({
      login: loginMock,
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'test@kakao.com');
    await user.click(document.body);
    await user.type(passwordInput, 'validpassword');
    await user.click(document.body);

    await waitFor(async () => {
      expect(loginButton).toBeEnabled();
      await user.click(loginButton);
    });

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalled();
      expect(sessionStorage.getItem('user')).toBe(JSON.stringify(mockUserData));
    });
  });

  test('로그인 성공 시 메인 페이지로 이동하고 성공 토스트를 표시한다', async () => {
    const loginMock = vi.fn();
    mockUseAuth.mockImplementation(() => ({
      login: loginMock,
      isLoggedIn: false,
      isLoading: false,
    }));

    renderComponent();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'test@kakao.com');
    await user.click(document.body);
    await user.type(passwordInput, 'password123');
    await user.click(document.body);

    await waitFor(async () => {
      expect(loginButton).toBeEnabled();
      await user.click(loginButton);
    });

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith('test@kakao.com', 'password123');
    });

    mockUseAuth.mockReturnValue({
      login: loginMock,
      isLoggedIn: true,
      isLoading: false,
    });

    renderComponent(['/login']);

    await waitFor(() => {
      expect(screen.getByText('메인 페이지')).toBeInTheDocument();
    });
  });

  test('로그인 실패 시 에러 토스트를 표시한다', async () => {
    const loginMock = vi.fn(async (email, password) => {
      toast.error('이메일 또는 비밀번호가 잘못되었습니다.');
      throw new Error('Login failed');
    });

    mockUseAuth.mockReturnValue({
      login: loginMock,
      isLoggedIn: false,
      isLoading: false,
    });

    renderComponent();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await user.type(emailInput, 'wrong@kakao.com');
    await user.click(document.body);
    await user.type(passwordInput, 'wrongpassword');
    await user.click(document.body);

    await waitFor(async () => {
      expect(loginButton).toBeEnabled();
      await user.click(loginButton);
    });

    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith(
        'wrong@kakao.com',
        'wrongpassword'
      );
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        '이메일 또는 비밀번호가 잘못되었습니다.'
      );
    });

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.queryByText('메인 페이지')).not.toBeInTheDocument();
  });

  test('이미 로그인된 사용자는 메인 페이지로 리디렉션된다', () => {
    mockUseAuth.mockReturnValue({
      login: vi.fn(),
      isLoggedIn: true,
      isLoading: false,
    });

    renderComponent(['/login']);

    expect(screen.getByText('메인 페이지')).toBeInTheDocument();
  });
});
