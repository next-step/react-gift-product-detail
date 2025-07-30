import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, test, expect } from 'vitest';
import Input from './Input';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

describe('Input 컴포넌트', () => {
  const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
  };

  test('기본 속성으로 렌더링된다', () => {
    renderWithTheme(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('placeholder 텍스트가 표시된다', () => {
    const placeholderText = '이름을 입력하세요';
    renderWithTheme(<Input placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test('disabled 속성이 true일 때 입력 불가하다', () => {
    renderWithTheme(<Input disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  test('사용자 입력에 따라 값이 변경된다', async () => {
    renderWithTheme(<Input />);
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, '안녕하세요!');
    expect(inputElement).toHaveValue('안녕하세요!');
  });

  test('hasError가 true일 때 에러 스타일이 적용된다', () => {
    renderWithTheme(<Input hasError />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveStyle(
      `border-bottom: 1.2px solid ${theme.colors.red700}`
    );
  });
});
