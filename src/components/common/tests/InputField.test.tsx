import { render, screen, fireEvent } from '@testing-library/react';
import InputField from '@/components/common/InputField';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';

const renderInputField = (props = {}) => {
  return render(
    <ThemeProvider theme={theme}>
      <InputField {...props} />
    </ThemeProvider>
  );
};

describe('<InputField />', () => {
  it('placeholder를 가진 input이 렌더링되어야 함', () => {
    // Given: placeholder를 포함한 InputField 컴포넌트를 렌더링함
    const placeholder = '이메일을 입력하세요';
    renderInputField({ placeholder, name: 'email' });

    // Then: placeholder가 화면에 보여야 함
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('입력값을 변경하면 onChange 핸들러가 호출되어야 함', () => {
    // Given: mock onChange 핸들러와 함께 InputField 렌더링함
    const handleChange = vi.fn();
    renderInputField({
      placeholder: '이름',
      name: 'name',
      onChange: handleChange,
    });

    const input = screen.getByPlaceholderText('이름');

    // When: 유저가 값을 입력한함
    fireEvent.change(input, { target: { value: '홍길동' } });

    // Then: onChange 핸들러가 호출되어야함
    expect(handleChange).toHaveBeenCalled();
  });

  it('error prop이 주어지면 에러 메시지가 보여야 함', () => {
    // Given: error 메시지를 포함한 InputField 렌더링
    const errorMessage = '유효하지 않은 이메일입니다.';
    renderInputField({
      placeholder: '이메일',
      name: 'email',
      error: errorMessage,
    });

    // Then: 에러 메시지가 화면에 보여야 함
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('error가 있을 때 input 요소는 하단 빨간색 border를 가져야 함', () => {
    // Given: error 메시지를 포함한 InputField 렌더링함
    const errorMessage = '필수 입력입니다.';
    renderInputField({
      placeholder: '이름',
      name: 'name',
      error: errorMessage,
    });

    const input = screen.getByPlaceholderText('이름');

    // Then: 스타일 속성에서 border-bottom에 빨간색이 적용되어야 함
    expect(input).toHaveStyle(
      `border-bottom: 1px solid ${theme.color.red[500]}`
    );
  });
});
