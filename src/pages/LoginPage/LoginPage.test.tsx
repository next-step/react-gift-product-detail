import { describe, test, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { theme } from '@/styles/theme';
import LoginPage from './index';
import { LoginProvider } from '@/contexts/LoginContext';

const renderLoginPage = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <LoginProvider>
            <LoginPage />
          </LoginProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe('LoginPage 이메일 폼 테스트', () => {
  describe('초기 화면 상태', () => {
    test('Given: 로그인 페이지가 렌더링되었을 때, When: 아무것도 입력하지 않았을 때, Then: 버튼이 disabled 상태여야 한다', () => {
      // Given
      renderLoginPage();

      // When
      const loginButton = screen.getByText('로그인');

      // Then
      expect(loginButton).toBeDisabled();
    });
  });

  describe('이메일 폼 입력 시나리오', () => {
    test('Given: 이메일 폼이 포커스된 상태일 때, When: 특정 값을 쓰다가 다시 삭제해서 빈 값으로 입력했을 때, Then: "ID를 입력해주세요." 에러 메시지가 표시되어야 한다', () => {
      // Given
      renderLoginPage();
      const emailInput = screen.getByTestId('email');

      // When
      fireEvent.click(emailInput);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
      fireEvent.change(emailInput, { target: { value: '' } });

      // Then
      expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument();
    });

    test('Given: 이메일 폼이 포커스된 상태일 때, When: 이메일 형식이 아닌 값을 입력했을 때, Then: "ID는 이메일 형식으로 입력해주세요." 에러 메시지가 표시되어야 한다', () => {
      // Given
      renderLoginPage();
      const emailInput = screen.getByTestId('email');

      // When
      fireEvent.click(emailInput);
      fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

      // Then
      expect(
        screen.getByText('ID는 이메일 형식으로 입력해주세요.')
      ).toBeInTheDocument();
    });

    test('Given: 이메일 폼이 포커스된 상태일 때, When: 올바른 이메일 형식을 입력했을 때, Then: 에러 메시지가 사라져야 한다', () => {
      // Given
      renderLoginPage();
      const emailInput = screen.getByTestId('email');

      // When
      fireEvent.click(emailInput);
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });

      // Then
      expect(screen.queryByText('ID를 입력해주세요.')).not.toBeInTheDocument();
      expect(
        screen.queryByText('ID는 이메일 형식으로 입력해주세요.')
      ).not.toBeInTheDocument();
    });

    test('Given: 이메일 폼이 포커스된 상태일 때, When: 올바른 이메일 형식을 입력했을 때, Then: 에러 메시지가 사라져야 한다', () => {
      // Given
      renderLoginPage();
      const emailInput = screen.getByTestId('email');

      // When & Then
      const validEmails = [
        'user@naver.com',
        'user.name@kakao.com',
        'user+tag@pusan.co.uk',
        'user123@gmail.org',
      ];

      validEmails.forEach((email) => {
        fireEvent.change(emailInput, { target: { value: email } });
        expect(
          screen.queryByText('ID를 입력해주세요.')
        ).not.toBeInTheDocument();
        expect(
          screen.queryByText('ID는 이메일 형식으로 입력해주세요.')
        ).not.toBeInTheDocument();
      });
    });
  });
});

describe('LoginPage 비밀번호 폼 테스트', () => {
  test('Given: 비밀번호 폼이 포커스된 상태일 때, When: 특정 값을 쓰다가 다시 삭제해서 빈 값으로 입력했을 때, Then: "비밀번호를 입력해주세요." 에러 메시지가 표시되어야 한다', () => {
    // Given
    renderLoginPage();
    const passwordInput = screen.getByTestId('password');

    // When
    fireEvent.click(passwordInput);
    fireEvent.change(passwordInput, { target: { value: 'invalid-password' } });
  });
  test('Given: 비밀번호 폼이 포커스된 상태일 때, When: 비밀번호가 8자 미만일 때, Then: "비밀번호는 8자 이상 입력해주세요." 에러 메시지가 표시되어야 한다', () => {
    // Given
    renderLoginPage();
    const passwordInput = screen.getByTestId('password');

    // When
    fireEvent.click(passwordInput);
    fireEvent.change(passwordInput, { target: { value: '1234567' } });

    // Then
    expect(
      screen.getByText('PW는 최소 8글자 이상이어야 합니다.')
    ).toBeInTheDocument();
  });
  test('Given: 비밀번호 폼이 포커스된 상태일 때, When: 비밀번호가 8자 이상일 때, Then: 에러 메시지가 사라져야 한다', () => {
    // Given
    renderLoginPage();
    const passwordInput = screen.getByTestId('password');

    // When
    fireEvent.click(passwordInput);
    fireEvent.change(passwordInput, { target: { value: '12345678' } });

    // Then
    expect(
      screen.queryByText('PW는 최소 8글자 이상이어야 합니다.')
    ).not.toBeInTheDocument();
  });
});
