import { render, screen } from '@/tests/test-utils';
import userEvent from '@testing-library/user-event';
import InputField from './InputField';

const FieldProps = {
  name: 'username',
  value: '',
  error: '',
  isValid: false,
  onChange: vi.fn(),
};

describe('공용 InputField 컴포넌트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('GIVEN: type prop이 "email"로 주어지면, THEN: input 요소의 타입이 "email"여야 한다.', () => {
    render(<InputField field={FieldProps} placeholder="이메일" type="email" />);

    const inputElement = screen.getByPlaceholderText('이메일');
    expect(inputElement).toHaveAttribute('type', 'email');
  });

  it('GIVEN: type prop이 "password"로 주어지면, THEN: input 요소의 타입이 "password"여야 한다.', () => {
    render(<InputField field={FieldProps} placeholder="비밀번호" type="password" />);

    const inputElement = screen.getByPlaceholderText('비밀번호');
    expect(inputElement).toHaveAttribute('type', 'password');
  });

  it('GIVEN: 사용자가 입력을 할 때, WHEN: onChange 핸들러가 주어지면, THEN: 핸들러가 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    render(<InputField field={FieldProps} placeholder="입력 테스트" />);
    const inputElement = screen.getByPlaceholderText('입력 테스트');
    const testText = 'hello';
    await user.type(inputElement, testText);

    expect(FieldProps.onChange).toHaveBeenCalledTimes(testText.length);
  });

  describe('GIVEN: 필수 입력 필드인 상황에서', () => {
    it('WHEN: 에러 메시지가 주어지면, THEN: 화면에 표시되어야 한다.', () => {
      const errorFieldProps = {
        ...FieldProps,
        error: 'ID를 입력해주세요.',
      };
      render(<InputField field={errorFieldProps} placeholder="이메일" />);

      const errorMessage = screen.getByText('ID를 입력해주세요.');
      expect(errorMessage).toBeInTheDocument();
    });

    it('WHEN: 에러 메시지가 주어지지 않으면, THEN: 화면에 표시되지 않아야 한다.', () => {
      render(<InputField field={FieldProps} placeholder="이메일" />);

      const errorMessage = screen.queryByText('ID를 입력해주세요');
      expect(errorMessage).not.toBeInTheDocument();
    });
  });
});
