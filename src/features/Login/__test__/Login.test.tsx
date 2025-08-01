import { screen, waitFor } from '@testing-library/react';
import Login from '../Login';
import { renderWithProviders } from '@test/utils/renderWithProviders';
import userEvent from '@testing-library/user-event';
import { validateInputTest } from '@test/utils/validateInputTest';

const invalidCases = [
  {
    name: '유효하지 않은 이메일과 유효하지 않은 비밀번호',
    email: 'invalid-email',
    password: '123',
  },
  {
    name: '유효하지 않은 이메일과 유효한 비밀번호',
    email: 'invalid',
    password: 'password123',
  },
  {
    name: '유효한 이메일과 유효하지 않은 비밀번호',
    email: 'test@kakao.com',
    password: 'pass',
  },
] as const;

describe('LoginPage', () => {
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;

  beforeEach(() => {
    renderWithProviders(<Login />);
    emailInput = screen.getByPlaceholderText('이메일');
    passwordInput = screen.getByPlaceholderText('비밀번호');
    loginButton = screen.getByRole('button', { name: /로그인/ });
  });

  it('input 필드, 로그인 버튼 렌더링 테스트', () => {
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  it('초기 상태 로그인 버튼 비활성화 테스트', () => {
    expect(loginButton).toBeDisabled();
  });

  //유효하지 않은 이메일, 비밀번호 입력시 오류 메시지 표시 테스트
  it('이메일 패스워드 입력값이 없을 경우 에러 메시지 테스트', async () => {
    await validateInputTest('ID를 입력해주세요', emailInput, '');
    await validateInputTest('PW를 입력해주세요.', passwordInput, '');
  });

  it('이메일 패스워드 형식 테스트', async () => {
    await validateInputTest(
      'ID는 kakao.com 이메일 형식으로 입력해주세요',
      emailInput,
      'invalid-email'
    );
    await validateInputTest(
      'PW는 최소 8글자 이상이어야 합니다.',
      passwordInput,
      '1234'
    );
  });

  it.each(invalidCases)(
    '유효하지 않은 이메일, 비밀번호 입력시 버튼 비활성화 테스트',
    async ({ email, password }) => {
      await userEvent.clear(emailInput);
      await userEvent.type(emailInput, email);
      await userEvent.clear(passwordInput);
      await userEvent.type(passwordInput, password);
      expect(loginButton).toBeDisabled();
    }
  );

  it('유효한 이메일, 비밀번호 입력시 성공 toast 출력', async () => {
    // 핸들러가 정의한 성공 조건에 맞는 입력 값 사용
    await userEvent.type(emailInput, 'test@kakao.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(screen.getByText('로그인 성공')).toBeInTheDocument();
    });
  });

  it('유효한 이메일, 비밀번호 입력시 버튼 활성화', async () => {
    // 핸들러가 정의한 성공 조건에 맞는 입력 값 사용
    await userEvent.type(emailInput, 'test@kakao.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(loginButton);
    await waitFor(() => expect(loginButton).toBeEnabled());
  });

  it('로그인 실패 시 토스트 메시지 출력', async () => {
    await userEvent.type(emailInput, 'invalid@kakao.com');
    await userEvent.type(passwordInput, 'wrongPassword');
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(
        screen.getByText('알 수 없는 에러가 발생했습니다.')
      ).toBeInTheDocument();
    });
  });
});
