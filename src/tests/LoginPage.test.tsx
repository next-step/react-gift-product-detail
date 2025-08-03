const mockNavigate = vi.fn();
const mockLogin = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ state: null }),
  };
});

vi.mock('@/contexts/UserContext', async () => {
  const actual =
    await vi.importActual<typeof import('@/contexts/UserContext')>('@/contexts/UserContext');

  return {
    ...actual,
    useUser: () => ({
      user: null,
      login: mockLogin,
      logout: vi.fn(),
      isLoading: false,
    }),
  };
});

import { screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/pages/LoginPage';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderCustom } from '@/tests/testUtils';
import userEvent from '@testing-library/user-event';
import * as useAuthHook from '@/hooks/useAuth';

/*
LoginPage 테스트 시나리오

1. 로그인 페이지 렌더링 시 이메일, 비밀번호 입력란과 로그인 버튼이 보인다.
2. 이메일을 잘못 입력하면 에러 메시지가 표시된다.
3. 비밀번호를 8글자 미만으로 입력하면 에러 메시지가 표시된다.
4. 유효하지 않은 상태에서는 로그인 버튼이 비활성화된다.
5. 유효한 이메일,비밀번호 입력 시 로그인 버튼이 활성화된다.
6. 로그인 실패 시 toast 에러 메시지가 나타난다.
7. 로그인 성공 시 navigate()가 호출되고 이동한다.

*/

describe('LoginPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('이메일, 비밀번호 입력 필드와 로그인 버튼이 렌더링되어야 한다.', () => {
    // Given: 로그인 페이지를 렌더링했을 때
    renderCustom(<LoginPage />);

    // Then: 이메일, 비밀번호 input과 로그인 버튼이 보여야 한다.
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /로그인/i })).toBeInTheDocument();
  });

  it('이메일이 잘못된 형식이면 에러 메시지가 나타나야 한다.', async () => {
    // Given: 로그인 페이지가 렌더링되고
    renderCustom(<LoginPage />);
    const emailInput = screen.getByPlaceholderText('이메일');

    // When: 잘못된 이메일을 입력한 뒤 blur 이벤트가 발생하면
    await userEvent.type(emailInput, 'invalid-email');
    fireEvent.blur(emailInput);

    // Then: 이메일 형식 관련 에러 메시지가 나타나야 한다.
    expect(await screen.findByText(/ID는 이메일 형식으로 입력해주세요/)).toBeInTheDocument();
  });

  it('비밀번호가 8글자 미만이면 에러 메시지가 나타나야 한다.', async () => {
    // Given: 로그인 페이지가 렌더링되고
    renderCustom(<LoginPage />);
    const pwInput = screen.getByPlaceholderText('비밀번호');

    // When: 8글자 미만 비밀번호를 입력하고 blur 했을 때
    await userEvent.type(pwInput, '123');
    fireEvent.blur(pwInput);

    // Then: 길이 제한 에러 메시지가 나타나야 한다.
    expect(await screen.findByText(/PW는 최소 8글자 이상이어야 합니다/)).toBeInTheDocument();
  });

  it('입력이 유효하지 않으면 로그인 버튼이 비활성화되어야 한다.', async () => {
    // Given: 로그인 페이지가 렌더링되었을 때

    renderCustom(<LoginPage />);

    // Then: 아무것도 입력하지 않은 상태에서는 버튼이 비활성화되어야 한다.
    expect(screen.getByRole('button', { name: /로그인/i })).toBeDisabled();
  });

  it('이메일과 비밀번호가 유효하게 입력되면 로그인 버튼이 활성화되어야 한다.', async () => {
    // Given: 로그인 페이지가 렌더링되고
    renderCustom(<LoginPage />);

    // When: 유효한 이메일, 비밀번호를 입력하면
    await userEvent.type(screen.getByPlaceholderText('이메일'), 'test@kakao.com');
    fireEvent.blur(screen.getByPlaceholderText('이메일'));
    await userEvent.type(screen.getByPlaceholderText('비밀번호'), '12345678');
    fireEvent.blur(screen.getByPlaceholderText('비밀번호'));

    // Then: 로그인 버튼이 활성화되어야 한다.
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /로그인/i })).toBeEnabled();
    });
  });
  /*
  it('로그인 실패 시 toast 에러 메시지가 표시되어야 한다.', async () => {
    // Given: login API가 실패하도록 mocking하고
    const errorMessage = '로그인에 실패했습니다.';
    const mockMutateAsync = vi.fn().mockRejectedValue({
      response: { data: { data: { message: errorMessage } } },
    });

    vi.spyOn(useAuthHook, 'useLoginMutation').mockReturnValue({
      mutateAsync: mockMutateAsync,
    } as any);

    renderCustom(<LoginPage />);

    await userEvent.type(screen.getByPlaceholderText('이메일'), 'test@kakao.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호'), '12345678');

    // When: 로그인 버튼을 클릭하면
    await userEvent.click(screen.getByRole('button', { name: /로그인/i }));

    // Then: toast로 에러 메시지가 나타나야 한다.
    await waitFor(() => {
      const toast = screen.queryByText((text) => text.includes('로그인에 실패'));
      expect(toast).toBeInTheDocument();
    });
  });
  */

  /*
  it('로그인 성공 시 navigate가 호출되어 메인 페이지로 이동해야 한다.', async () => {
    // Given: login API가 성공하도록 mocking하고

    const mockMutateAsync = vi.fn().mockResolvedValue({
      email: 'test@kakao.com',
      name: '김지훈',
      authToken: 'token',
    });

    vi.spyOn(useAuthHook, 'useLoginMutation').mockReturnValue({
      mutateAsync: mockMutateAsync,
    } as any);

    renderCustom(<LoginPage />);

    await userEvent.type(screen.getByPlaceholderText('이메일'), 'test@kakao.com');
    await userEvent.type(screen.getByPlaceholderText('비밀번호'), '12345678');

    // When: 로그인 버튼을 클릭했을 때
    await userEvent.click(screen.getByRole('button', { name: /로그인/i }));

    // Then: navigate(ROUTE.MAIN) 호출되어야 한다.
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: 'test@kakao.com',
        name: '김지훈',
        authToken: 'token',
      });
      expect(mockNavigate).toHaveBeenCalledWith('/', { replace: true });
    });
  });
  */
});
