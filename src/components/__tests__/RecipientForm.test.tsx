import { render, screen, fireEvent } from '@testing-library/react';
import RecipientForm from '../RecipientForm';
import type { OrderValues } from '@src/hooks/useOrderForm';
import { vi, beforeEach, describe, it, expect } from 'vitest';

describe('RecipientForm', () => {
  const mockValues: OrderValues = {
    recipientName: '홍길동',
    recipientPhone: '01012345678',
    quantity: '2',
  };

  const mockErrors: Partial<OrderValues> = {
    recipientName: '',
    recipientPhone: '',
    quantity: '',
  };

  const mockOnChange = vi.fn();
  const mockOnRemove = vi.fn();
  const mockOnBlur = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('모든 필드와 기본 텍스트가 잘 렌더링되어야 한다', () => {
    render(
      <RecipientForm
        values={mockValues}
        errors={{}}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        onBlur={mockOnBlur}
      />
    );

    expect(screen.getByText('받는 사람 1')).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('이름을 입력하세요.')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('전화번호를 입력하세요.')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('수량을 입력하세요.')
    ).toBeInTheDocument();
  });

  it('입력 시 onChange가 호출되어야 한다', () => {
    render(
      <RecipientForm
        values={mockValues}
        errors={{}}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        onBlur={mockOnBlur}
      />
    );

    const nameInput = screen.getByPlaceholderText('이름을 입력하세요.');
    fireEvent.change(nameInput, { target: { value: '김철수' } });
    expect(mockOnChange).toHaveBeenCalledWith('recipientName', '김철수');
  });

  it('에러 메시지가 보여야 하고, 에러 텍스트는 빨간색이어야 한다', () => {
    const errors: Partial<OrderValues> = {
      recipientName: '이름 에러',
      recipientPhone: '전화번호 에러',
      quantity: '수량 에러',
    };

    render(
      <RecipientForm
        values={mockValues}
        errors={errors}
        onChange={mockOnChange}
        onRemove={mockOnRemove}
        index={0}
        onBlur={mockOnBlur}
      />
    );

    const nameError = screen.getByText('이름 에러');
    const phoneError = screen.getByText('전화번호 에러');
    const quantityError = screen.getByText('수량 에러');

    expect(nameError).toBeInTheDocument();
    expect(phoneError).toBeInTheDocument();
    expect(quantityError).toBeInTheDocument();

    expect(nameError).toHaveStyle('color: rgb(255, 0, 0)');
    expect(phoneError).toHaveStyle('color: rgb(255, 0, 0)');
    expect(quantityError).toHaveStyle('color: rgb(255, 0, 0)');
  });
});
