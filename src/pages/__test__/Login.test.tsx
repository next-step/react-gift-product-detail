import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import Login from '../Login';
import { theme } from '@/theme/theme';

vi.mock('@/Api/api', () => ({
  postLogin: vi.fn().mockResolvedValue({
    data: {
      data: { email: 'test@kakao.com', name: '테스터', authToken: 'fake-token' },
    },
  }),
}));

export const loginSpy = vi.fn();
vi.mock('@/hooks/useAuth', () => ({ useAuth: () => ({ login: loginSpy }) }));

export const navigateSpy = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<any>('react-router-dom');
  return { ...actual, useNavigate: () => navigateSpy };
});

vi.mock('@/hooks/useLoginForm', () => {
  const React = require('react');
  return {
    useLoginForm: () => {
      const [id, setId] = React.useState('');
      const [pw, setPw] = React.useState('');
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      const idError = id && !emailRegex.test(id) ? '이메일 형식이 올바르지 않습니다.' : null;
      const pwError = pw && pw.length < 4 ? '비밀번호는 4자 이상' : null;

      return {
        id,
        idError,
        pw,
        pwError,
        handleIdChange: (e: React.ChangeEvent<HTMLInputElement>) => setId(e.target.value),
        handlePwChange: (e: React.ChangeEvent<HTMLInputElement>) => setPw(e.target.value),
        handleIdBlur: () => {},
        handlePwBlur: () => {},
        isFormValid: () => emailRegex.test(id) && pw.length >= 4,
      };
    },
  };
});

const renderLogin = () => {
  const client = new QueryClient();
  render(
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={['/login']}>
          <Login />
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

afterEach(() => {
  vi.clearAllMocks();
});

describe('Login page', () => {
  it('잘못된 이메일 형식이면 에러 메시지와 함께 버튼을 비활성화한다', async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText('이메일');
    const pwInput = screen.getByPlaceholderText('비밀번호');
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'wrong-email');
    await userEvent.type(pwInput, 'abcd');

    expect(await screen.findByText('이메일 형식이 올바르지 않습니다.')).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  it('올바른 이메일·비밀번호 입력 시 API 호출 후 로그인·리다이렉트한다', async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText('이메일');
    const pwInput = screen.getByPlaceholderText('비밀번호');
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'test@kakao.com');
    await userEvent.type(pwInput, '1234');

    expect(loginBtn).toBeEnabled();

    await userEvent.click(loginBtn);

    const { postLogin } = await import('@/Api/api');
    expect(postLogin).toHaveBeenCalledWith('test@kakao.com', '1234');

    await waitFor(() =>
      expect(loginSpy).toHaveBeenCalledWith(
        { email: 'test@kakao.com', name: '테스터' },
        'fake-token'
      )
    );

    expect(navigateSpy).toHaveBeenCalledWith('/', { replace: true });
  });
});
