import { describe, beforeEach, it, expect, vi } from "vitest"
import { screen, fireEvent, waitFor } from "@testing-library/react"
import { renderWithProviders } from "@/test-utils/renderWithProviders"
import { toast } from "react-toastify"
import Login from "@/pages/Login"

const navigateMock = vi.fn()
const loginMock = vi.fn()
const useAuthMock = vi.fn()

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>()
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})
vi.mock("@/context/AuthContext", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/context/AuthContext")>()
  return {
    ...actual,
    useAuth: () => useAuthMock(),
  }
})

const email = () => screen.getByPlaceholderText("이메일")
const pw = () => screen.getByPlaceholderText("비밀번호")
const btn = () => screen.getByRole("button", { name: "로그인" })
const type = (el: HTMLElement, v: string) =>
  fireEvent.change(el, { target: { value: v } })

describe("<Login />", () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.spyOn(toast, "error").mockImplementation(() => 0)
    useAuthMock.mockReturnValue({
      login: loginMock,
      isLoggingIn: false,
    })
    renderWithProviders(<Login />)
  })

  it("처음 화면에는 인풋 필드 2개와 비활성화된 버튼이 렌더링된다.", () => {
    expect(email()).toBeInTheDocument()
    expect(pw()).toBeInTheDocument()
    expect(btn()).toBeDisabled()
  })

  it("잘못된 이메일을 입력하고 blur 할 시 에러 메시지가 나온다.", async () => {
    type(email(), "wrong@email")
    fireEvent.blur(email())
    expect(
      await screen.findByText("ID는 이메일 형식으로 입력해주세요.")
    ).toBeInTheDocument()
    expect(btn()).toBeDisabled()
  })

  it("짧은 비밀번호를 입력하고 blur 할 시 길이 관련 에러 메시지가 나온다.", async () => {
    type(pw(), "123")
    fireEvent.blur(pw())
    expect(
      await screen.findByText("PW는 최소 8글자 이상이어야 합니다.")
    ).toBeInTheDocument()
    expect(btn()).toBeDisabled()
  })

  it("두 필드의 입력값이 모두 유효하면 버튼이 활성화된다.", () => {
    type(email(), "user@kakao.com")
    type(pw(), "ValidPw1!")
    expect(btn()).toBeEnabled()
  })

  it("로그인이 성공할 시 navigate('/my') 호출한다.", async () => {
    loginMock.mockResolvedValue(true)
    type(email(), "user@kakao.com")
    type(pw(), "ValidPw1!")
    fireEvent.click(btn())
    await waitFor(() => {
      expect(loginMock).toHaveBeenCalledWith("user@kakao.com", "ValidPw1!")
      expect(navigateMock).toHaveBeenCalledWith("/my", { replace: true })
    })
  })

  it("로그인 실패 시 toast.error를 호출힌다.", async () => {
    loginMock.mockResolvedValue(false)
    type(email(), "user@kakao.com")
    type(pw(), "ValidPw1!")
    fireEvent.click(btn())
    await waitFor(() =>
      expect(toast.error).toHaveBeenCalledWith(
        "@kakao.com 이메일 주소만 가능합니다."
      )
    )
  })

  it("isLoggingIn=true 시 버튼이 disabled 이고 login()이 호출되지 않는다.", () => {
    useAuthMock.mockReturnValueOnce({
      login: loginMock,
      isLoggingIn: true,
    })
    expect(btn()).toBeDisabled()
    fireEvent.click(btn())
    expect(loginMock).not.toHaveBeenCalled()
  })
})
