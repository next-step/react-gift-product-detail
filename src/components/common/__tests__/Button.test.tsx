import { render, screen } from '@testing-library/react';
import { Button } from '../Button';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import React from 'react';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe('Button 컴포넌트', () => {
  it('버튼에 전달된 children 텍스트가 올바르게 렌더링되는지 확인합니다.', () => {
    renderWithTheme(<Button>테스트 버튼</Button>);
    expect(screen.getByText('테스트 버튼')).toBeInTheDocument();
  });

  it('disabled prop이 true일 때, 버튼이 비활성화 상태인지 검증합니다.', () => {
    renderWithTheme(<Button disabled>테스트 버튼</Button>);
    expect(screen.getByText('테스트 버튼')).toBeDisabled();
  });

  it('버튼 클릭 시, onClick 핸들러 함수가 정상적으로 호출되는지 확인합니다.', async () => {
    const onClickMock = vi.fn();
    renderWithTheme(<Button onClick={onClickMock}>테스트 버튼</Button>);
    await userEvent.click(screen.getByText('테스트 버튼'));
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});