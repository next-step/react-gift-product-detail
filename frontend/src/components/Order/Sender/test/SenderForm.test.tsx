import { describe, it, expect } from 'vitest';
import { screen, fireEvent } from '@testing-library/react';
import SenderForm from '@/components/Order/Sender/SenderForm.tsx';

describe('SenderForm', () => {
  it('renders input with correct value and placeholder', () => {
    const value = '장주형';
    const onChange = vi.fn();

    render(<SenderForm value={value} onChange={onChange} />);

    const input = screen.getByPlaceholderText('이름을 입력하세요.');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue(value);
  });

  it('calls onChange when input value changes', () => {
    const value = '';
    const onChange = vi.fn();

    render(<SenderForm value={value} onChange={onChange} />);

    const input = screen.getByPlaceholderText('이름을 입력하세요.');
    fireEvent.change(input, { target: { value: '새 이름' } });

    expect(onChange).toHaveBeenCalled();
  });

  it('shows error message if error prop is an object with message', () => {
    const value = '';
    const onChange = vi.fn();
    const error = { message: '이름을 입력해주세요' };

    render(<SenderForm value={value} onChange={onChange} error={error} />);

    expect(screen.getByText('이름을 입력해주세요')).toBeInTheDocument();
  });

  it('shows info message if error prop is false or boolean true without message', () => {
    const value = '';
    const onChange = vi.fn();

    const { rerender } = render(<SenderForm value={value} onChange={onChange} />);
    expect(
      screen.getByText((content) =>
        content.includes('실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.'),
      ),
    ).toBeInTheDocument();

    rerender(<SenderForm value={value} onChange={onChange} error={true} />);
    expect(
      screen.getByText((content) =>
        content.includes('실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.'),
      ),
    ).toBeInTheDocument();
  });
});
