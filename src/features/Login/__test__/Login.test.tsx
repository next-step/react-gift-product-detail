import { screen, waitFor } from '@testing-library/react';
import Login from '../Login';
import { renderWithProviders } from '@test/utils/renderWithProviders';
import userEvent from '@testing-library/user-event';

/* 시나리오
1. 이메일, 비밀번호 입력 필드가 있다.
2. 올바르지 않은 이메일 또는 비밀번호 입력시 비밀번호가 활성화 되지 않는다
3. 올바른 정보 입력 후 로그인 버튼 클릭 시 로그인 API 호출
4. 로그인 후 toast로 "로그인 성공" 택스트 출력
*/

describe('LoginPage', () => {
  it('renders inputs and button', () => {
    renderWithProviders(<Login />);
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/ })).toBeInTheDocument();
  });

  it('disables login button when inputs are invalid', async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: /로그인/ });

    // 유효하지 않은 이메일 & 유효하지  않은 비밀번호
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.type(passwordInput, '123');
    expect(loginButton).toBeDisabled();

    // 유효하지 않은 이메일 & 유효한 비밀번호
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'invalid');
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'password123');
    expect(loginButton).toBeDisabled();

    // 유효한 이메일 & 유효하지 않은 비밀번호
    await userEvent.clear(emailInput);
    await userEvent.type(emailInput, 'jin@kakao.com');
    await userEvent.clear(passwordInput);
    await userEvent.type(passwordInput, 'pass');
    expect(loginButton).toBeDisabled();
  });

  it('calls login API with valid input and shows success toast', async () => {
    renderWithProviders(<Login />);
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: /로그인/ });

    await userEvent.type(emailInput, 'test@kakao.com');
    await userEvent.type(passwordInput, 'password123');
    expect(loginButton).toBeEnabled();

    await userEvent.click(loginButton);

    // 토스트 메시지가 뜨는지 확인
    await waitFor(() => {
      expect(screen.getByText('로그인 성공')).toBeInTheDocument();
    });
  });
});
