import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { useForm } from 'react-hook-form';
import FormField from '@/components/formField/formField';
import { render, screen } from '@testing-library/react';
import { test, expect } from 'vitest';

const TestWrapper = () => {
  const { register } = useForm();
  return (
    <ThemeProvider theme={theme}>
      <FormField
        name="email"
        label="이메일"
        placeholder="이메일 입력"
        type="email"
        error="이메일 형식이 올바르지 않습니다."
        register={register}
      />
    </ThemeProvider>
  );
};

test('FormField는 label, placeholder, type을 렌더링 해요', () => {
  render(<TestWrapper />);
  //라벨과 연결된 폼 요소 찾을 때 사용
  expect(screen.getByLabelText('이메일')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('이메일 입력')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('이메일 입력')).toHaveAttribute('type', 'email');
});
