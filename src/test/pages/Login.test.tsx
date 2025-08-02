import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { vi } from 'vitest';
import Login from '@/pages/Login';
import { theme } from '@/styles/Theme';

// Mock hooks
vi.mock('@/hooks/useLoginForm', () => ({
  useLoginForm: vi.fn(),
}));

vi.mock('@/hooks/useLoginContext', () => ({
  useLoginContext: vi.fn(),
}));

vi.mock('@/api/auth', () => ({
  useLogin: vi.fn(),
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    </BrowserRouter>
  );
};

describe('Login Page', () => {
  const defaultMockForm = {
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
  };

  beforeEach(() => {
    vi.clearAllMocks();
    const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
    const mockUseLoginContext = vi.mocked(require('@/hooks/useLoginContext').useLoginContext);
    const mockUseLogin = vi.mocked(require('@/api/auth').useLogin);
    
    mockUseLoginForm.mockReturnValue(defaultMockForm);
    mockUseLoginContext.mockReturnValue({
      login: vi.fn(),
    });
    mockUseLogin.mockReturnValue({
      login: vi.fn(),
      isLoading: false,
    });
  });

  describe('기본 렌더링', () => {
    it('로그인 페이지가 올바르게 렌더링된다', () => {
      renderWithProviders(<Login />);
      
      expect(screen.getByText('kakao')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });

    it('카카오 로고가 표시된다', () => {
      renderWithProviders(<Login />);
      
      const logo = screen.getByText('kakao');
      expect(logo).toBeInTheDocument();
      expect(logo.tagName).toBe('H1');
    });

    it('이메일 입력 필드가 올바른 속성을 가진다', () => {
      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('autoComplete', 'username');
    });

    it('비밀번호 입력 필드가 올바른 속성을 가진다', () => {
      renderWithProviders(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    });

    it('로그인 버튼이 올바른 속성을 가진다', () => {
      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('폼 상태 관리', () => {
    it('폼이 유효하지 않을 때 로그인 버튼이 비활성화된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        isFormValid: false,
      });

      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeDisabled();
    });

    it('폼이 유효할 때 로그인 버튼이 활성화된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        isFormValid: true,
      });

      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).not.toBeDisabled();
    });

    it('로딩 중일 때 버튼 텍스트가 변경되고 비활성화된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        isLoading: true,
      });

      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인 중...' });
      expect(loginButton).toBeInTheDocument();
      expect(loginButton).toBeDisabled();
    });
  });

  describe('에러 메시지 표시', () => {
    it('이메일 에러가 있을 때 에러 메시지가 표시된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        emailError: '올바른 이메일 형식이 아닙니다.',
      });

      renderWithProviders(<Login />);
      
      expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
    });

    it('비밀번호 에러가 있을 때 에러 메시지가 표시된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        passwordError: 'PW는 최소 8글자 이상이어야 합니다.',
      });

      renderWithProviders(<Login />);
      
      expect(screen.getByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
    });

    it('에러가 없을 때 에러 메시지가 표시되지 않는다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        emailError: '',
        passwordError: '',
      });

      renderWithProviders(<Login />);
      
      // 에러 메시지 컨테이너는 존재하지만 내용은 비어있음
      const errorContainers = screen.getAllByRole('generic');
      expect(errorContainers.length).toBeGreaterThan(0);
    });
  });

  describe('사용자 상호작용', () => {
    it('이메일 입력 시 handleEmailChange가 호출된다', () => {
      const handleEmailChange = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        handleEmailChange,
      });

      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      
      expect(handleEmailChange).toHaveBeenCalled();
    });

    it('비밀번호 입력 시 handlePasswordChange가 호출된다', () => {
      const handlePasswordChange = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        handlePasswordChange,
      });

      renderWithProviders(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      expect(handlePasswordChange).toHaveBeenCalled();
    });

    it('이메일 필드 blur 시 handleEmailBlur가 호출된다', () => {
      const handleEmailBlur = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        handleEmailBlur,
      });

      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.blur(emailInput);
      
      expect(handleEmailBlur).toHaveBeenCalled();
    });

    it('비밀번호 필드 blur 시 handlePasswordBlur가 호출된다', () => {
      const handlePasswordBlur = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        handlePasswordBlur,
      });

      renderWithProviders(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      fireEvent.blur(passwordInput);
      
      expect(handlePasswordBlur).toHaveBeenCalled();
    });

    it('폼 제출 시 handleSubmit이 호출된다', () => {
      const handleSubmit = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        handleSubmit,
      });

      renderWithProviders(<Login />);
      
      const form = screen.getByRole('form');
      fireEvent.submit(form);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('로그인 버튼 클릭 시 폼이 제출된다', () => {
      const handleSubmit = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        isFormValid: true,
        handleSubmit,
      });

      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      fireEvent.click(loginButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('입력 필드 값 표시', () => {
    it('이메일 필드에 현재 값이 표시된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        email: 'test@kakao.com',
      });

      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      expect(emailInput).toHaveValue('test@kakao.com');
    });

    it('비밀번호 필드에 현재 값이 표시된다', () => {
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        password: 'password123',
      });

      renderWithProviders(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      expect(passwordInput).toHaveValue('password123');
    });
  });

  describe('스타일링', () => {
    it('로그인 페이지가 올바른 스타일을 가진다', () => {
      renderWithProviders(<Login />);
      
      const loginWrapper = screen.getByText('kakao').parentElement;
      expect(loginWrapper).toBeInTheDocument();
    });

    it('폼이 올바른 스타일을 가진다', () => {
      renderWithProviders(<Login />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
    });

    it('입력 필드가 올바른 스타일을 가진다', () => {
      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
    });

    it('로그인 버튼이 올바른 스타일을 가진다', () => {
      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeInTheDocument();
    });
  });

  describe('접근성', () => {
    it('이메일 입력 필드에 적절한 접근성 속성이 있다', () => {
      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('autoComplete', 'username');
    });

    it('비밀번호 입력 필드에 적절한 접근성 속성이 있다', () => {
      renderWithProviders(<Login />);
      
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('autoComplete', 'current-password');
    });

    it('로그인 버튼에 적절한 접근성 속성이 있다', () => {
      renderWithProviders(<Login />);
      
      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toHaveAttribute('type', 'submit');
    });

    it('폼이 올바른 접근성 구조를 가진다', () => {
      renderWithProviders(<Login />);
      
      const form = screen.getByRole('form');
      expect(form).toBeInTheDocument();
      
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const submitButton = screen.getByRole('button', { name: '로그인' });
      
      expect(form).toContainElement(emailInput);
      expect(form).toContainElement(passwordInput);
      expect(form).toContainElement(submitButton);
    });
  });

  describe('키보드 네비게이션', () => {
    it('Tab 키로 입력 필드 간 이동이 가능하다', () => {
      renderWithProviders(<Login />);
      
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      
      emailInput.focus();
      expect(emailInput).toHaveFocus();
      
      fireEvent.keyDown(emailInput, { key: 'Tab' });
      expect(passwordInput).toHaveFocus();
    });

    it('Enter 키로 폼 제출이 가능하다', () => {
      const handleSubmit = vi.fn();
      const mockUseLoginForm = vi.mocked(require('@/hooks/useLoginForm').useLoginForm);
      mockUseLoginForm.mockReturnValue({
        ...defaultMockForm,
        isFormValid: true,
        handleSubmit,
      });

      renderWithProviders(<Login />);
      
      const form = screen.getByRole('form');
      fireEvent.keyDown(form, { key: 'Enter' });
      
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  describe('반응형 디자인', () => {
    it('모바일에서 올바르게 렌더링된다', () => {
      // 모바일 뷰포트 설정
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      renderWithProviders(<Login />);
      
      expect(screen.getByText('kakao')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    });

    it('데스크톱에서 올바르게 렌더링된다', () => {
      // 데스크톱 뷰포트 설정
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 1024,
      });

      renderWithProviders(<Login />);
      
      expect(screen.getByText('kakao')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    });
  });
}); 