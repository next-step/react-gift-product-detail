import { describe, it, expect, vi } from 'vitest';
import Login from '@/pages/Login/Login';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';

vi.mock('react-toastify', () => ({
  toast: { error: vi.fn() },
}));

vi.mock('@/api/login', () => ({
  login: vi.fn(({ email }: { email: string }) => {
    if (!email.endsWith('@kakao.com')) {
      return Promise.reject(new Error('유효하지 않은 이메일 도메인입니다.'));
    }
    return Promise.resolve({ id: 1, name: 'Alice' });
  }),
}));

vi.mock('@/storage/userInfo', () => ({
  saveUserInfo: vi.fn(),
}));

const renderLogin = () => {
  const queryClient = new QueryClient();
  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
};

describe('Login Page', () => {
  it('renders email, password inputs and login button', () => {
    renderLogin();

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('shows email validation error when email is invalid', () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), { target: { value: 'invalidemail' } });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'validPass123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /로그인/i }));

    expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
  });

  it('disables login button when password is less than 8 characters', () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@kakao.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '1234567' } }); // 7글자

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeDisabled();
  });

  it('enables login button when password is 8 characters or more', () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@kakao.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), { target: { value: '12345678' } }); // 8글자

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeEnabled();
  });

  it('calls login API and succeeds only with kakao.com email', async () => {
    const { login } = await import('@/api/login');
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@kakao.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'validPassword123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
      expect(login).toHaveBeenCalledWith({
        email: 'test@kakao.com',
        password: 'validPassword123',
      });
    });
  });

  it('shows error toast on login failure for invalid domain', async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'fail@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'validPassword123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('유효하지 않은 이메일 도메인입니다.');
    });
  });
});
