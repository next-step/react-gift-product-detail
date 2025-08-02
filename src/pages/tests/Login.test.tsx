import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

const renderLoginPage = () =>
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider>
    </MemoryRouter>
  );

const getElements = () => {
  return {
    emailInput: screen.getByPlaceholderText(/이메일/i),
    passwordInput: screen.getByPlaceholderText(/비밀번호/i),
    loginButton: screen.getByRole('button', { name: /로그인/i }),
  };
};

describe('Login Page', () => {
  beforeEach(() => {
    renderLoginPage();
  });

  it('이메일/비밀번호 입력창, 버튼 렌더링 테스트', () => {
    const { emailInput, passwordInput, loginButton } = getElements();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('빈 값에서 blur 시 에러 메시지 출력 테스트', async () => {
    const { emailInput } = getElements();
    const user = userEvent.setup();

    await user.click(emailInput);
    await user.tab();

    expect(await screen.findByText(/ID를 입력해주세요/i)).toBeInTheDocument();
  });

  it('이메일, 비밀번호 유효성 검사 통과 시, 버튼 활성화 테스트', async () => {
    const { emailInput, passwordInput, loginButton } = getElements();
    const user = userEvent.setup();

    expect(loginButton).toBeDisabled();

    await user.type(emailInput, 'test@kakao.com');
    await user.tab();
    await user.type(passwordInput, '12345678');
    await user.tab();

    expect(loginButton).not.toBeDisabled();
  });

  it('@kakao.com 아닌 이메일일 경우, toast.warn 호출 테스트', async () => {
    const { emailInput, passwordInput, loginButton } = getElements();
    const user = userEvent.setup();

    await user.type(emailInput, 'test@gmail.com');
    await user.tab();
    await user.type(passwordInput, '12345678');
    await user.tab();
    await user.click(loginButton);

    expect(toast.warn).toHaveBeenCalledWith(
      '@kakao.com 이메일 주소만 가능합니다.',
      expect.any(Object)
    );
  });
});
