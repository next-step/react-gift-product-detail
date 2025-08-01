import { screen, fireEvent, waitFor } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import ReceiverForm from "./ReceiverForm"
import { describe, it, expect, vi } from "vitest"
import { FormData } from "@/pages/OrderPage"
import { renderWithTheme } from "./InputForm.test"

vi.mock("@/components/PresentForm/ReceiverModal", () => ({
  default: ({ isOpen, close }: { isOpen: boolean; close: () => void }) =>
    isOpen ? (
      <div data-testid="receiver-modal">
        <button onClick={close}>닫기</button>
      </div>
    ) : null,
}))

function FormWrapper({
  children,
  defaultValues = { receivers: [] },
}: {
  children: React.ReactNode
  defaultValues?: Partial<FormData>
}) {
  const methods = useForm<FormData>({
    defaultValues,
    mode: "onChange",
  })

  return <FormProvider {...methods}>{children}</FormProvider>
}

function renderWithProviders(
  ui: React.ReactElement,
  defaultValues?: Partial<FormData>
) {
  return renderWithTheme(
    <FormWrapper defaultValues={defaultValues}>{ui}</FormWrapper>
  )
}

describe("ReceiverForm", () => {
  it("화면이 정상적으로 렌더링된다", () => {
    renderWithProviders(<ReceiverForm />)

    expect(screen.getByText("받는 사람")).toBeInTheDocument()
    expect(screen.getByText("추가")).toBeInTheDocument()
  })

  it("처음 버튼 이름은 '추가'이다", () => {
    renderWithProviders(<ReceiverForm />)

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("추가")
  })

  it("receivers가 있을 때 버튼 이름이 '수정'으로 변경된다", () => {
    renderWithProviders(<ReceiverForm />, {
      receivers: [{ name: "김춘식", phone: "010-1234-5678", quantity: "10" }],
    })

    const button = screen.getByRole("button")
    expect(button).toHaveTextContent("수정")
  })

  it("AddPlusButton을 눌렀을 때 정상적으로 모달 창이 뜬다", async () => {
    renderWithProviders(<ReceiverForm />)

    const button = screen.getByText("추가")
    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByTestId("receiver-modal")).toBeInTheDocument()
    })
  })

  it("모달의 닫기 버튼을 누르면 모달이 닫힌다", async () => {
    renderWithProviders(<ReceiverForm />)

    const addButton = screen.getByText("추가")
    fireEvent.click(addButton)

    expect(screen.getByTestId("receiver-modal")).toBeInTheDocument()

    const closeButton = screen.getByText("닫기")
    fireEvent.click(closeButton)

    await waitFor(() => {
      expect(screen.queryByTestId("receiver-modal")).not.toBeInTheDocument()
    })
  })

  it("ReceiverList에 receivers 데이터가 전달된다", () => {
    const receivers = [
      { name: "김춘식", phone: "010-1234-5678", quantity: "1" },
      { name: "이라이언", phone: "010-9876-5432", quantity: "1" },
    ]

    renderWithProviders(<ReceiverForm />, { receivers })
    expect(screen.getByText("수정")).toBeInTheDocument()
  })
})
