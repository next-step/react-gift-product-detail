import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import SenderInfo from '../SenderInfo';
import { theme } from '../../../styles/theme';
import { describe, it, expect, vi } from 'vitest';

const mockRegister = {
  name: 'sender',
  onChange: vi.fn(),
  onBlur: vi.fn(),
  ref: vi.fn(),
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe('SenderInfo', () => {
  it('초기 렌더링 시 input과 안내 문구가 표시되는지 확인', () => {
    render(
      <TestWrapper>
        <SenderInfo register={mockRegister} />
      </TestWrapper>,
    );

    expect(screen.getByText('보내는 사람')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('이름을 입력하세요.')).toBeInTheDocument();
    expect(
      screen.getByText('* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.'),
    ).toBeInTheDocument();
  });

  it('에러가 전달되면 안내 문구 대신 에러 메시지가 표시되는지 확인', () => {
    render(
      <TestWrapper>
        <SenderInfo register={mockRegister} error="이름은 필수 입력입니다." />
      </TestWrapper>,
    );

    expect(screen.getByText('이름은 필수 입력입니다.')).toBeInTheDocument();
    expect(
      screen.queryByText('* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.'),
    ).not.toBeInTheDocument();
  });

  it('에러가 있을 경우 input에 data-error 속성이 true로 설정되는지 확인', () => {
    render(
      <TestWrapper>
        <SenderInfo register={mockRegister} error="오류 발생" />
      </TestWrapper>,
    );

    const input = screen.getByPlaceholderText('이름을 입력하세요.');
    expect(input.getAttribute('data-error')).toBe('true');
  });

  it('에러가 없을 경우 input에 data-error 속성이 false로 설정되는지 확인', () => {
    render(
      <TestWrapper>
        <SenderInfo register={mockRegister} />
      </TestWrapper>,
    );
    const input = screen.getByPlaceholderText('이름을 입력하세요.');
    expect(input.getAttribute('data-error')).toBe('false');
  });
});
