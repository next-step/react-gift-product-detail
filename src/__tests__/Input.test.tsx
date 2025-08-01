import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '@/components/Input';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme/theme';

describe('Input 컴포넌트', () => {
  const renderWithTheme = (ui: React.ReactElement) => {
    return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
  };

  test('Input 컴포넌트는 placeholder를 렌더링해야 한다', () => {
    renderWithTheme(<Input placeholder="이메일을 입력하세요" />);
    expect(screen.getByPlaceholderText('이메일을 입력하세요')).toBeInTheDocument();
  });

  test('사용자가 입력할 때 onChange 핸들러가 호출되어야 한다', async () => {
    const handleChange = vi.fn();
    renderWithTheme(<Input placeholder="이메일" onChange={handleChange} />);
    const input = screen.getByPlaceholderText('이메일');
    await userEvent.type(input, 'test@example.com');
    expect(handleChange).toHaveBeenCalled();
  });

  test('error가 주어지면 에러 메시지가 렌더링되어야 한다', () => {
    renderWithTheme(<Input placeholder="이메일" error="이메일이 유효하지 않습니다" />);
    expect(screen.getByText('이메일이 유효하지 않습니다')).toBeInTheDocument();
  });

  test('input이 포커스를 잃을 때 onBlur 핸들러가 호출되어야 한다', async () => {
    const handleBlur = vi.fn();
    renderWithTheme(<Input placeholder="비밀번호" onBlur={handleBlur} />);
    const input = screen.getByPlaceholderText('비밀번호');
    await userEvent.click(input);
    await userEvent.tab(); // blur 발생
    expect(handleBlur).toHaveBeenCalled();
  });
});
