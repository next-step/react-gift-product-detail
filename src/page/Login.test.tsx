import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// AuthContext Mock
const mockLogIn = vi.fn();
const mockNavigate = vi.fn();

vi.mock('@/context/AuthContext', () => ({
  useAuth: () => ({
    user: null,
    logIn: mockLogIn,
  }),
}));

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
  ToastContainer: () => <div />,
}));

describe('Login Component', () => {
  beforeEach(() => {
    mockLogIn.mockReset();
    mockNavigate.mockReset();
  });

  test('초기 입력창, 로그인 비활성화', () => {
    render(<Login />);
    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeDisabled();
  });

  test('잘못된 이메일  에러 메시지 ', async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/이메일/i);

    await userEvent.type(emailInput, 'wrongemail');
    await userEvent.tab(); // blur 이벤트 발생

    expect(await screen.findByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument();
  });

  test('빈 이메일  에러 메시지', async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/이메일/i);

    await userEvent.clear(emailInput);
    await userEvent.tab();

    expect(await screen.findByText('ID를 입력해주세요.')).toBeInTheDocument();
  });

  test('비밀번호가 8글자 미만일 때 에러 메시지 ', async () => {
    render(<Login />);
    const pwInput = screen.getByPlaceholderText(/비밀번호/i);

    await userEvent.type(pwInput, '1234567');
    await userEvent.tab();

    expect(await screen.findByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
  });

  test('빈 비밀번호 에러 메시지', async () => {
    render(<Login />);
    const pwInput = screen.getByPlaceholderText(/비밀번호/i);

    await userEvent.clear(pwInput);
    await userEvent.tab();

    expect(await screen.findByText('PW를 입력해주세요.')).toBeInTheDocument();
  });

  test('모두 유효하면 로그인 버튼 활성화', async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const pwInput = screen.getByPlaceholderText(/비밀번호/i);
    const loginBtn = screen.getByRole('button', { name: /로그인/i });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(pwInput, 'validPassword');

    expect(loginBtn).toBeEnabled();
  });

  test('로그인 성공 시 navigate("/My") 호출', async () => {
    mockLogIn.mockResolvedValueOnce(undefined);

    render(<Login />);
    await userEvent.type(screen.getByPlaceholderText(/이메일/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/비밀번호/i), 'validPassword');

    const loginBtn = screen.getByRole('button', { name: /로그인/i });
    await userEvent.click(loginBtn);

    await waitFor(() => {
      expect(mockLogIn).toHaveBeenCalledWith('test@example.com', 'validPassword');
      expect(mockNavigate).toHaveBeenCalledWith('/My');
    });
  });

  test('로그인 실패 시 toast.error ', async () => {
    const errorMessage = '로그인 실패';
    mockLogIn.mockRejectedValueOnce(new Error(errorMessage));

    const { toast } = await import('react-toastify');

    render(<Login />);
    await userEvent.type(screen.getByPlaceholderText(/이메일/i), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText(/비밀번호/i), 'validPassword');

    const loginBtn = screen.getByRole('button', { name: /로그인/i });
    await userEvent.click(loginBtn);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(errorMessage);
    });
  });

});
