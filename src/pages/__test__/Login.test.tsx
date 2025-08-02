import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

vi.mock('@/hooks/useLoginForm', async () => {
  const actual =
    await vi.importActual<typeof import('@/hooks/useLoginForm')>('@/hooks/useLoginForm');
  return actual;
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
    await userEvent.type(pwInput, 'abcdefgh');

    expect(await screen.findByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument();
    expect(loginBtn).toBeDisabled();
  });

  it('올바른 이메일·비밀번호 입력 시 API 호출 후 로그인·리다이렉트한다', async () => {
    renderLogin();

    const emailInput = screen.getByPlaceholderText('이메일');
    const pwInput = screen.getByPlaceholderText('비밀번호');
    const loginBtn = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'test@kakao.com');
    await userEvent.type(pwInput, 'correctPw');

    expect(loginBtn).toBeEnabled();

    await userEvent.click(loginBtn);

    const { postLogin } = await import('@/Api/api');
    expect(postLogin).toHaveBeenCalledWith('test@kakao.com', 'correctPw');

    await waitFor(() =>
      expect(loginSpy).toHaveBeenCalledWith(
        { email: 'test@kakao.com', name: '테스터' },
        'fake-token'
      )
    );

    expect(navigateSpy).toHaveBeenCalledWith('/', { replace: true });
  });
});
