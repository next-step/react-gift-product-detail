import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '../index';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { describe, it, expect } from 'vitest';

describe('LoginPage', () => {
  const renderWithProviders = (ui: React.ReactElement) =>
    render(
      <MemoryRouter>
        <AuthProvider>
          <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    );

  it('이메일, 비밀번호 input과 로그인 버튼이 화면에 보여야 한다', () => {
    renderWithProviders(<LoginPage />);
    expect(screen.getByPlaceholderText(/이메일/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('input에 텍스트를 입력할 수 있어야 한다', async () => {
    renderWithProviders(<LoginPage />);
    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const pwInput = screen.getByPlaceholderText(/비밀번호/i);

    fireEvent.change(emailInput, { target: { value: 'ajin@example.com' } });
    fireEvent.change(pwInput, { target: { value: 'password123' } });

    await waitFor(() => {
      expect(emailInput).toHaveValue('ajin@example.com');
      expect(pwInput).toHaveValue('password123');
    });
  });

  it('로그인 버튼은 유효한 이메일과 비밀번호가 입력되어야 활성화된다', async () => {
    renderWithProviders(<LoginPage />);
    const loginBtn = screen.getByRole('button', { name: /로그인/i });
    const emailInput = screen.getByPlaceholderText(/이메일/i);
    const pwInput = screen.getByPlaceholderText(/비밀번호/i);

    expect(loginBtn).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'ajin@example.com' } });
    fireEvent.change(pwInput, { target: { value: 'password123' } });

    await waitFor(() => {
      expect(loginBtn).toBeEnabled();
    });
  });
});
