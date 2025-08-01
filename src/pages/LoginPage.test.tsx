import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginPage } from './LoginPage'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { vi } from 'vitest'
import * as AuthContext from '@/contexts/AuthContext'
import * as reactRouterDom from 'react-router-dom'

const queryClient = new QueryClient()

function renderWithProviders(
  ui: React.ReactElement,
  initialEntries = ['/login']
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: vi.fn(),
  }
})

const mutateMock = vi.fn()
vi.mock('@/hooks/useLoginMutation', () => ({
  useLoginMutation: () => ({
    mutate: mutateMock,
  }),
}))

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}))

const useAuthSpy = vi.spyOn(AuthContext, 'useAuth')

describe('LoginPage', () => {
  let useNavigateSpy: ReturnType<typeof vi.spyOn>
  beforeEach(() => {
    vi.clearAllMocks()
    localStorage.clear()
    useNavigateSpy = vi
      .spyOn(reactRouterDom, 'useNavigate')
      .mockReturnValue(vi.fn())
  })

  it('초기 렌더링시 이메일, 비밀번호 필드 및 버튼이 보이고 버튼은 비활성화된다.', () => {
    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()

    const loginButton = screen.getByRole('button', { name: /로그인/i })
    expect(loginButton).toBeDisabled()
  })

  it('입력값 유효성 검사 및 에러 메시지가 표시된다.', async () => {
    renderWithProviders(<LoginPage />)

    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: /로그인/i })

    // 이메일 안 입력
    fireEvent.blur(emailInput)
    expect(await screen.findByText('ID를 입력해주세요.')).toBeInTheDocument()

    // 잘못된 이메일 형식
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } })
    fireEvent.blur(emailInput)
    expect(
      await screen.findByText('ID는 이메일 형식으로 입력해주세요.')
    ).toBeInTheDocument()

    // 비밀번호 안 입력
    fireEvent.blur(passwordInput)
    expect(await screen.findByText('PW를 입력해주세요.')).toBeInTheDocument()

    // 8글자 미만 비밀번호
    fireEvent.change(passwordInput, { target: { value: '1234' } })
    fireEvent.blur(passwordInput)
    expect(
      await screen.findByText('PW는 최소 8글자 이상이어야 합니다.')
    ).toBeInTheDocument()

    // 올바른 입력
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } })
    fireEvent.change(passwordInput, { target: { value: '12345678' } })

    await waitFor(() => {
      expect(loginButton).toBeEnabled()
      expect(
        screen.queryByText(/ID는 이메일 형식으로 입력해주세요./)
      ).not.toBeInTheDocument()
      expect(
        screen.queryByText(/PW는 최소 8글자 이상이어야 합니다./)
      ).not.toBeInTheDocument()
    })
  })

  it('로그인 성공 시 유저 정보가 저장된다.', async () => {
    const loginMock = vi.fn((user) => {
      localStorage.setItem('userInfo', JSON.stringify(user))
    })

    mutateMock.mockImplementation((data, { onSuccess }) => {
      onSuccess({
        email: 'test@kakao.com',
        name: '홍길동',
        authToken: 'token123',
      })
    })
    useAuthSpy.mockReturnValue({
      user: null,
      login: loginMock,
      logout: vi.fn(),
    })

    renderWithProviders(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@kakao.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: '12345678' },
    })
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }))

    await waitFor(() => {
      expect(mutateMock).toHaveBeenCalled()
      expect(loginMock).toHaveBeenCalledWith({
        email: 'test@kakao.com',
        name: '홍길동',
        authToken: 'token123',
      })
    })

    const stored = localStorage.getItem('userInfo')
    expect(stored).not.toBeNull()
    if (stored) {
      const parsed = JSON.parse(stored)
      expect(parsed).toMatchObject({
        email: 'test@kakao.com',
        name: '홍길동',
        authToken: 'token123',
      })
    }
  })

  it('로그인 성공 시 마이페이지로 이동한다.', async () => {
    const loginMock = vi.fn()
    const navigateMock = vi.fn()
    useNavigateSpy.mockReturnValue(navigateMock)

    mutateMock.mockImplementation((data, { onSuccess }) => {
      onSuccess({
        email: 'test@kakao.com',
        name: '홍길동',
        authToken: 'token123',
      })
    })
    useAuthSpy.mockReturnValue({
      user: null,
      login: loginMock,
      logout: vi.fn(),
    })

    renderWithProviders(<LoginPage />)

    fireEvent.change(screen.getByPlaceholderText('이메일'), {
      target: { value: 'test@kakao.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('비밀번호'), {
      target: { value: '12345678' },
    })
    fireEvent.click(screen.getByRole('button', { name: /로그인/i }))

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/my', { replace: true })
    })
  })

  it('이미 로그인된 사용자는 마이페이지로 리디렉션된다.', async () => {
    const navigateMock = vi.fn()
    useNavigateSpy.mockReturnValue(navigateMock)

    useAuthSpy.mockReturnValue({
      user: { email: 'test@kakao.com', name: '홍길동', authToken: 'token' },
      login: vi.fn(),
      logout: vi.fn(),
    })

    renderWithProviders(<LoginPage />)

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith('/my', { replace: true })
    })
  })
})
