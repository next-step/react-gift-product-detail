import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils/test-utils';
import userEvent from '@testing-library/user-event';
import Login from '@/pages/Login';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      state: null,
      pathname: '/login',
      search: '',
      hash: '',
    }),
  };
});

// Mock useLoginForm hook
const mockUseLoginForm = vi.fn();
vi.mock('@/hooks/useLoginForm', () => ({
  useLoginForm: (options: any) => mockUseLoginForm(options),
}));

describe('Login Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // 기본 mock 설정
    mockUseLoginForm.mockReturnValue({
      email: '',
      emailError: '',
      handleEmailChange: vi.fn(),
      handleEmailBlur: vi.fn(),
      password: '',
      passwordError: '',
      handlePasswordChange: vi.fn(),
      handlePasswordBlur: vi.fn(),
      isFormValid: false,
      handleSubmit: vi.fn(),
      isLoading: false,
    });
  });

  describe('렌더링', () => {
    it('should render login page with all required elements', () => {
      render(<Login />);
      
      // 로고 확인
      expect(screen.getByText('kakao')).toBeInTheDocument();
      
      // 폼 요소들 확인
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });

    it('should have proper input types and attributes', () => {
      render(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('autoComplete', 'username');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    });
  });

  describe('폼 상태 관리', () => {
    it('should show loading state when isLoading is true', () => {
      mockUseLoginForm.mockReturnValue({
        email: '',
        emailError: '',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: '',
        passwordError: '',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: true,
      });

      render(<Login />);
      
      expect(screen.getByRole('button', { name: '로그인 중...' })).toBeInTheDocument();
    });

    it('should disable login button when form is not valid', () => {
      mockUseLoginForm.mockReturnValue({
        email: '',
        emailError: '',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: '',
        passwordError: '',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeDisabled();
    });

    it('should enable login button when form is valid', () => {
      mockUseLoginForm.mockReturnValue({
        email: 'test@kakao.com',
        emailError: '',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: 'password123',
        passwordError: '',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: true,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).not.toBeDisabled();
    });
  });

  describe('에러 메시지 표시', () => {
    it('should display email error message', () => {
      mockUseLoginForm.mockReturnValue({
        email: 'invalid-email',
        emailError: '올바른 이메일 형식이 아닙니다.',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: '',
        passwordError: '',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });

    it('should display password error message', () => {
      mockUseLoginForm.mockReturnValue({
        email: '',
        emailError: '',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: '123',
        passwordError: 'PW는 최소 8글자 이상이어야 합니다.',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      expect(screen.getByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
    });

    it('should display multiple error messages', () => {
      mockUseLoginForm.mockReturnValue({
        email: 'invalid-email',
        emailError: '올바른 이메일 형식이 아닙니다.',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: '123',
        passwordError: 'PW는 최소 8글자 이상이어야 합니다.',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
      expect(screen.getByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
    });
  });

  describe('사용자 상호작용', () => {
    it('should call handleEmailChange when email input changes', async () => {
      const mockHandleEmailChange = vi.fn();
      mockUseLoginForm.mockReturnValue({
        email: '',
        emailError: '',
        handleEmailChange: mockHandleEmailChange,
        handleEmailBlur: vi.fn(),
        password: '',
        passwordError: '',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      await userEvent.type(emailInput, 'test@kakao.com');
      
      expect(mockHandleEmailChange).toHaveBeenCalled();
    });

    it('should call handlePasswordChange when password input changes', async () => {
      const mockHandlePasswordChange = vi.fn();
      mockUseLoginForm.mockReturnValue({
        email: '',
        emailError: '',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: '',
        passwordError: '',
        handlePasswordChange: mockHandlePasswordChange,
        handlePasswordBlur: vi.fn(),
        isFormValid: false,
        handleSubmit: vi.fn(),
        isLoading: false,
      });

      render(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      await userEvent.type(passwordInput, 'password123');
      
      expect(mockHandlePasswordChange).toHaveBeenCalled();
    });

    it('should call handleSubmit when form is submitted', async () => {
      const mockHandleSubmit = vi.fn();
      mockUseLoginForm.mockReturnValue({
        email: 'test@kakao.com',
        emailError: '',
        handleEmailChange: vi.fn(),
        handleEmailBlur: vi.fn(),
        password: 'password123',
        passwordError: '',
        handlePasswordChange: vi.fn(),
        handlePasswordBlur: vi.fn(),
        isFormValid: true,
        handleSubmit: mockHandleSubmit,
        isLoading: false,
      });

      render(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      await userEvent.click(loginButton);
      
      expect(mockHandleSubmit).toHaveBeenCalled();
    });
  });

  describe('접근성', () => {
    it('should have proper form structure', () => {
      render(<Login />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('should have proper button type', () => {
      render(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toHaveAttribute('type', 'submit');
    });

    it('should have proper input labels and placeholders', () => {
      render(<Login />);
      
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    });
  });

  describe('반응형 디자인', () => {
    it('should have responsive styling classes', () => {
      render(<Login />);
      
      const form = screen.getByRole('form');
      expect(form).toHaveClass('Form');
    });

    it('should have proper layout structure', () => {
      render(<Login />);
      
      const wrapper = screen.getByText('kakao').closest('div');
      expect(wrapper).toHaveClass('LoginWrapper');
    });
  });
}); 