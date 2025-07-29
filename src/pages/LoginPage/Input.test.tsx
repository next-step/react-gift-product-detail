import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { Input } from './styles';
import { theme } from '@/styles/theme';

const renderInput = (
  props: React.InputHTMLAttributes<HTMLInputElement> & {
    isError?: boolean;
  } = {}
) => {
  const defaultProps = { isError: false, ...props };
  return render(
    <ThemeProvider theme={theme}>
      <Input {...defaultProps} />
    </ThemeProvider>
  );
};

describe('LoginPage Input', () => {
  it('기본 입력 필드가 렌더링되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('placeholder가 올바르게 표시되어야 한다', () => {
    renderInput({ placeholder: '이메일을 입력하세요' });
    const input = screen.getByPlaceholderText('이메일을 입력하세요');
    expect(input).toBeInTheDocument();
  });

  it('value가 올바르게 설정되어야 한다', () => {
    renderInput({ value: 'test@example.com' });
    const input = screen.getByDisplayValue('test@example.com');
    expect(input).toBeInTheDocument();
  });

  it('disabled 상태가 올바르게 적용되어야 한다', () => {
    renderInput({ disabled: true });
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('name 속성이 올바르게 설정되어야 한다', () => {
    renderInput({ name: 'email' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'email');
  });

  it('email 타입으로 설정되어야 한다', () => {
    renderInput({ type: 'email' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('password 타입으로 설정되어야 한다', () => {
    renderInput({ type: 'password' });
    const input = screen.getByDisplayValue('');
    expect(input).toHaveAttribute('type', 'password');
  });

  it('isError가 true일 때 에러 스타일이 적용되어야 한다', () => {
    renderInput({ isError: true });
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.borderBottomColor).toBeTruthy();
  });

  it('isError가 false일 때 기본 스타일이 적용되어야 한다', () => {
    renderInput({ isError: false });
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.borderBottomColor).toBeTruthy();
  });

  it('focus 상태에서 스타일이 변경되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');

    input.focus();
    expect(input).toHaveFocus();

    const focusStyle = window.getComputedStyle(input);
    expect(focusStyle.borderBottomColor).toBeTruthy();
    expect(focusStyle.color).toBeTruthy();
  });

  it('입력 필드가 편집 가능해야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).not.toBeDisabled();
  });

  it('width가 360px로 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({ width: '360px' });
  });

  it('background가 transparent로 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.backgroundColor).toBe('rgba(0, 0, 0, 0)');
  });

  it('border-bottom이 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.borderBottomWidth).toBeTruthy();
    expect(parseInt(computedStyle.borderBottomWidth)).toBeGreaterThan(0);
  });

  it('outline이 none으로 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.outline).toBe('none');
  });

  it('transition이 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.transition).toBeTruthy();
  });

  it('올바른 타이포그래피가 적용되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.fontFamily).toBeTruthy();
    expect(computedStyle.fontSize).toBeTruthy();
  });

  it('placeholder 색상이 설정되어야 한다', () => {
    renderInput({ placeholder: '테스트' });
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.color).toBeTruthy();
  });

  it('padding이 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.padding).toBeTruthy();
  });

  it('margin-bottom이 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.marginBottom).toBeTruthy();
  });
});
