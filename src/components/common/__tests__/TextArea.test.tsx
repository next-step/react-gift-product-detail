import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { TextArea } from '../TextArea';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import React from 'react';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('TextArea 컴포넌트', () => {
  it('placeholder가 올바르게 렌더링되는지 확인합니다.', () => {
    renderWithTheme(<TextArea placeholder="메시지 입력" />);
    expect(screen.getByPlaceholderText('메시지 입력')).toBeInTheDocument();
  });

  it('사용자 입력을 시뮬레이션하고, value가 올바르게 변경되는지 검증합니다.', async () => {
    renderWithTheme(<TextArea />);
    const textAreaElement = screen.getByRole('textbox');
    await userEvent.type(textAreaElement, '안녕하세요');
    expect(textAreaElement).toHaveValue('안녕하세요');
  });

  it('onChange 핸들러가 입력에 따라 정상적으로 호출되는지 확인합니다.', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<TextArea onChange={handleChange} />);
    const textAreaElement = screen.getByRole('textbox');
    await userEvent.type(textAreaElement, 'test');
    expect(handleChange).toHaveBeenCalledTimes(4);
  });
});