import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/theme';
import { toast } from 'react-toastify';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('@/hooks/useUserInfo', () => {
  return {
    __esModule: true,
    default: () => ({
      isValid: false,
      setUser: vi.fn(),
    }),
  };
});

vi.mock('react-toastify', () => ({
  toast: { warn: vi.fn() },
}));

describe('Login Page', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Login />
        </ThemeProvider>
      </MemoryRouter>
    );
  });

  it('이메일/비밀번호 입력창, 버튼 렌더링 테스트', () => {
    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('빈 값에서 blur 시 에러 메시지 출력 테스트', async () => {
    const emailInput = screen.getByPlaceholderText(/이메일/i);
    fireEvent.focus(emailInput);
    fireEvent.blur(emailInput);

    expect(await screen.findByText(/ID를 입력해주세요/i)).toBeInTheDocument();
  });

  it('이메일, 비밀번호 유효성 검사 통과 시, 버튼 활성화 테스트', () => {
    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호/i);
    const button = screen.getByRole('button', { name: /로그인/i });

    expect(button).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.blur(passwordInput);

    expect(button).not.toBeDisabled();
  });

  it('@kakao.com 아닌 이메일일 경우, toast.warn 호출 테스트', () => {
    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const passwordInput = screen.getByPlaceholderText(/비밀번호/i);
    const button = screen.getByRole('button', { name: /로그인/i });

    fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: '12345678' } });
    fireEvent.blur(passwordInput);
    fireEvent.click(button);

    expect(toast.warn).toHaveBeenCalledWith(
      '@kakao.com 이메일 주소만 가능합니다.',
      expect.any(Object)
    );
  });
});
