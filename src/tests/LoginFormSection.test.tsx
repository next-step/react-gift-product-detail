import { fireEvent, render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import LoginFormSection from '../pages/Login/components/LoginFormSection';
import theme from '../styles/theme';
import { UserManagementProvider } from '../pages/Login/contexts/UserManagement';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as loginFormHook from '../pages/Login/hooks/useLoginForm';

// 앱의 main.tsx 설정을 반영하여 QueryClient 생성
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        throwOnError: true,
      },
      mutations: {
        throwOnError: true,
      },
    },
  });

const renderComponent = () =>
  render(
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <UserManagementProvider>
          <QueryClientProvider client={createTestQueryClient()}>
            <LoginFormSection />
          </QueryClientProvider>
        </UserManagementProvider>
      </BrowserRouter>
    </ThemeProvider>
  );

vi.mock('../pages/Login/hooks/useLoginForm', () => ({
  useLoginForm: vi.fn(() => ({
    email: {
      value: '',
      error: '',
      onChange: () => {},
      validate: () => {},
      isValid: false,
    },
    password: {
      value: '',
      error: '',
      onChange: () => {},
      validate: () => {},
      isValid: false,
    },
    isValid: false,
    goToLogin: () => {},
    loading: false,
  })),
}));

describe('LoginFormSection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('초기 렌더링 시 이메일, 비밀번호 입력과 로그인 버튼이 보여지고 버튼은 비활성화', () => {
    const mockedUseLoginForm = vi.mocked(loginFormHook.useLoginForm);
    mockedUseLoginForm.mockReturnValue({
      email: {
        value: '',
        error: '',
        onChange: () => {},
        validate: () => {},
        isValid: false,
      },
      password: {
        value: '',
        error: '',
        onChange: () => {},
        validate: () => {},
        isValid: false,
      },
      isValid: false,
      goToLogin: () => {},
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
    const mockedUseLoginForm = vi.mocked(loginFormHook.useLoginForm);
    mockedUseLoginForm.mockReturnValue({
      email: {
        value: 'test@example.com',
        error: '',
        onChange: () => {},
        validate: () => {},
        isValid: true,
      },
      password: {
        value: 'validpassword',
        error: '',
        onChange: () => {},
        validate: () => {},
        isValid: true,
      },
      isValid: true,
      goToLogin: () => {},
      loading: false,
    });

    renderComponent();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeEnabled();
  });

  it('이메일과 비밀번호에 에러 메시지가 있을 때, 에러 메시지가 화면에 렌더링된다', () => {
    const emailError = '이메일 형식이 올바르지 않습니다';
    const passwordError = '비밀번호는 8자 이상이어야 합니다';

    const mockedUseLoginForm = vi.mocked(loginFormHook.useLoginForm);
    mockedUseLoginForm.mockReturnValue({
      email: {
        value: 'invalid',
        error: emailError,
        onChange: () => {},
        validate: () => {},
        isValid: false,
      },
      password: {
        value: '123',
        error: passwordError,
        onChange: () => {},
        validate: () => {},
        isValid: false,
      },
      isValid: false,
      goToLogin: () => {},
      loading: false,
    });

    renderComponent();

    expect(screen.getByText(emailError)).toBeInTheDocument();
    expect(screen.getByText(passwordError)).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeDisabled();
  });

  it('로그인 버튼 클릭 시 버튼이 활성화 상태인지 확인 (내부 goToLogin 호출 여부는 테스트하지 않음)', () => {
    const mockedUseLoginForm = vi.mocked(loginFormHook.useLoginForm);
    mockedUseLoginForm.mockReturnValue({
      email: {
        value: 'test@example.com',
        error: '',
        onChange: () => {},
        validate: () => {},
        isValid: true,
      },
      password: {
        value: 'validpassword',
        error: '',
        onChange: () => {},
        validate: () => {},
        isValid: true,
      },
      isValid: true,
      goToLogin: () => {},
      loading: false,
    });

    renderComponent();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeEnabled();

    fireEvent.click(loginButton);
    // 내부 함수 호출 여부는 확인하지 않음
  });
});
