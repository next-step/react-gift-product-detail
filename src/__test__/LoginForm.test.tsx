import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '@/features/Login/components/LoginForm';

describe('LoginForm', () => {
  const setup = () => render(<LoginForm redirectPath="/home" />);

  test('이메일, 비밀번호 input이 렌더링된다', () => {
    setup();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('입력값이 변경되면 input value도 변경된다', async () => {
    setup();

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, '1234');

    expect(emailInput).toHaveValue('test@example.com');
    expect(passwordInput).toHaveValue('1234');
  });

  test('입력 오류가 있으면 에러 메시지가 나타난다', async () => {
    setup();

    const loginButton = screen.getByRole('button', { name: /로그인/i });
    await userEvent.click(loginButton);

    const emailError = await screen.findByText(/이메일을 입력해 주세요/);
    const passwordError = await screen.findByText(/비밀번호를 입력해 주세요/);

    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
  });
});
