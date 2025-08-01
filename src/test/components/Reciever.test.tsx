import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import Reciever from '@/pages/Order/Reciever';
import type { ErrorType } from '@/hooks/useOrder';

const mockHandleCountChange = vi.fn();
const mockHandleRecieverNameChange = vi.fn();
const mockHandleRecieverPhoneChange = vi.fn();

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Reciever 컴포넌트', () => {
  const defaultProps = {
    count: 1,
    errors: {} as ErrorType,
    handleCountChange: mockHandleCountChange,
    handleRecieverNameChange: mockHandleRecieverNameChange,
    handleRecieverPhoneChange: mockHandleRecieverPhoneChange,
  };

  it('받는 사람 제목이 렌더링되어야 한다', () => {
    renderWithTheme(<Reciever {...defaultProps} />);
    
    expect(screen.getByText('받는 사람')).toBeInTheDocument();
  });

  it('이름, 전화번호, 수량 입력 필드가 렌더링되어야 한다', () => {
    renderWithTheme(<Reciever {...defaultProps} />);
    
    expect(screen.getByPlaceholderText('이름을 입력하세요.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('전화번호를 입력하세요.')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1')).toBeInTheDocument();
  });

  it('이름 에러가 있을 때 에러 메시지가 표시되어야 한다', () => {
    const propsWithError = {
      ...defaultProps,
      errors: { recieverName: '이름을 입력해주세요.' } as ErrorType,
    };

    renderWithTheme(<Reciever {...propsWithError} />);
    
    expect(screen.getByText('이름을 입력해주세요.')).toBeInTheDocument();
  });

  it('전화번호 에러가 있을 때 에러 메시지가 표시되어야 한다', () => {
    const propsWithError = {
      ...defaultProps,
      errors: { recieverPhone: '전화번호를 입력해주세요.' } as ErrorType,
    };

    renderWithTheme(<Reciever {...propsWithError} />);
    
    expect(screen.getByText('전화번호를 입력해주세요.')).toBeInTheDocument();
  });

  it('수량 에러가 있을 때 에러 메시지가 표시되어야 한다', () => {
    const propsWithError = {
      ...defaultProps,
      errors: { count: '수량을 입력해주세요.' } as ErrorType,
    };

    renderWithTheme(<Reciever {...propsWithError} />);
    
    expect(screen.getByText('수량을 입력해주세요.')).toBeInTheDocument();
  });

  it('입력 필드 변경 시 핸들러가 호출되어야 한다', () => {
    renderWithTheme(<Reciever {...defaultProps} />);
    
    const nameInput = screen.getByPlaceholderText('이름을 입력하세요.');
    const phoneInput = screen.getByPlaceholderText('전화번호를 입력하세요.');
    const countInput = screen.getByDisplayValue('1');

    fireEvent.change(nameInput, { target: { value: '홍길동' } });
    fireEvent.change(phoneInput, { target: { value: '010-1234-5678' } });
    fireEvent.change(countInput, { target: { value: '2' } });

    expect(mockHandleRecieverNameChange).toHaveBeenCalled();
    expect(mockHandleRecieverPhoneChange).toHaveBeenCalled();
    expect(mockHandleCountChange).toHaveBeenCalled();
  });
}); 