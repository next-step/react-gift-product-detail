import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../ui/LoginForm';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/app/styles/theme';

const mockLogin = vi.fn();
vi.mock('@/entities/user/model/context', () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

const renderWithRouter = (ui: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      <MemoryRouter>{ui}</MemoryRouter>
    </ThemeProvider>
  );
};

describe('<LoginForm />', () => {
  it('초기 렌더링 시 UI가 올바르고 버튼이 비활성화되어야 한다.', () => {
    renderWithRouter(<LoginForm />);

    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();

    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).toBeDisabled();
  });

  it(`
    이메일 입력창에 유효하지 않은 형식("invalid-email")을 입력하고 포커스 아웃하면,
    "ID는 이메일 형식으로 입력해주세요."라는 에러 메시지를 표시한다.
  `, async () => {
    const user = userEvent.setup();
    // Given - 로그인 폼 렌더링
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('이메일');

    // When - 잘못된 이메일 입력 후 포커스 아웃
    await user.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    // Then - 이메일 형식 에러 메시지 출력
    expect(await screen.findByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument();
  });

  it(`
    비밀번호 입력창에 8자 미만("1234")으로 입력하고 포커스 아웃하면,
    "PW는 최소 8글자 이상이어야 합니다."라는 에러 메시지를 표시한다.
  `, async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const passwordInput = screen.getByPlaceholderText('비밀번호');

    // When - 8글자 미만 비밀번호 입력 후 포커스 아웃
    await user.type(passwordInput, '1234');
    fireEvent.blur(passwordInput);
    // Then - 비밀번호 길이 에러 메시지 출력
    expect(await screen.findByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();
  });

  it('입력값이 유효하지 않을 때 로그인 버튼이 비활성화되어야 한다', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    // When - 유효하지 않은 값들 입력
    await user.type(emailInput, 'invalid-email');
    await user.type(passwordInput, '1234');
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // Then - 로그인 버튼 비활성화
    expect(loginButton).toBeDisabled();
  });

  it('이메일과 비밀번호가 모두 유효할 때 로그인 버튼이 활성화되어야 한다', async () => {
    const user = userEvent.setup();
    // Given - 로그인 폼 렌더링
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    // 1. When - 유효한 이메일과 비밀번호를 입력한다.
    await user.type(emailInput, 'test@kakao.com');
    await user.type(passwordInput, '12345678');

    // 2. Then - 로그인 버튼이 활성화된다.
    expect(loginButton).toBeEnabled();
  });

  it('유효한 폼 제출 시 login 함수가 올바른 인자와 함께 호출되어야 한다.', async () => {
    const user = userEvent.setup();
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    // 1. Given - 유효한 값을 모두 입력한다.
    await user.type(emailInput, 'test@kakao.com');
    await user.type(passwordInput, '12345678');

    // 2. When - 활성화된 로그인 버튼을 클릭한다.
    await user.click(loginButton);

    // 3. Then - 모킹된 login 함수가 올바른 인자들과 함께 호출되었는지 확인한다.
    expect(mockLogin).toHaveBeenCalledTimes(1);
    expect(mockLogin).toHaveBeenCalledWith('test@kakao.com', '12345678', expect.any(Function));
  });
});
