import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/pages/LoginPage';
import { BrowserRouter } from 'react-router';
import { vi } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme/theme';
import { ToastContainer } from 'react-toastify';
import { AxiosError, AxiosHeaders } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import type { LoginResponse } from '@/apis/auth';

const mockSetUser = vi.fn();
const mockLogout = vi.fn();

vi.mock('@/hooks/useAuthHooks', () => {
  return {
    useAuth: () => ({
      user: null,
      setUser: mockSetUser,
      isLoggedIn: false,
      logout: mockLogout,
      isInitialized: true,
    }),
    useLoginMutation: () => ({
      mutate: (
        body: { email: string; password: string },
        options: {
          onSuccess: (result: LoginResponse) => void;
          onError: (error: Error | AxiosError) => void;
        },
      ) => {
        if (body.email === 'fail@fail.com') {
          const mockAxiosError = new AxiosError(
            'Request failed',
            '400',
            {} as InternalAxiosRequestConfig,
            {
              headers: AxiosHeaders.from({}),
              method: 'post',
              url: '/login',
            } as InternalAxiosRequestConfig,
            {
              data: { message: '@kakao.com 이메일 주소만 가능합니다.' },
              status: 400,
              statusText: 'Bad Request',
              headers: AxiosHeaders.from({}),
              config: {
                headers: AxiosHeaders.from({}),
                method: 'post',
                url: '/login',
              },
            },
          );
          options.onError(mockAxiosError);
        } else {
          options.onSuccess({
            email: body.email,
            name: body.email.split('@')[0],
            authToken: '123456',
          });
        }
      },
      isPending: false,
    }),
  };
});

const renderWithProviders = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          {ui}
          <ToastContainer />
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>,
  );
};

describe('LoginPage 통합 테스트', () => {
  beforeEach(() => {
    mockSetUser.mockClear();
  });

  test('이메일/비밀번호 입력창과 로그인 버튼이 표시되어야 한다', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  test('유효하지 않은 입력 상태에서는 버튼이 비활성화된다', () => {
    renderWithProviders(<LoginPage />);
    const button = screen.getByRole('button', { name: /로그인/i });
    expect(button).toBeDisabled();
  });

  test('이메일/비밀번호 입력 시 버튼이 활성화된다', async () => {
    renderWithProviders(<LoginPage />);
    await userEvent.type(screen.getByPlaceholderText('이메일'), 'test@kakao.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호'), '12345678');
    const button = screen.getByRole('button', { name: /로그인/i });
    expect(button).toBeEnabled();
  });

  test('로그인 성공 시 setUser가 호출된다', async () => {
    renderWithProviders(<LoginPage />);
    await userEvent.type(screen.getByPlaceholderText('이메일'), 'tester@kakao.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호'), '12345678');
    await userEvent.click(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
      expect(mockSetUser).toHaveBeenCalledWith({
        email: 'tester@kakao.com',
        name: 'tester',
        authToken: '123456',
      });
    });
  });

  test('로그인 실패 시 에러 메시지가 표시된다', async () => {
    renderWithProviders(<LoginPage />);
    await userEvent.type(screen.getByPlaceholderText('이메일'), 'fail@fail.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호'), '12345678');
    await userEvent.click(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
      expect(screen.getByText('@kakao.com 이메일 주소만 가능합니다.')).toBeInTheDocument();
    });
  });
});
