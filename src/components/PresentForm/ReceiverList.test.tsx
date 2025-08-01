import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import ReceiverList from "./ReceiverList"
import { renderWithProviders } from "@/test-utils/renderWithProviders"

describe("ReceiverList", () => {
  it("빈 배열이면 안내 문구를 출력한다", () => {
    renderWithProviders(<ReceiverList receivers={[]} />)

    expect(screen.getByText("받는 사람이 없습니다.")).toBeInTheDocument()
    expect(screen.getByText("받는 사람을 추가해 주세요.")).toBeInTheDocument()
  })

  it("receivers 배열을 표 형태로 렌더한다", () => {
    const receivers = [
      { name: "김춘식", phone: "01012345678", quantity: "2" },
      { name: "이라이언", phone: "01087654321", quantity: "3" },
    ]

    render(<ReceiverList receivers={receivers} />)

    expect(
      screen.getByRole("columnheader", { name: "이름" })
    ).toBeInTheDocument()

    receivers.forEach(({ name, phone, quantity }) => {
      expect(screen.getByText(name)).toBeInTheDocument()
      expect(screen.getByText(phone)).toBeInTheDocument()
      expect(screen.getByText(quantity)).toBeInTheDocument()
    })
  })
})
