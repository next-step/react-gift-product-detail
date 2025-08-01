import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/ResetStyles';
import { LoginTitle } from '@/styles/Login.styles';
import { SenderTitle } from '@/styles/Order/Sender.styles';
import { RecieverTitle } from '@/styles/Order/Reciever.styles';

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Typography 컴포넌트들', () => {
  describe('LoginTitle', () => {
    it('로그인 타이틀이 올바른 텍스트로 렌더링되어야 한다', () => {
      renderWithTheme(<LoginTitle>KAKAO</LoginTitle>);
      
      expect(screen.getByText('KAKAO')).toBeInTheDocument();
    });

    it('로그인 타이틀이 올바른 스타일을 가져야 한다', () => {
      renderWithTheme(<LoginTitle>KAKAO</LoginTitle>);
      
      const title = screen.getByText('KAKAO');
      expect(title).toHaveStyle({
        fontSize: theme.typography.title1Bold.fontSize,
        fontWeight: theme.typography.title1Bold.fontWeight,
      });
    });
  });

  describe('SenderTitle', () => {
    it('보내는 사람 타이틀이 올바른 텍스트로 렌더링되어야 한다', () => {
      renderWithTheme(<SenderTitle>보내는 사람</SenderTitle>);
      
      expect(screen.getByText('보내는 사람')).toBeInTheDocument();
    });

    it('보내는 사람 타이틀이 올바른 스타일을 가져야 한다', () => {
      renderWithTheme(<SenderTitle>보내는 사람</SenderTitle>);
      
      const title = screen.getByText('보내는 사람');
      expect(title).toHaveStyle({
        fontSize: theme.typography.title2Bold.fontSize,
        fontWeight: theme.typography.title2Bold.fontWeight,
      });
    });
  });

  describe('RecieverTitle', () => {
    it('받는 사람 타이틀이 올바른 텍스트로 렌더링되어야 한다', () => {
      renderWithTheme(<RecieverTitle>받는 사람</RecieverTitle>);
      
      expect(screen.getByText('받는 사람')).toBeInTheDocument();
    });

    it('받는 사람 타이틀이 올바른 스타일을 가져야 한다', () => {
      renderWithTheme(<RecieverTitle>받는 사람</RecieverTitle>);
      
      const title = screen.getByText('받는 사람');
      expect(title).toHaveStyle({
        fontSize: theme.typography.title2Bold.fontSize,
        fontWeight: theme.typography.title2Bold.fontWeight,
      });
    });
  });

  describe('Typography 공통 테스트', () => {
    it('모든 타이틀 컴포넌트가 텍스트를 올바르게 표시해야 한다', () => {
      const testCases = [
        { Component: LoginTitle, text: 'KAKAO', testId: 'login-title' },
        { Component: SenderTitle, text: '보내는 사람', testId: 'sender-title' },
        { Component: RecieverTitle, text: '받는 사람', testId: 'reciever-title' },
      ];

      testCases.forEach(({ Component, text, testId }) => {
        renderWithTheme(<Component data-testid={testId}>{text}</Component>);
        
        const element = screen.getByTestId(testId);
        expect(element).toBeInTheDocument();
        expect(element).toHaveTextContent(text);
      });
    });

    it('타이틀 컴포넌트들이 접근성 속성을 가져야 한다', () => {
      renderWithTheme(<LoginTitle role="heading">KAKAO</LoginTitle>);
      
      const title = screen.getByRole('heading');
      expect(title).toBeInTheDocument();
    });
  });
}); 