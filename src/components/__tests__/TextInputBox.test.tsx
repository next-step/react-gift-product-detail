import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import TextInputBox from '../TextInputBox';
import '@testing-library/jest-dom';
import { theme } from '@/styles/theme';
import { describe, it, expect } from 'vitest';

describe('TextInputBox 컴포넌트', () => {
  const renderWithTheme = (ui: React.ReactElement) =>
    render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

  it('title이 렌더링 되는가', () => {
    renderWithTheme(<TextInputBox title="제목" />);
    expect(screen.getByText('제목')).toBeInTheDocument();
  });

  it('placeholder가 제대로 보이는가', () => {
    renderWithTheme(<TextInputBox placeholder="입력하세요" />);
    expect(screen.getByPlaceholderText('입력하세요')).toBeInTheDocument();
  });

  it('errorMessage가 있을 경우 표시되는가', () => {
    renderWithTheme(<TextInputBox errorMessage="에러 발생!" />);
    expect(screen.getByText('에러 발생!')).toBeInTheDocument();
  });

  it('textarea에 사용자 입력을 할 수 있는가', () => {
    renderWithTheme(<TextInputBox placeholder="입력" />);
    const input = screen.getByPlaceholderText('입력') as HTMLTextAreaElement;
    expect(input).toBeInTheDocument();
  });
});
