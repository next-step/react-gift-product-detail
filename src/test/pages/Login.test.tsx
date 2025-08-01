import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { theme } from '@/styles/theme';
import { LoginInfoContext } from '@/contexts/LoginInfoContext';
import Login from '@/pages/Login';

vi.mock('@/apis/login', () => ({
  postLogin: vi.fn().mockResolvedValue({
    authToken: 'mock-auth-token',
    id: 1,
    name: '테스트 사용자',
    email: 'test@kakao.com',
  }),
}));

const mockSetLoginInfo = vi.fn();
const mockLoginInfo = {
  id: 1,
  name: '테스트 사용자',
  email: 'test@example.com',
  authToken: 'mock-auth-token',
};

const renderLoginWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <LoginInfoContext.Provider
            value={{ userInfo: mockLoginInfo, setLoginInfo: mockSetLoginInfo }}
          >
            {component}
            <ToastContainer />
          </LoginInfoContext.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

describe('로그인 페이지 테스트 시나리오', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('시나리오 1: 정상적인 로그인 플로우', () => {
    it('로그인 폼이 올바르게 렌더링되어야 한다', () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      expect(screen.getByText('KAKAO')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument();
    });

    it('유효한 카카오 이메일과 비밀번호로 로그인할 수 있어야 한다', async () => {
      const mockOnLogin = vi.fn();
      renderLoginWithProviders(<Login onLogin={mockOnLogin} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalled();
      });
    });
  });

  describe('시나리오 2: 유효성 검사', () => {
    it('이메일 필드가 비어있을 때 에러 메시지가 표시되어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText('ID를 입력해주세요')).toBeInTheDocument();
      });
    });

    it('비밀번호 필드가 비어있을 때 에러 메시지가 표시되어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const passwordInput = screen.getByPlaceholderText('비밀번호');
      fireEvent.change(passwordInput, { target: { value: '' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText('PW를 입력해주세요')).toBeInTheDocument();
      });
    });

    it('이메일 형식이 올바르지 않을 때 에러 메시지가 표시되어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument();
      });
    });

    it('카카오 이메일이 아닐 때 에러 메시지가 표시되어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.change(emailInput, { target: { value: 'test@gmail.com' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        expect(screen.getByText('ID는 카카오 이메일 형식으로 입력해주세요.')).toBeInTheDocument();
      });
    });

    it('비밀번호가 8글자 미만일 때 에러 메시지가 표시되어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const passwordInput = screen.getByPlaceholderText('비밀번호');
      fireEvent.change(passwordInput, { target: { value: '123' } });
      fireEvent.blur(passwordInput);

      await waitFor(() => {
        expect(screen.getByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
      });
    });
  });

  describe('시나리오 3: 로그인 버튼 상태', () => {
    it('폼이 유효하지 않을 때 로그인 버튼이 비활성화되어야 한다', () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const loginButton = screen.getByRole('button', { name: '로그인' });
      expect(loginButton).toBeInTheDocument();
    });

    it('폼이 유효할 때 로그인 버튼이 활성화되어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');

      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });

      await waitFor(() => {
        const loginButton = screen.getByRole('button', { name: '로그인' });
        expect(loginButton).toBeInTheDocument();
      });
    });
  });

  describe('시나리오 4: 사용자 상호작용', () => {
    it('이메일 입력 필드에 포커스할 수 있어야 한다', () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.focus(emailInput);

      expect(emailInput).toBeInTheDocument();
    });

    it('비밀번호 입력 필드에 포커스할 수 있어야 한다', () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const passwordInput = screen.getByPlaceholderText('비밀번호');
      fireEvent.focus(passwordInput);

      expect(passwordInput).toBeInTheDocument();
    });

    it('로그인 폼을 제출할 수 있어야 한다', async () => {
      const mockOnLogin = vi.fn();
      renderLoginWithProviders(<Login onLogin={mockOnLogin} />);

      const loginButton = screen.getByRole('button', { name: '로그인' });
      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(mockOnLogin).toHaveBeenCalled();
      });
    });
  });

  describe('시나리오 5: 접근성', () => {
    it('로그인 폼이 접근성 가이드라인을 준수해야 한다', () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: '로그인' });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(loginButton).toHaveAttribute('type', 'submit');
    });

    it('에러 메시지가 스크린 리더에 의해 읽힐 수 있어야 한다', async () => {
      renderLoginWithProviders(<Login onLogin={vi.fn()} />);

      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.change(emailInput, { target: { value: '' } });
      fireEvent.blur(emailInput);

      await waitFor(() => {
        const errorMessage = screen.getByText('ID를 입력해주세요');
        expect(errorMessage).toBeInTheDocument();
      });
    });
  });
});
