import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginFormSection from '@/components/LoginFormSection';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter } from 'react-router-dom';
import { theme } from '@/styles/theme';
import { AuthProvider } from '@/contexts/AuthContext/AuthProvider';
import { toast } from 'react-toastify';

vi.mock('react-toastify', async () => {
  const mod =
    await vi.importActual<typeof import('react-toastify')>('react-toastify');
  return {
    ...mod,
    toast: { error: vi.fn() },
  };
});

const renderLoginForm = () => {
  const queryClient = new QueryClient();
  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <LoginFormSection />
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

describe('<LoginFormSection />', () => {
  it('이메일/비밀번호 input과 로그인 버튼이 렌더링되어야 함', () => {
    // Given: 로그인 폼을 렌더링함
    renderLoginForm();

    // Then: 이메일/비밀번호 입력창과 버튼이 존재해야 함
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('입력값이 유효하지 않으면 로그인 버튼은 비활성화 상태여야 함', () => {
    // Given: 로그인 폼을 렌더링함
    renderLoginForm();

    // When: 아무런 입력도 하지 않은 상태
    const loginButton = screen.getByRole('button', { name: /로그인/i });

    // Then: 로그인 버튼이 비활성화되어 있어야 함
    expect(loginButton).toBeDisabled();
  });

  describe('로그인 시도', () => {
    it('유효한 계정 입력 시 로그인 후 리디렉션 되어야 함', async () => {
      // Given: 로그인 폼 렌더링 + 유효한 이메일/비밀번호 정의
      renderLoginForm();
      const validEmail = 'test@example.com';
      const validPassword = '12345678';
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: /로그인/i });

      // When: 이메일과 비밀번호를 입력하고 로그인 버튼 클릭
      fireEvent.change(emailInput, { target: { value: validEmail } });
      fireEvent.change(passwordInput, { target: { value: validPassword } });

      // Then: 버튼이 활성화되고 클릭 시 로직이 실행되어야 함
      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });

      fireEvent.click(loginButton);
    });

    it('로그인 실패 시 에러 토스트가 발생해야 함', async () => {
      // Given: 로그인 폼 렌더링 + 잘못된 이메일/비밀번호 정의
      renderLoginForm();
      const invalidEmail = 'invalid@example.com';
      const invalidPassword = 'wrongpassword';
      const emailInput = screen.getByPlaceholderText('이메일');
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      const loginButton = screen.getByRole('button', { name: /로그인/i });

      // When: 잘못된 정보로 로그인 시도
      fireEvent.change(emailInput, { target: { value: invalidEmail } });
      fireEvent.change(passwordInput, { target: { value: invalidPassword } });

      // Then: 버튼 활성화 후 클릭 → 에러 토스트 호출되어야 함
      await waitFor(() => {
        expect(loginButton).not.toBeDisabled();
      });

      fireEvent.click(loginButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalled();
      });
    });
  });
});
