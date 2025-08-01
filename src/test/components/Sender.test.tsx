import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/ResetStyles';
import Sender from '@/pages/Order/Sender';
import type { FieldErrors } from 'react-hook-form';
import type { FormValues } from '@/pages/Order/Order';

const mockRegister = vi.fn();
const mockErrors: FieldErrors<FormValues> = {};

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Sender 컴포넌트', () => {
  it('보내는 사람 제목이 렌더링되어야 한다', () => {
    renderWithTheme(<Sender register={mockRegister} errors={mockErrors} />);

    expect(screen.getByText('보내는 사람')).toBeInTheDocument();
  });

  it('이름 입력 필드가 렌더링되어야 한다', () => {
    renderWithTheme(<Sender register={mockRegister} errors={mockErrors} />);

    const input = screen.getByPlaceholderText('이름 입력');
    expect(input).toBeInTheDocument();
  });

  it('에러가 있을 때 에러 메시지가 표시되어야 한다', () => {
    const errorsWithMessage: FieldErrors<FormValues> = {
      sender: {
        type: 'required',
        message: '이름을 입력해주세요.',
      },
    };

    renderWithTheme(<Sender register={mockRegister} errors={errorsWithMessage} />);

    expect(screen.getByText('이름을 입력해주세요.')).toBeInTheDocument();
  });

  it('에러가 없을 때 에러 메시지가 표시되지 않아야 한다', () => {
    renderWithTheme(<Sender register={mockRegister} errors={mockErrors} />);

    expect(screen.queryByText('이름을 입력해주세요.')).not.toBeInTheDocument();
  });
});
