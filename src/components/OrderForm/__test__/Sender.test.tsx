import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { Sender } from '@/components/OrderForm/Sender';
import { theme } from '@/theme/theme';
import { describe, expect, it, vi } from 'vitest';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('Sender form field', () => {
  it('초기 value 를 그대로 표시한다', () => {
    renderWithTheme(<Sender value="홍길동" onChange={() => {}} />);
    const input = screen.getByPlaceholderText('이름을 입력하세요.') as HTMLInputElement;
    expect(input).toHaveValue('홍길동');
  });

  it('사용자 입력 시 onChange 콜백을 호출한다', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<Sender value="" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('이름을 입력하세요.');

    await userEvent.type(input, '철수');

    expect(handleChange).toHaveBeenCalledTimes(2);
    expect(handleChange).toHaveBeenLastCalledWith('수');
  });

  it('error prop 이 주어지면 오류 메시지를 보여준다', () => {
    renderWithTheme(<Sender value="" onChange={() => {}} error="이름은 필수입니다." />);
    expect(screen.getByText('이름은 필수입니다.')).toBeInTheDocument();
  });
});
