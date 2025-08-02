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

  test('Input 컴포넌트가 기본 속성으로 올바르게 렌더링되어야 한다.', () => {
    renderWithTheme(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  test('placeholder prop이 전달되면, input에 placeholder 텍스트가 표시되어야 한다.', () => {
    const placeholderText = '이름을 입력하세요';
    renderWithTheme(<Input placeholder={placeholderText} />);
    const inputElement = screen.getByPlaceholderText(placeholderText);
    expect(inputElement).toBeInTheDocument();
  });

  test('disabled prop이 true로 전달되면, input이 비활성화 상태여야 한다.', () => {
    renderWithTheme(<Input disabled />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeDisabled();
  });

  test('사용자가 input에 텍스트를 입력하면, input의 값이 입력된 텍스트로 변경되어야 한다.', async () => {
    renderWithTheme(<Input />);
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, '안녕하세요!');
    expect(inputElement).toHaveValue('안녕하세요!');
  });

  test('hasError prop이 true로 전달되면, input에 에러 상태를 나타내는 스타일이 적용되어야 한다.', () => {
    renderWithTheme(<Input hasError />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveStyle(
      `border-bottom: 1.2px solid ${theme.colors.red700}`
    );
  });
});
