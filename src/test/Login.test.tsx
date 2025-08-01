import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { AuthProvider } from '../contexts/AuthContext';
import Login from '../pages/Login';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const renderLogin = () => {
  render(
    <MemoryRouter>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Login />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
};

describe('Login Page (Vitest)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('렌더링 및 입력 필드 유효성 검사', () => {
    beforeEach(() => {
      renderLogin();
    });

    it('이메일, 비밀번호 입력창과 로그인 버튼이 렌더링된다', () => {
      expect(
        screen.getByPlaceholderText('이메일')
      ).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('비밀번호')
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /로그인/i })
      ).toBeInTheDocument();
    });

    it('이메일 입력 필드에 타이핑할 수 있어야 함', () => {
      const emailInput = screen.getByPlaceholderText('이메일');
      fireEvent.change(emailInput, {
        target: { value: 'test@example.com' },
      });
      expect(emailInput).toHaveValue('test@example.com');
    });

    it('비밀번호 입력 필드에 타이핑할 수 있어야 함', () => {
      const passwordInput = screen.getByPlaceholderText('비밀번호');
      fireEvent.change(passwordInput, {
        target: { value: 'password123' },
      });
      expect(passwordInput).toHaveValue('password123');
    });

    it('유효하지 않은 이메일을 입력하면 에러가 나타난다', async () => {
      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'invalid-email' },
      });
      fireEvent.blur(screen.getByPlaceholderText('이메일'));

      expect(
        await screen.findByText(/이메일 형식/i)
      ).toBeInTheDocument();
    });

    it('짧은 비밀번호를 입력하면 에러가 나타난다', async () => {
      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: '123' },
      });
      fireEvent.blur(screen.getByPlaceholderText('비밀번호'));

      expect(
        await screen.findByText(/최소 8글자/i)
      ).toBeInTheDocument();
    });

    it('유효한 이메일과 비밀번호 입력 시 로그인 버튼이 활성화된다', async () => {
      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'password123' },
      });

      await waitFor(() =>
        expect(
          screen.getByRole('button', { name: /로그인/i })
        ).toBeEnabled()
      );
    });
  });

  describe('로그인 동작', () => {
    beforeEach(() => {
      renderLogin();
    });

    it('로그인 성공 시 localStorage에 유저 정보가 저장된다', async () => {
      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'test@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'password123' },
      });

      fireEvent.click(
        screen.getByRole('button', { name: /로그인/i })
      );

      await waitFor(() => {
        const userInfo = JSON.parse(
          localStorage.getItem('userInfo')!
        );
        expect(userInfo.email).toBe('test@example.com');
        expect(userInfo.authToken).toBeDefined();
      });
    });

    it('로그인 실패 시 에러 메시지를 출력한다', async () => {
      fireEvent.change(screen.getByPlaceholderText('이메일'), {
        target: { value: 'wrong@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
        target: { value: 'wrongpassword' },
      });

      fireEvent.click(
        screen.getByRole('button', { name: /로그인/i })
      );

      expect(
        await screen.findByText(/로그인 실패/i)
      ).toBeInTheDocument();
    });
  });
});
