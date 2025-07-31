import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../LoginPage';

// Mock react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useSearchParams: () => [new URLSearchParams(), vi.fn()],
  };
});

// Mock react-toastify
vi.mock('react-toastify', () => ({
  ToastContainer: () => <div data-testid="toast-container" />,
}));

const renderLoginPage = () => {
  return render(
    <BrowserRouter>
      <LoginPage />
    </BrowserRouter>,
  );
};

describe('LoginPage 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로그인 페이지가 올바르게 렌더링되어야 한다', () => {
    renderLoginPage();

    expect(screen.getByText('kakao')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('이메일 입력 필드가 올바르게 작동해야 한다', async () => {
    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('비밀번호 입력 필드가 올바르게 작동해야 한다', async () => {
    renderLoginPage();

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });

  it('이메일과 비밀번호가 모두 입력되면 로그인 버튼이 활성화되어야 한다', async () => {
    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    // 초기에는 비활성화 상태
    expect(loginButton).toBeDisabled();

    // 이메일과 비밀번호 입력
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // 버튼이 활성화되어야 함
    await waitFor(() => {
      expect((loginButton as HTMLButtonElement).disabled).toBe(false);
    });
  });

  it('잘못된 이메일 형식일 때 에러 메시지가 표시되어야 한다', async () => {
    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText('올바른 이메일 형식이 아닙니다.'),
      ).toBeInTheDocument();
    });
  });

  it('비밀번호가 6자 미만일 때 에러 메시지가 표시되어야 한다', async () => {
    renderLoginPage();

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText('비밀번호는 6자 이상이어야 합니다.'),
      ).toBeInTheDocument();
    });
  });

  it('폼 제출 시 로그인 처리가 실행되어야 한다', async () => {
    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    // 유효한 데이터 입력
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // 폼 제출
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('에러 상태일 때 입력 필드에 에러 스타일이 적용되어야 한다', async () => {
    renderLoginPage();

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(emailInput).toHaveStyle('border-bottom-color: #f44336');
    });
  });
});
