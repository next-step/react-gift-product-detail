import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { http, HttpResponse } from 'msw';
import { vi } from 'vitest';
import { ToastContainer, toast } from 'react-toastify';
import type * as reactToastify from 'react-toastify';
import { LoginPage } from '@/pages/LoginPage';
import { theme } from '@/styles/theme';
import { server } from '@/mocks/server';
import React from 'react';

vi.mock('react-toastify', async (importOriginal) => {
  const original = await importOriginal<typeof reactToastify>();
  return {
    ...original,
    toast: {
      ...original.toast,
      error: vi.fn(),
    },
  };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

const renderWithProviders = (ui: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <ToastContainer />
          {ui}
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('LoginPage', () => {
  afterEach(() => {
    vi.clearAllMocks();
    server.resetHandlers();
  });

  it('초기 렌더링 시 이메일, 비밀번호 입력창과 비활성화된 로그인 버튼이 렌더링되는지 확인합니다.', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeDisabled();
  });

  it('잘못된 이메일 형식 입력 시 에러 메시지가 표시되는지 확인합니다.', async () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('이메일');
    await userEvent.type(emailInput, 'invalid-email');
    expect(await screen.findByText('유효한 이메일 주소를 입력해주세요.')).toBeInTheDocument();
  });

  it('조건에 맞지 않는 비밀번호 입력 시 에러 메시지가 표시되는지 확인합니다.', async () => {
    renderWithProviders(<LoginPage />);
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    await userEvent.type(passwordInput, '123');
    expect(
      await screen.findByText('비밀번호는 영문, 숫자를 포함하여 8자 이상 25자 이하여야 합니다.')
    ).toBeInTheDocument();
  });

  it('로그인 성공 시 다음 페이지로 이동하는지 검증합니다.', async () => {
    server.use(
      http.post('/api/login', () => {
        return HttpResponse.json({
          data: {
            authToken: 'fake-token',
            email: 'test@kakao.com',
            name: 'Test User',
          },
        });
      })
    );

    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'test@kakao.com');
    await userEvent.type(passwordInput, 'password123');

    await waitFor(() => expect(loginButton).toBeEnabled());
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.error).not.toHaveBeenCalled();
    });
  });

  it('로그인 실패 시 에러 메시지가 표시되는지 검증합니다.', async () => {
    server.use(
      http.post('/api/login', () => {
        return HttpResponse.json({ message: '로그인 실패' }, { status: 401 });
      })
    );

    renderWithProviders(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'wrong@kakao.com');
    await userEvent.type(passwordInput, 'wrongpassword1');

    await waitFor(() => expect(loginButton).toBeEnabled());
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('로그인 실패');
    });
  });
});
