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
});
