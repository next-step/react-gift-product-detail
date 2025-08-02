import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
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

describe('LoginPage 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('로그인 페이지가 올바르게 렌더링되어야 한다', () => {
    render(<LoginPage />);

    expect(screen.getByText('kakao')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    // 로그인 버튼은 여러 개가 있으므로 더 구체적으로 확인
    const submitButton = screen
      .getAllByRole('button')
      .find(
        (button) =>
          button.textContent === '로그인' &&
          button.getAttribute('type') === 'submit',
      );
    expect(submitButton).toBeInTheDocument();
  });

  it('이메일 입력 필드가 올바르게 작동해야 한다', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

    expect(emailInput).toHaveValue('test@example.com');
  });

  it('비밀번호 입력 필드가 올바르게 작동해야 한다', async () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(passwordInput).toHaveValue('password123');
  });

  it('이메일과 비밀번호가 모두 입력되면 로그인 버튼이 활성화되어야 한다', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen
      .getAllByRole('button')
      .find(
        (button) =>
          button.textContent === '로그인' &&
          button.getAttribute('type') === 'submit',
      )!;

    // 초기에는 비활성화 상태
    expect(loginButton).toBeDisabled();

    // 이메일과 비밀번호 입력
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // 버튼이 활성화되어야 함
    await waitFor(() => {
      expect((loginButton as HTMLButtonElement).disabled).toBe(false);
    });
  });

  it('잘못된 이메일 형식일 때 에러 메시지가 표시되어야 한다', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(
        screen.getByText('@kakao.com 이메일 주소만 가능합니다.'),
      ).toBeInTheDocument();
    });
  });

  it('비밀번호가 8자 미만일 때 에러 메시지가 표시되어야 한다', async () => {
    render(<LoginPage />);

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: '123' } });
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(
        screen.getByText('PW는 최소 8글자 이상이어야 합니다.'),
      ).toBeInTheDocument();
    });
  });

  it('폼 제출 시 로그인 처리가 실행되어야 한다', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen
      .getAllByRole('button')
      .find(
        (button) =>
          button.textContent === '로그인' &&
          button.getAttribute('type') === 'submit',
      )!;

    // 유효한 데이터 입력
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    // 폼 제출
    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalled();
    });
  });

  it('에러 상태일 때 입력 필드에 에러 스타일이 적용되어야 한다', async () => {
    render(<LoginPage />);

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.blur(emailInput);

    await waitFor(() => {
      expect(emailInput).toHaveStyle('border-bottom-color: #f44336');
    });
  });
});
