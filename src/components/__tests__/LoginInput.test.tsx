/*
    Login 페이지 테스트 시나리오

    - 시나리오 1. 초기 렌더링 상태
      Given: 사용자가 로그인 페이지에 접근했을 때
      When: 아무런 입력도 하지 않은 상태에서 페이지가 렌더링 되면
      Then:
        1. 이메일 입력 필드가 화면에 표시된다.
        2. 비밀번호 입력 필드가 화면에 표시된다.
        3. 로그인 버튼은 비활성화 상태이다.
        4. 에러 메시지는 표시되지 않는다.

    - 시나리오 2. 잘못된 이메일 형식 입력 시
      Given: 이메일 입력 필드에 포커스를 맞춘 상태에서
      When: 이메일 형식에 맞지 않은 입력을 한 후 포커스를 잃으면
      Then:
        1. "ID는 이메일 형식으로 입력해주세요." 에러메시지가 나타난다.
        2. 에러 메시지는 빨간색 텍스트로 표시된다.
        3. 로그인 버튼은 비활성화 상태이다.

    - 시나리오 3. 올바른 이메일 입력 시
      Given: 이메일 입력 필드에 포커스를 맞춘 상태에서
      When: 'test@example.com'과 같은 올바른 이메일을 입력한 후 포커스를 잃으면
      Then:
        1. "ID를 입력해주세요.", "ID는 이메일 형식으로 입력해주세요." 메시지가 사라진다.

    - 시나리오 4. 비밀번호가 8자 미만일 때
      Given: 비밀번호 입력 필드에 포커스를 맞춘 상태에서
      When: 8자 미만의 비밀번호를 입력한 후 포커스를 잃으면
      Then:
        1. "PW는 최소 8글자 이상이어야 합니다." 라는 에러 메시지가 나타난다.
        2. 에러 메시지는 빨간색 텍스트로 표시된다.
        3. 로그인 버튼은 비활성화 상태여야 한다.

    - 시나리오 5. ID와 PW가 모두 올바른 경우
      Given: 이메일과 비밀번호가 모두 유효한 값으로 입력된 상태에서
      When:
        - 이메일 'test@example.com'
        - 비밀번호: 'password'
        를 입력하고 포커스를 잃으면
      Then:
        1. 모든 에러 메시지가 사라진다.
        2. 로그인 버튼은 활성화된다.

      - 시나리오 6. 하나라도 유효하지 않으면 로그인 버튼은 비활성화 유지
        Case 1: 이메일이 유효하지 않을 경우
          Given: 비밀번호는 유효하지만 이메일은 잘못된 형식일 때
          When:
            - 이메일 'test'
            - 비밀번호: 'password'
          Then:
            1. 로그인 버튼은 비활성화 상태이다.
        Case 2: 비밀번호가 유효하지 않을 경우
          Given: 이메일은 유효하지만 비밀번호는 짧을 때
          When:
            - 이메일 'test@example.com'
            - 비밀번호: 'ps'
          Then:
            1. 로그인 버튼은 비활성화 상태이다.
 */

import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '@src/components/Login';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';
import tokens from '@src/styles/tokens/index';

vi.mock('@/contexts/AuthContext', () => ({
  useUserInfo: () => ({ setUser: vi.fn() }),
}));

vi.mock('@/hooks/useLoginMutation', () => ({
  __esModule: true,
  default: () => ({
    mutateAsync: vi.fn(),
    isPending: false,
  }),
}));

describe('Login 페이지 - ID, PW 유효성 검사 및 버튼 활성화', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
  });

  const idInput = () => screen.getByPlaceholderText('이메일');
  const pwInput = () => screen.getByPlaceholderText('비밀번호');
  const loginButton = () => screen.getByRole('button', { name: /로그인/i });

  it('초기 상태에서 버튼은 비활성화, 에러 메시지는 없어아 한다', () => {
    expect(idInput()).toBeInTheDocument();
    expect(pwInput()).toBeInTheDocument();
    expect(loginButton()).toBeDisabled();

    expect(screen.queryByText(/ID를 입력해주세요/)).not.toBeInTheDocument();
    expect(screen.queryByText(/이메일 형식/)).not.toBeInTheDocument();
    expect(screen.queryByText(/PW를 입력해주세요/)).not.toBeInTheDocument();
    expect(screen.queryByText(/최소 8글자/)).not.toBeInTheDocument();
  });

  it('잘못된 이메일 형식 입력 후 blur시 "ID는 이메일 형식으로 입력해주세요." 빨간색 에러 메시지를 표시한다', async () => {
    userEvent.clear(idInput());
    await userEvent.type(idInput(), 'not-an-email');
    userEvent.tab();

    const error = await screen.findByText('ID는 이메일 형식으로 입력해주세요.');
    expect(error).toBeVisible();
    expect(error).toHaveStyle(`color: ${tokens.colors.red700}`);
    expect(loginButton()).toBeDisabled();
  });

  it('올바른 이메일 입력 시 에러 메시지가 사라진다', async () => {
    userEvent.clear(idInput());
    await userEvent.type(idInput(), 'test@example.com');
    userEvent.tab();

    await waitFor(() => {
      expect(screen.queryByText('ID를 입력해주세요.')).not.toBeInTheDocument();
      expect(
        screen.queryByText('ID는 이메일 형식으로 입력해주세요.')
      ).not.toBeInTheDocument();
    });
  });

  it('8글자 미만 PW 입력 후 blur 시 "PW는 최소 8글자 이상이어야 합니다." 빨간색 에러 메시지를 표시한다', async () => {
    userEvent.clear(pwInput());
    await userEvent.type(pwInput(), 'short');
    userEvent.tab();

    const error = await screen.findByText('PW는 최소 8글자 이상이어야 합니다.');
    expect(error).toBeVisible();
    expect(error).toHaveStyle(`color: ${tokens.colors.red700}`);
    expect(loginButton()).toBeDisabled();
  });

  it('ID와 PW 모두 올바르면 로그인 버튼이 활성화 된다', async () => {
    await userEvent.type(idInput(), 'test@example.com');
    await userEvent.type(pwInput(), 'validpassword');

    userEvent.tab();

    await waitFor(() => {
      expect(loginButton()).toBeEnabled();
      expect(screen.queryByText(/ID를 입력해주세요./)).not.toBeInTheDocument();
      expect(screen.queryByText(/PW를 입력해주세요./)).not.toBeInTheDocument();
    });
  });

  it('ID 또는 PW가 유효하지 않으면 로그인 버튼은 비활성화 상태 유지한다', async () => {
    await userEvent.type(idInput(), 'invalid-email');
    await userEvent.type(pwInput(), 'validpassword');
    userEvent.tab();

    await waitFor(() => {
      expect(loginButton()).toBeDisabled();
    });

    userEvent.clear(idInput());
    userEvent.clear(pwInput());

    await userEvent.type(idInput(), 'test@example.com');
    await userEvent.type(pwInput(), 'short');
    userEvent.tab();

    await waitFor(() => {
      expect(loginButton()).toBeDisabled();
    });
  });
});
