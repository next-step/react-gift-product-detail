import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { Input } from '../Input';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import React from 'react';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Input 컴포넌트', () => {
  it('placeholder가 올바르게 렌더링되는지 확인합니다.', () => {
    renderWithTheme(<Input placeholder="이메일 입력" />);
    expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
  });

  it('사용자 입력을 시뮬레이션하고, value가 올바르게 변경되는지 검증합니다.', async () => {
    renderWithTheme(<Input />);
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'test@example.com');
    expect(inputElement).toHaveValue('test@example.com');
  });

  it('onChange 핸들러가 입력에 따라 정상적으로 호출되는지 확인합니다.', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<Input onChange={handleChange} />);
    const inputElement = screen.getByRole('textbox');
    await userEvent.type(inputElement, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
});