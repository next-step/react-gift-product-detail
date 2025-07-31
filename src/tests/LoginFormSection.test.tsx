import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import LoginFormSection from '../pages/Login/components/LoginFormSection';
import theme from '../styles/theme';
import { UserManagementProvider } from '../pages/Login/contexts/UserManagement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as loginFormHook from '../pages/Login/hooks/useLoginForm';

const queryClient = new QueryClient();

// renderComponent 함수를 describe 바깥에 선언해서 모든 테스트에서 사용 가능하도록 함
const renderComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserManagementProvider>
          <QueryClientProvider client={queryClient}>
            <LoginFormSection />
          </QueryClientProvider>
        </UserManagementProvider>
      </BrowserRouter>
    </ThemeProvider>
  );

vi.mock('../pages/Login/hooks/useLoginForm', () => {
  return {
    useLoginForm: vi.fn(() => ({
      email: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      password: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      isValid: false,
      goToLogin: vi.fn(),
      loading: false,
    })),
  };
});

describe('LoginFormSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('초기 렌더링 시 이메일, 비밀번호 입력과 로그인 버튼이 보여지고 버튼은 비활성화', () => {
    vi.spyOn(loginFormHook, 'useLoginForm').mockReturnValue({
      email: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      password: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      isValid: false,
      goToLogin: vi.fn(),
      loading: false,
    });

    renderComponent();

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeInTheDocument();
    expect(loginButton).toBeDisabled();
  });

  it('유효한 이메일과 비밀번호가 입력되면 로그인 버튼이 활성화된다', () => {
    const goToLoginMock = vi.fn();

    vi.spyOn(loginFormHook, 'useLoginForm').mockReturnValue({
      email: {
        value: 'test@example.com',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: true,
      },
      password: {
        value: 'password123',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: true,
      },
      isValid: true,
      goToLogin: goToLoginMock,
      loading: false,
    });

    renderComponent();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);
    expect(goToLoginMock).toHaveBeenCalled();
  });

  // Form Field에 대한 테스트 코드

  it('이메일 입력 필드에 값 입력 시 onChange 핸들러가 호출된다', () => {
    const onChangeMock = vi.fn();
    vi.spyOn(loginFormHook, 'useLoginForm').mockReturnValue({
      email: {
        value: '',
        error: '',
        onChange: onChangeMock,
        validate: vi.fn(),
        isValid: false,
      },
      password: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      isValid: false,
      goToLogin: vi.fn(),
      loading: false,
    });

    renderComponent();

    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'user@test.com' } });

    expect(onChangeMock).toHaveBeenCalledWith('user@test.com');
  });

  it('비밀번호 입력 필드에서 onBlur 이벤트 발생 시 validate 핸들러가 호출된다', () => {
    const validateMock = vi.fn();

    vi.spyOn(loginFormHook, 'useLoginForm').mockReturnValue({
      email: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      password: {
        value: '',
        error: '',
        onChange: vi.fn(),
        validate: validateMock,
        isValid: false,
      },
      isValid: false,
      goToLogin: vi.fn(),
      loading: false,
    });

    renderComponent();

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.blur(passwordInput);

    expect(validateMock).toHaveBeenCalled();
  });

  it('에러 메시지가 전달되면 해당 에러 메시지가 표시된다', () => {
    vi.spyOn(loginFormHook, 'useLoginForm').mockReturnValue({
      email: {
        value: '',
        error: '이메일 에러',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      password: {
        value: '',
        error: '비밀번호 에러',
        onChange: vi.fn(),
        validate: vi.fn(),
        isValid: false,
      },
      isValid: false,
      goToLogin: vi.fn(),
      loading: false,
    });

    renderComponent();

    expect(screen.getByText('이메일 에러')).toBeInTheDocument();
    expect(screen.getByText('비밀번호 에러')).toBeInTheDocument();
  });
});
