import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import FormField from '../FormField';

describe('FormField 컴포넌트', () => {
  it('레이블과 자식 요소를 렌더링한다', () => {
    render(
      <FormField label="이름">
        <input type="text" />
      </FormField>
    );

    expect(screen.getByText('이름')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('에러 메시지를 렌더링한다', () => {
    render(
      <FormField label="이메일" error="이메일을 입력해주세요">
        <input type="text" />
      </FormField>
    );

    expect(screen.getByRole('alert')).toHaveTextContent('이메일을 입력해주세요');
  });
});
