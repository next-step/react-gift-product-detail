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

  it('잘못된 값을 입력하면 에러 메시지가 표시되어야 한다.', async () => {
    const user = userEvent.setup();
    // Given - 로그인 폼 렌더링
    renderWithRouter(<LoginForm />);

    const emailInput = screen.getByPlaceholderText('이메일');
    const passwordInput = screen.getByPlaceholderText('비밀번호');

    // When - 잘못된 이메일 입력 후 포커스 아웃
    await user.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);
    // Then - 이메일 형식 에러 메시지 출력
    expect(await screen.findByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument();

    // When - 잘못된 비밀번호 입력 후 포커스 아웃
    await user.type(passwordInput, '1234');
    fireEvent.blur(passwordInput);
    // Then - 비밀번호 길이 에러 메시지 출력
    expect(await screen.findByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument();

    // Then - 버튼은 여전히 비활성화 상태
    const loginButton = screen.getByRole('button', { name: '로그인' });
    expect(loginButton).toBeDisabled();
  });

  it('올바른 값을 입력하면 버튼이 활성화되어야 한다.', async () => {
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
});
