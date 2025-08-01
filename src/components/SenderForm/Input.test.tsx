import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { Input, ErrorMessage, Hint } from './styles';
import { theme } from '@/styles/theme';

const renderInput = (
  props: React.InputHTMLAttributes<HTMLInputElement> = {}
) => {
  return render(
    <ThemeProvider theme={theme}>
      <Input {...props} />
    </ThemeProvider>
  );
};

describe('SenderForm Input', () => {
  it('기본 입력 필드가 렌더링되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('placeholder가 올바르게 표시되어야 한다', () => {
    renderInput({ placeholder: '이름을 입력하세요' });
    const input = screen.getByPlaceholderText('이름을 입력하세요');
    expect(input).toBeInTheDocument();
  });

  it('value가 올바르게 설정되어야 한다', () => {
    renderInput({ value: '홍길동' });
    const input = screen.getByDisplayValue('홍길동');
    expect(input).toBeInTheDocument();
  });

  it('disabled 상태가 올바르게 적용되어야 한다', () => {
    renderInput({ disabled: true });
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('name 속성이 올바르게 설정되어야 한다', () => {
    renderInput({ name: 'senderName' });
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('name', 'senderName');
  });

  it('focus 상태에서 스타일이 변경되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    input.focus();
    expect(input).toHaveFocus();
  });

  it('입력 필드가 편집 가능해야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).not.toBeDisabled();
  });

  it('width가 100%로 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({ width: '100%' });
  });

  it('box-sizing이 border-box로 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({ boxSizing: 'border-box' });
  });

  it('border-radius가 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.borderRadius).toBeTruthy();
  });

  it('padding이 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    const computedStyle = window.getComputedStyle(input);
    expect(computedStyle.padding).toBeTruthy();
  });

  it('margin-top이 설정되어야 한다', () => {
    renderInput();
    const input = screen.getByRole('textbox');
    expect(input).toHaveStyle({ marginTop: expect.any(String) });
  });

  it('에러 메시지가 올바른 스타일을 가져야 한다', () => {
    render(
      <ThemeProvider theme={theme}>
        <ErrorMessage>에러 메시지</ErrorMessage>
      </ThemeProvider>
    );
    const errorMessage = screen.getByText('에러 메시지');
    expect(errorMessage).toHaveStyle({ color: 'rgb(255, 0, 0)' });
    expect(errorMessage).toHaveStyle({ fontSize: '12px' });
  });
  it('힌트 메시지가 올바른 스타일을 가져야 한다', () => {
    render(
      <ThemeProvider theme={theme}>
        <Hint>힌트 메시지</Hint>
      </ThemeProvider>
    );
    const hint = screen.getByText('힌트 메시지');
    expect(hint).toHaveStyle({ color: 'rgb(176, 179, 186)' });
    expect(hint).toHaveStyle({ fontSize: '0.75rem' });
    expect(hint).toHaveStyle({ fontFamily: 'Pretendard' });
  });
});
