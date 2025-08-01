import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import ReceiverInput from '@/components/Order/Receiver/ReceiverInput.tsx';

interface FormValues {
  name: string;
}

describe('ReceiverInput', () => {
  it('renders label and input field correctly', () => {
    const TestComponent = () => {
      const { register } = useForm<FormValues>();
      return (
        <ReceiverInput
          label="이름"
          name="name"
          register={register}
          placeholder="이름을 입력하세요."
        />
      );
    };

    globalThis.render(<TestComponent />);
    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이름을 입력하세요.')).toBeInTheDocument();
  });

  it('shows error message when error is passed', () => {
    const TestComponent = () => {
      const { register } = useForm<FormValues>();
      return (
        <ReceiverInput
          label="이름"
          name="name"
          register={register}
          error={{ type: 'required', message: '이름을 입력해주세요' }}
        />
      );
    };

    globalThis.render(<TestComponent />);
    expect(screen.getByText('이름을 입력해주세요')).toBeInTheDocument();
  });
});
