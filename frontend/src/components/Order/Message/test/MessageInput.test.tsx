import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import MessageInput from '@/components/Order/Message/MessageInput';
import { theme } from '@/styles/theme';

const renderWithTheme = (ui: React.ReactElement) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe('MessageInput', () => {
  it('renders textarea with value and placeholder', () => {
    const value = '감사합니다';
    const handleChange = vi.fn();

    renderWithTheme(<MessageInput value={value} onChange={handleChange} />);

    const textarea = screen.getByPlaceholderText('메시지를 입력해주세요.');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('감사합니다');
  });

  it('calls onChange when typing in textarea', () => {
    const handleChange = vi.fn();
    renderWithTheme(<MessageInput value="" onChange={handleChange} />);

    const textarea = screen.getByPlaceholderText('메시지를 입력해주세요.');
    fireEvent.change(textarea, { target: { value: '새 메시지' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('shows error message if error is provided', () => {
    const error = { message: '메시지를 입력해주세요', type: 'required' };
    const handleChange = vi.fn();

    renderWithTheme(<MessageInput value="" onChange={handleChange} error={error} />);

    expect(screen.getByText('메시지를 입력해주세요')).toBeInTheDocument();
  });
});
