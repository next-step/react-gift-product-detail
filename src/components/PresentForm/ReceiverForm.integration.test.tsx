import { screen, fireEvent, waitFor } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import ReceiverForm from "./ReceiverForm"
import { describe, it, expect } from "vitest"
import { FormData, Receiver } from "@/pages/OrderPage"
import { renderWithProviders } from "@/test-utils/renderWithProviders"

type TestFormData = FormData & { productPrice: number }

interface OrderPageWrapperProps {
  children: React.ReactNode
  initialReceivers?: Receiver[]
}

function OrderPageWrapper({
  children,
  initialReceivers = [],
}: OrderPageWrapperProps) {
  const methods = useForm<TestFormData>({
    defaultValues: {
      receivers: initialReceivers,
      productPrice: 34_500,
    },
    mode: "onChange",
  })
  const receivers = methods.watch("receivers")
  const totalQuantity = receivers.reduce((sum, receiver) => {
    return sum + (Number(receiver.quantity) || 0)
  }, 0)
  const totalPrice = totalQuantity * 34500

  return (
    <FormProvider {...methods}>
      <div>
        {children}
        <div data-testid="price-section">
          <span data-testid="total-price">
            {totalPrice.toLocaleString()}원 주문하기
          </span>
        </div>
      </div>
    </FormProvider>
  )
}

describe("ReceiverForm - 수량 합계를 통해 가격을 계산하고 표시할 수 있다.", () => {
  it("모달에서 받는 사람 추가 시 가격이 업데이트된다", async () => {
    renderWithProviders(
      <OrderPageWrapper>
        <ReceiverForm />
      </OrderPageWrapper>
    )

    expect(screen.getByTestId("total-price")).toHaveTextContent("0원")

    fireEvent.click(screen.getByText("추가"))

    await waitFor(() => {
      expect(screen.getAllByText("받는 사람")).toHaveLength(2)
    })

    fireEvent.click(screen.getByText("추가하기"))

    const nameInputs = screen.getAllByPlaceholderText("이름을 입력하세요.")
    const phoneInputs = screen.getAllByPlaceholderText("전화번호를 입력하세요.")
    const quantityInputs = screen.getAllByPlaceholderText("수량")

    fireEvent.change(nameInputs[0], { target: { value: "김춘식" } })
    fireEvent.change(phoneInputs[0], { target: { value: "01012345678" } })
    fireEvent.change(quantityInputs[0], { target: { value: "2" } })

    fireEvent.click(screen.getByText("추가하기"))

    await waitFor(() => {
      expect(screen.getAllByPlaceholderText("이름을 입력하세요.")).toHaveLength(
        2
      )
    })

    const updatedNameInputs =
      screen.getAllByPlaceholderText("이름을 입력하세요.")
    const updatedPhoneInputs =
      screen.getAllByPlaceholderText("전화번호를 입력하세요.")
    const updatedQuantityInputs = screen.getAllByPlaceholderText("수량")

    fireEvent.change(updatedNameInputs[1], { target: { value: "이라이언" } })
    fireEvent.change(updatedPhoneInputs[1], {
      target: { value: "01087654321" },
    })
    fireEvent.change(updatedQuantityInputs[1], { target: { value: "3" } })

    fireEvent.click(screen.getByText("2명 완료"))

    await waitFor(() => {
      expect(screen.getByTestId("total-price")).toHaveTextContent("172,500원")
    })
  })

  it("수량을 변경하면 실시간으로 가격이 업데이트된다", async () => {
    const initialReceivers = [
      { name: "김춘식", phone: "01012345678", quantity: "1" },
    ]

    renderWithProviders(
      <OrderPageWrapper initialReceivers={initialReceivers}>
        <ReceiverForm />
      </OrderPageWrapper>
    )

    expect(screen.getByTestId("total-price")).toHaveTextContent("34,500원")

    fireEvent.click(screen.getByText("수정"))

    const quantityInput = screen.getByPlaceholderText("수량")
    fireEvent.change(quantityInput, { target: { value: "5" } })

    fireEvent.click(screen.getByText("1명 완료"))

    await waitFor(() => {
      expect(screen.getByTestId("total-price")).toHaveTextContent("172,500원")
    })
  })
})
