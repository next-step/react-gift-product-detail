import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/features/Login/pages/LoginPage';
import * as loginSubmitModule from '@/features/Login/hooks/useLoginSubmit';

vi.mock('@/features/Login/hooks/useLoginSubmit', () => {
  return {
    useLoginSubmit: vi.fn(),
  };
});

describe('LoginForm', () => {
  let submitLoginMock: ReturnType<
    typeof loginSubmitModule.useLoginSubmit
  >['submitLogin'];

  beforeEach(() => {
    submitLoginMock = vi.fn();
    (loginSubmitModule.useLoginSubmit as unknown as jest.Mock).mockReturnValue({
      submitLogin: submitLoginMock,
      mutate: submitLoginMock,
      data: undefined,
      error: null,
      variables: undefined,
      isError: false,
      isIdle: true,
      isPending: false,
      isSuccess: false,
      status: 'idle',
      mutateAsync: vi.fn(),
      reset: vi.fn(),
      failureCount: 0,
      failureReason: null,
      context: undefined,
      isPaused: false,
    });
  });

  const setup = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

  test('이메일, 비밀번호 input과 로그인 버튼이 렌더링 됨', () => {
    setup();
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test('입력 없이 제출 시 로그인 버튼은 비활성화 상태', () => {
    setup();
    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).toBeDisabled();
  });

  test('유효한 입력 시 버튼이 활성화되고 submitLogin이 호출됨', async () => {
    setup();
    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    const loginButton = screen.getByRole('button', { name: '로그인' });

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'testpassword');

    expect(loginButton).toBeEnabled();
    await userEvent.click(loginButton);

    expect(submitLoginMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'testpassword',
    });
  });
});
