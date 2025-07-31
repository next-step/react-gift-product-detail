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
    renderLoginForm();

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('입력값이 유효하지 않으면 로그인 버튼은 비활성화 상태여야 함', () => {
    renderLoginForm();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    expect(loginButton).toBeDisabled();
  });

  it('유효한 계정 입력 시 로그인 후 리디렉션 되어야 함', async () => {
    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: '12345678' },
    });

    const loginButton = await screen.findByRole('button', { name: /로그인/i });
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });

    fireEvent.click(loginButton);
  });

  it('로그인 실패 시 에러 토스트가 발생해야 함', async () => {
    renderLoginForm();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'invalid@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'wrongpassword' },
    });

    const loginButton = await screen.findByRole('button', { name: /로그인/i });
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled();
    });

    fireEvent.click(loginButton);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalled();
    });
  });
});
