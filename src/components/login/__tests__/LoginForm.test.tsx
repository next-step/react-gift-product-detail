import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { theme } from '@/styles/theme';
import LoginForm from '@/components/login/LoginForm';

const handleLoginMock = vi.fn().mockResolvedValue(undefined);

vi.mock('@/hooks/useLoginHandler', () => ({
  useLoginHandler: () => ({
    handleLogin: handleLoginMock,
  }),
}));

const renderWithTheme = () =>
  render(
    <ThemeProvider theme={theme}>
      <>
        <LoginForm />
        <ToastContainer position="bottom-center" />
      </>
    </ThemeProvider>
  );

describe('LoginForm 통합 테스트', () => {
  beforeEach(() => {
    handleLoginMock.mockClear();
  });

  it('이메일 미입력 후 blur 시 에러 메시지가 출력된다', () => {
    renderWithTheme();
    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.blur(emailInput);
    expect(screen.getByText('이메일을 입력해주세요.')).toBeInTheDocument();
  });

  it('올바르지 않은 이메일 형식 입력 시 에러 메시지가 출력된다', () => {
    renderWithTheme();
    const emailInput = screen.getByPlaceholderText('이메일');
    fireEvent.change(emailInput, { target: { value: 'invalid' } });
    fireEvent.blur(emailInput);
    expect(screen.getByText('올바른 이메일 형식이 아닙니다.')).toBeInTheDocument();
  });

  it('비밀번호 미입력 후 blur 시 에러 메시지가 출력된다', () => {
    renderWithTheme();
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.blur(passwordInput);
    expect(screen.getByText('비밀번호를 입력해주세요.')).toBeInTheDocument();
  });

  it('짧은 비밀번호 입력 시 에러 메시지가 출력된다', () => {
    renderWithTheme();
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: 'short' } });
    fireEvent.blur(passwordInput);
    expect(screen.getByText('비밀번호는 8자 이상이어야 합니다.')).toBeInTheDocument();
  });

  it('정상 입력 시 버튼이 활성화되고 handleLogin이 호출된다', async () => {
    renderWithTheme();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const button = screen.getByRole('button', { name: '로그인' });

    fireEvent.change(emailInput, { target: { value: 'user@kakao.com' } });
    fireEvent.blur(emailInput);
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.blur(passwordInput);

    expect(button).not.toBeDisabled();

    fireEvent.click(button);

    await waitFor(() => {
      expect(handleLoginMock).toHaveBeenCalledWith('user@kakao.com', 'password123');
    });
  });
});
