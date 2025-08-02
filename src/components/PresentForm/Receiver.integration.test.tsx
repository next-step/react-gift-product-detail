import { screen, fireEvent, waitFor, within } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { renderWithProviders } from "@/test-utils/renderWithProviders"
import OrderPage from "@/pages/OrderPage"

describe("OrderPage에서 모달창 플로우가 정상적으로 작동한다.", () => {
  it("모달에서 수신자를 추가하면 ReceiverList에 나타난다", async () => {
    renderWithProviders(<OrderPage />, {
      route: "/order/11526198",
      path: "/order/:productId",
    })

    const addBtn = await screen.findByRole("button", { name: /추가|수정/ })
    fireEvent.click(addBtn)

    const modal = await screen.findByRole("dialog", { name: "받는 사람" })
    const wModal = within(modal)

    fireEvent.click(wModal.getByText("추가하기"))

    const [nameInput] = wModal.getAllByPlaceholderText("이름을 입력하세요.")
    const [phoneInput] =
      wModal.getAllByPlaceholderText("전화번호를 입력하세요.")
    const [qtyInput] = wModal.getAllByPlaceholderText("수량")

    fireEvent.change(nameInput, { target: { value: "김춘식" } })
    fireEvent.change(phoneInput, { target: { value: "01012345678" } })
    fireEvent.change(qtyInput, { target: { value: "2" } })

    fireEvent.click(wModal.getByText("1명 완료"))

    await waitFor(() => {
      expect(screen.getByText("김춘식")).toBeInTheDocument()
      expect(screen.getByText("01012345678")).toBeInTheDocument()
      expect(screen.getByText("2")).toBeInTheDocument()
    })
  })
})
