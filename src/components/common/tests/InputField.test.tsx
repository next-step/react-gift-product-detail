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
    // Given: placeholder가 설정된 InputField를 렌더링함
    const placeholder = '이메일을 입력하세요';
    renderInputField({ placeholder, name: 'email' });

    // Then: 해당 placeholder 텍스트를 가진 input이 화면에 보여야 함
    expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
  });

  it('입력값을 변경하면 onChange 핸들러가 호출되어야 함', () => {
    // Given: onChange 핸들러가 포함된 InputField를 렌더링함
    const handleChange = vi.fn();
    renderInputField({
      placeholder: '이름',
      name: 'name',
      onChange: handleChange,
    });

    const input = screen.getByPlaceholderText('이름');

    // When: 사용자가 input 값을 '홍길동'으로 변경함
    fireEvent.change(input, { target: { value: '홍길동' } });

    // Then: onChange 핸들러가 호출되어야 함
    expect(handleChange).toHaveBeenCalled();
  });

  it('error prop이 주어지면 에러 메시지가 보여야 함', () => {
    // Given: error 메시지가 설정된 InputField를 렌더링함
    const errorMessage = '유효하지 않은 이메일입니다.';
    renderInputField({
      placeholder: '이메일',
      name: 'email',
      error: errorMessage,
    });

    // Then: 해당 에러 메시지가 화면에 보여야 함
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('error가 있을 때 input 요소는 하단 빨간색 border를 가져야 함', () => {
    // Given: error 메시지가 설정된 InputField를 렌더링함
    const errorMessage = '필수 입력입니다.';
    renderInputField({
      placeholder: '이름',
      name: 'name',
      error: errorMessage,
    });

    const input = screen.getByPlaceholderText('이름');

    // Then: 스타일 속성에서 빨간색 border-bottom이 적용되어야 함
    expect(input).toHaveStyle(
      `border-bottom: 1px solid ${theme.color.red[500]}`
    );
  });
});
