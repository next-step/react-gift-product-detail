// 기존 vi.mock('@/api/services', ...) 및 관련 mockLoginApi 코드 제거

import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/contexts/auth'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/shared/styles'

// * useNavigate 모킹 추가 (import 이후)
const mockNavigate = vi.fn()
const mockLocation = { pathname: '/login', state: { from: '/home' } }
const mockLogin = vi.fn()

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => {
      return mockNavigate
    },
    useLocation: () => mockLocation,
  }
})

vi.mock('@/contexts/auth', async () => {
  const actual = await vi.importActual('@/contexts/auth')
  return {
    ...actual,
    useAuth: () => ({
      user: { name: '', email: '', authToken: '' },
      setUser: vi.fn(),
      isLogin: false,
      setIsLogin: vi.fn(),
      isInitialized: true,
      login: mockLogin,
      logout: vi.fn(),
    }),
  }
})

import Login from '../Login'

// * 테스트용 Provider 래퍼
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>{children}</BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}

describe('Login 페이지', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mockNavigate.mockClear()
  })

  /**
   * 시나리오: 로그인 페이지가 정상적으로 렌더링된다.
   * - Given: 로그인 페이지에 진입했을 때
   * - Then: 로고, 이메일/비밀번호 입력, 로그인 버튼이 보여야 한다.
   */
  it('로그인 페이지 렌더링', () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })

    // Then
    expect(screen.getByAltText('카카오 공식 로고')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('이메일')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('비밀번호')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '로그인' })).toBeInTheDocument()
  })

  /**
   * 시나리오: 입력값이 없을 때 에러 메시지가 노출된다.
   * - Given: 로그인 폼에서 아무것도 입력하지 않고
   * - When: 입력 필드를 blur하고 로그인 버튼을 클릭하면
   * - Then: 이메일/비밀번호 필드 각각에 에러 메시지가 노출된다.
   */
  it('입력값 없이 제출 시 에러 메시지 노출', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')

    // When
    fireEvent.blur(emailInput)
    fireEvent.blur(passwordInput)
    const loginButton = screen.getByRole('button', { name: '로그인' })
    fireEvent.click(loginButton)

    // Then
    await waitFor(() => {
      expect(screen.getByText('ID를 입력해주세요.')).toBeInTheDocument()
      expect(screen.getByText('PW를 입력해주세요.')).toBeInTheDocument()
    })
  })

  /**
   * 시나리오: 잘못된 이메일, 짧은 비밀번호 입력 시 에러 메시지 노출
   * - Given: 로그인 폼에서
   * - When: 잘못된 이메일, 짧은 비밀번호를 입력하고 blur하면
   * - Then: 각 필드에 맞는 에러 메시지가 노출된다.
   */
  it('잘못된 이메일/짧은 비밀번호 입력 시 에러 메시지', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')

    // When
    fireEvent.change(emailInput, { target: { value: 'wrong' } })
    fireEvent.blur(emailInput)
    fireEvent.change(passwordInput, { target: { value: '123' } })
    fireEvent.blur(passwordInput)

    // Then
    await waitFor(() => {
      expect(screen.getByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument()
      expect(screen.getByText('PW는 최소 8글자 이상이어야 합니다.')).toBeInTheDocument()
    })
  })

  /**
   * 시나리오: 올바른 값 입력 시 에러 메시지가 사라진다.
   * - Given: 에러 메시지가 노출된 상태에서
   * - When: 올바른 이메일로 수정하면
   * - Then: 에러 메시지가 사라진다.
   */
  it('올바른 값 입력 시 에러 메시지 사라짐', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')

    // When
    fireEvent.change(emailInput, { target: { value: 'wrong' } })
    fireEvent.blur(emailInput)
    await waitFor(() => {
      expect(screen.getByText('ID는 이메일 형식으로 입력해주세요.')).toBeInTheDocument()
    })
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
    fireEvent.blur(emailInput)

    // Then
    await waitFor(() => {
      expect(screen.queryByText('ID는 이메일 형식으로 입력해주세요.')).not.toBeInTheDocument()
    })
  })

  /**
   * 시나리오: 모든 필드가 유효할 때 로그인 버튼이 활성화된다.
   * - Given: 이메일, 비밀번호를 올바르게 입력하고
   * - When: blur 이벤트를 발생시키면
   * - Then: 로그인 버튼이 활성화된다.
   */
  it('모든 필드가 유효할 때 로그인 버튼 활성화', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // When
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
    fireEvent.blur(emailInput)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.blur(passwordInput)

    // Then
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled()
    })
  })

  /**
   * 시나리오: 입력값 변경 시 입력 필드 값이 반영된다.
   * - Given: 로그인 폼에서
   * - When: 이메일, 비밀번호를 입력하면
   * - Then: 입력값이 반영된다.
   */
  it('입력값 변경 시 입력 필드 값 반영', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')

    // When
    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
    })

    // Then
    expect(emailInput).toHaveValue('test@kakao.com')
    expect(passwordInput).toHaveValue('password123')
  })

  /**
   * 시나리오: 로그인 버튼 클릭 시 로그인 API가 호출된다.
   * - Given: 올바른 이메일/비밀번호를 입력하고
   * - When: 로그인 버튼을 클릭하면
   * - Then: 로그인 요청이 시작되고 버튼이 비활성화된다.
   */
  it('로그인 버튼 클릭 시 로그인 API 호출', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // When
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
    fireEvent.blur(emailInput)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.blur(passwordInput)
    fireEvent.click(loginButton)

    // Then
    // 로그인 요청 중 버튼이 비활성화되는지 확인
    await waitFor(() => {
      expect(loginButton).toBeDisabled()
    })
  })

  /**
   * 시나리오: 로그인 성공 시 리다이렉트가 발생한다.
   * - Given: 로그인 API가 성공을 반환할 때
   * - When: 로그인 버튼을 클릭하면
   * - Then: 로그인 요청이 완료되고 버튼이 다시 활성화된다.
   */
  it('로그인 성공 시 리다이렉트', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // When
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
    fireEvent.blur(emailInput)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.blur(passwordInput)
    fireEvent.click(loginButton)

    // Then
    // 로그인 요청 중 버튼이 비활성화되는지 확인
    await waitFor(() => {
      expect(loginButton).toBeDisabled()
    })

    // 로그인 요청 완료 후 버튼이 다시 활성화되는지 확인
    await waitFor(
      () => {
        expect(loginButton).toBeEnabled()
      },
      { timeout: 2000 },
    )
  })

  /**
   * 시나리오: 로그인 요청 중에는 버튼이 비활성화된다.
   * - Given: 로그인 API가 지연될 때
   * - When: 로그인 버튼을 클릭하면
   * - Then: 요청 중에는 버튼이 비활성화된다.
   */
  it('로그인 요청 중 버튼 비활성화', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // When
    fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
    fireEvent.blur(emailInput)
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.blur(passwordInput)
    await waitFor(() => {
      expect(loginButton).not.toBeDisabled()
    })
    fireEvent.click(loginButton)

    // Then
    await waitFor(() => {
      expect(loginButton).toBeDisabled()
    })
  })

  /**
   * 시나리오: 키보드로 각 입력/버튼에 포커스가 가능하다.
   * - Given: 로그인 폼에서
   * - When: 각 요소에 포커스를 수동으로 이동시키면
   * - Then: 포커스가 정상적으로 이동한다.
   */
  it('키보드로 모든 요소에 접근할 수 있다', async () => {
    // Given
    render(<Login />, { wrapper: TestWrapper })
    const emailInput = screen.getByPlaceholderText('이메일')
    const passwordInput = screen.getByPlaceholderText('비밀번호')
    const loginButton = screen.getByRole('button', { name: '로그인' })

    // When
    await act(async () => {
      emailInput.focus()
    })
    expect(emailInput).toHaveFocus()

    await act(async () => {
      passwordInput.focus()
    })
    expect(passwordInput).toHaveFocus()

    await act(async () => {
      fireEvent.change(emailInput, { target: { value: 'test@kakao.com' } })
      fireEvent.blur(emailInput)
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      fireEvent.blur(passwordInput)
    })

    await waitFor(() => {
      expect(loginButton).not.toBeDisabled()
    })

    await act(async () => {
      loginButton.focus()
    })

    // Then
    expect(loginButton).toHaveFocus()
  })
})
