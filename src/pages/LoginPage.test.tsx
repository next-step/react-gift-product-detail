import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { LoginPage } from './LoginPage';
import { GiftPage } from './GiftPage';

global.alert = () => {};

describe('LoginPage', () => {
  test('로그인 시나리오 테스트', async () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<GiftPage />} />
          </Routes>
        </AuthProvider>
      </MemoryRouter>
    );

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).not.toBeDisabled();

    fireEvent.click(loginButton);

    const welcomeText = await screen.findByText(/테스터님!/);
    expect(welcomeText).toBeInTheDocument();
  });
});
