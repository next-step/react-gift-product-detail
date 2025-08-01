import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import InputForm from "./InputForm"
import { ThemeProvider } from "@emotion/react"
import theme from "@/styles/theme"

export function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>)
}

describe("InputForm 컴포넌트 기본 렌더링", () => {
  it("placeholder, name, width, height가 올바르게 적용된다", () => {
    renderWithTheme(
      <InputForm
        width="120px"
        height="30px"
        name="test"
        placeholder="테스트용 플레이스홀더"
        description="테스트용 설명"
      />
    )

    const input = screen.getByPlaceholderText("테스트용 플레이스홀더")
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute("name", "test")
    expect(input).toHaveStyle({ width: "120px", height: "30px" })
    expect(screen.getByText("테스트용 설명")).toBeInTheDocument()
  })

  it("message prop이 있으면 에러 메시지만 보여주고 description은 숨긴다", () => {
    renderWithTheme(
      <InputForm
        width="120px"
        height="30px"
        name="test"
        placeholder="테스트용 플레이스홀더"
        message="에러 발생"
        description="테스트용 설명"
      />
    )
    expect(screen.getByText("에러 발생")).toBeInTheDocument()
    expect(screen.queryByText("테스트용 설명")).toBeNull()
  })

  it("onBlur 콜백을 호출한다", () => {
    const handleBlur = vi.fn()
    renderWithTheme(
      <InputForm
        width="100px"
        height="20px"
        name="test"
        placeholder="블러 테스트용 플레이스홀더"
        onBlur={handleBlur}
      />
    )
    const input = screen.getByPlaceholderText("블러 테스트용 플레이스홀더")
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledOnce()
  })
})
