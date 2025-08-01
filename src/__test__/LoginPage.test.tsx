import { vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import LoginPage from '@/features/Login/pages/LoginPage'
import * as loginSubmitModule from '@/features/Login/hooks/useLoginSubmit'

vi.mock('@/assets/icons/kakao-title.svg?react', () => {
  return {
    default: () => <svg data-testid="mock-kakao-icon" />,
  }
})

vi.mock('@/features/Login/hooks/useLoginSubmit', () => {
  return {
    useLoginSubmit: vi.fn(),
  }
})

describe('LoginForm', () => {
  let submitLoginMock: ReturnType<
    typeof loginSubmitModule.useLoginSubmit
  >['submitLogin']

  beforeEach(() => {
    submitLoginMock = vi.fn()
    ;(loginSubmitModule.useLoginSubmit as unknown as jest.Mock).mockReturnValue(
      {
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
      }
    )
  })

  const setup = () =>
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    )

  test('이메일, 비밀번호 input과 로그인 버튼이 렌더링 됨', () => {
    // Given: 로그인 페이지를 처음 방문했을 때
    setup()

    // When: 사용자 화면에 보이는 입력 필드와 버튼을 찾으면
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // Then: 이메일, 비밀번호 입력창과 로그인 버튼이 존재해야 함
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(loginButton).toBeInTheDocument()
  })

  test('입력 없이 제출 시 로그인 버튼은 비활성화 상태', () => {
    // Given: 로그인 페이지가 렌더링 된 상태에서
    setup()

    // When: 아무것도 입력하지 않은 상태면
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // Then: 로그인 버튼은 비활성화(disabled) 되어야 함
    expect(loginButton).toBeDisabled()
  })

  test('유효한 입력 시 버튼이 활성화되고 submitLogin이 호출됨', async () => {
    // Given: 로그인 페이지가 렌더링 되고
    setup()
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // When: 사용자가 이메일과 비밀번호를 정상적으로 입력하면
    await userEvent.type(emailInput, 'test@example.com')
    await userEvent.type(passwordInput, 'testpassword')

    // Then: 로그인 버튼이 활성화되어야함
    expect(loginButton).toBeEnabled()

    // When: 로그인 버튼을 클릭하면
    await userEvent.click(loginButton)

    // Then: submitLogin 함수가 입력한 이메일과 비밀번호를 인자로 호출되어야 함
    expect(submitLoginMock).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'testpassword',
    })
  })
})
