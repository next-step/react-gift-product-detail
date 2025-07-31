import {
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import Login from './Login';

const renderLogin = () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Login Page (Vitest)', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('이메일, 비밀번호 입력창과 로그인 버튼이 렌더링된다', () => {
    renderLogin();

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('비밀번호')
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /로그인/i })
    ).toBeInTheDocument();
  });

  it('유효하지 않은 이메일을 입력하면 에러가 나타난다', async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'invalid-email' },
    });
    fireEvent.blur(screen.getByPlaceholderText('이메일'));

    expect(
      await screen.findByText(/이메일 형식/i)
    ).toBeInTheDocument();
  });

  it('짧은 비밀번호를 입력하면 에러가 나타난다', async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: '123' },
    });
    fireEvent.blur(screen.getByPlaceholderText('비밀번호'));

    expect(
      await screen.findByText(/최소 8글자/i)
    ).toBeInTheDocument();
  });

  it('입력이 유효하면 로그인 버튼이 활성화된다', async () => {
    renderLogin();

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

  it('로그인 성공 시 localStorage에 유저 정보가 저장된다', async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    await waitFor(() => {
      const userInfo = JSON.parse(localStorage.getItem('userInfo')!);
      expect(userInfo.email).toBe('test@example.com');
      expect(userInfo.authToken).toBeDefined();
    });
  });

  it('로그인 실패 시 에러 메시지를 출력한다', async () => {
    renderLogin();

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'wrong@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: 'wrongpassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /로그인/i }));

    expect(
      await screen.findByText(/로그인 실패/i)
    ).toBeInTheDocument();
  });
});
