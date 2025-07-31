import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import ReceiverForm from '../pages/Order/components/ReceiverForm';
import { ThemeProvider } from '@emotion/react';
import theme from '../styles/theme';

describe('ReceiverForm', () => {
  const receiver = {
    name: '홍길동',
    phone: '01012341234',
    quantity: 1,
  };

  const error = {
    name: '이름 에러',
    phone: '전화번호 에러',
    quantity: '수량 에러',
  };

  const setup = (withError = false) => {
    const onChange = vi.fn();
    const onRemove = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <ReceiverForm
          receiver={receiver}
          error={withError ? error : {}}
          index={0}
          onChange={onChange}
          onRemove={onRemove}
        />
      </ThemeProvider>
    );

    return { onChange, onRemove };
  };

  it('렌더링 시 3개의 input 필드가 보여야 한다.', () => {
    setup();
    expect(
      screen.getByPlaceholderText('이름을 입력하세요')
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText('전화번호를 입력하세요')
    ).toBeInTheDocument();
  });

  it('input 변경 시 onChange가 호출된다.', () => {
    const { onChange } = setup();

    const nameInput = screen.getByPlaceholderText('이름을 입력하세요');
    fireEvent.change(nameInput, { target: { value: '김철수' } });

    expect(onChange).toHaveBeenCalledWith(0, 'name', '김철수');
  });

  it('에러가 주어졌을 때 에러 메시지가 출력된다.', () => {
    setup(true);
    expect(screen.getByText('이름 에러')).toBeInTheDocument();
    expect(screen.getByText('전화번호 에러')).toBeInTheDocument();
    expect(screen.getByText('수량 에러')).toBeInTheDocument();
  });

  it('삭제 버튼 클릭 시 onRemove가 호출된다.', () => {
    const { onRemove } = setup();
    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);
    expect(onRemove).toHaveBeenCalled();
  });
});
