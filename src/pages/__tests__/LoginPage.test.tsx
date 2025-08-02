import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import LoginPage from '../LoginPage';
import { theme } from '../../styles/theme';
import { AuthProvider } from '../../hooks/useAuth';
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
}));

vi.mock('@/hooks/useLoginForm', () => ({
  default: vi.fn(),
}));

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { useAuth: mockUseAuth } = (await import('@/hooks/useAuth')) as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const { default: mockUseLoginForm } = (await import('@/hooks/useLoginForm')) as any;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
        staleTime: 0,
      },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('LoginPage', () => {
  const mockRegister = vi.fn();
  const mockHandleSubmit = vi.fn();
  const mockLogin = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    // useLoginForm
    mockUseLoginForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      isValid: false,
      values: { email: '', password: '' },
    });

    // useAuth
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      user: null,
      logout: vi.fn(),
    });
  });

  it('로그인 페이지가 올바르게 렌더링되는지 확인', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    expect(screen.getByAltText('kakao 로고')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
  });

  it('이메일 입력 필드가 올바른 속성을 가지고 있는지 확인', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    const emailInput = screen.getByPlaceholderText('이메일');
    expect(emailInput).toHaveAttribute('type', 'email');
  });

  it('비밀번호 입력 필드가 올바른 속성을 가지고 있는지 확인', () => {
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    expect(passwordInput).toHaveAttribute('type', 'password');
  });

  it('이메일 에러가 있을 때 에러 메시지가 표시되는지 확인', () => {
    mockUseLoginForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {
        email: { message: 'ID를 입력해주세요.', type: 'required' },
      },
      isValid: false,
      values: { email: '', password: '' },
    });

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument();
  });

  it('비밀번호 에러가 있을 때 에러 메시지가 표시되는지 확인', () => {
    mockUseLoginForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {
        password: { message: 'PW를 입력해주세요.', type: 'required' },
      },
      isValid: false,
      values: { email: '', password: '' },
    });

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    expect(screen.getByText('PW를 입력해주세요.')).toBeInTheDocument();
  });

  it('폼이 유효하지 않을 때 로그인 버튼이 비활성화되는지 확인', () => {
    mockUseLoginForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      isValid: false,
      values: { email: '', password: '' },
    });

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).toBeDisabled();
  });

  it('폼이 유효할 때 로그인 버튼이 활성화되는지 확인', () => {
    mockUseLoginForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {},
      isValid: true,
      values: { email: 'test@example.com', password: 'password123' },
    });

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).not.toBeDisabled();
  });

  it('이메일과 비밀번호 모두 에러가 있을 때 두 에러 메시지가 모두 표시되는지 확인', () => {
    mockUseLoginForm.mockReturnValue({
      register: mockRegister,
      handleSubmit: mockHandleSubmit,
      errors: {
        email: { message: 'ID를 입력해주세요.', type: 'required' },
        password: { message: 'PW를 입력해주세요.', type: 'required' },
      },
      isValid: false,
      values: { email: '', password: '' },
    });

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument();
    expect(screen.getByText('PW를 입력해주세요.')).toBeInTheDocument();
  });

  it('이미 로그인된 사용자가 접근 시 마이페이지로 리다이렉트되는지 확인', () => {
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      user: { authToken: 'test-token', email: 'test@example.com', name: 'Test User' },
      logout: vi.fn(),
    });

    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    expect(screen.queryByPlaceholderText('이메일')).not.toBeInTheDocument();
    expect(screen.queryByPlaceholderText('비밀번호')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '로그인' })).not.toBeInTheDocument();
  });
});
