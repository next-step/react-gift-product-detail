import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../Input';

describe('Input 컴포넌트', () => {
  it('기본 렌더링이 올바르게 되어야 한다', () => {
    render(<Input placeholder="테스트 입력" />);
    const input = screen.getByPlaceholderText('테스트 입력');
    expect(input).toBeInTheDocument();
  });

  it('error prop이 true일 때 에러 스타일이 적용되어야 한다', () => {
    render(<Input error={true} placeholder="에러 입력" />);
    const input = screen.getByPlaceholderText('에러 입력');
    expect(input).toHaveStyle('border-bottom-color: #f44336');
  });

  it('error prop이 false일 때 기본 스타일이 적용되어야 한다', () => {
    render(<Input error={false} placeholder="정상 입력" />);
    const input = screen.getByPlaceholderText('정상 입력');
    expect(input).toHaveStyle('border-bottom-color: #ddd');
  });

  it('value prop이 올바르게 전달되어야 한다', () => {
    render(<Input value="테스트 값" readOnly />);
    const input = screen.getByDisplayValue('테스트 값');
    expect(input).toBeInTheDocument();
  });

  it('onChange 이벤트가 올바르게 작동해야 한다', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="변경 테스트" />);
    const input = screen.getByPlaceholderText('변경 테스트');

    fireEvent.change(input, { target: { value: '새로운 값' } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});
