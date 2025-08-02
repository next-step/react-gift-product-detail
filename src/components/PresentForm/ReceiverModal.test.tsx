import { screen, fireEvent, waitFor } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import ReceiverModal from "./ReceiverModal"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { FormData } from "@/pages/OrderPage"
import { renderWithProviders } from "@/test-utils/renderWithProviders"

global.alert = vi.fn()

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

function renderWithFormDefaultProviders(
  ui: React.ReactElement,
  defaultValues?: Partial<FormData>
) {
  return renderWithProviders(
    <FormWrapper defaultValues={defaultValues}>{ui}</FormWrapper>
  )
}

describe("받는 사람 모달창", () => {
  const mockClose = vi.fn()

  beforeEach(() => {
    mockClose.mockClear()
    vi.clearAllMocks()
  })

  describe("기본적인 모달 화면이 잘 렌더링된다.", () => {
    it("isOpen이 true일 때 모달이 렌더링된다", () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      expect(screen.getByText("받는 사람")).toBeInTheDocument()
      expect(
        screen.getByText("* 최대 10명까지 추가할 수 있어요.")
      ).toBeInTheDocument()
      expect(
        screen.getByText("* 받는 사람의 전화번호를 중복으로 입력할 수 없어요.")
      ).toBeInTheDocument()
    })

    it("isOpen이 false일 때 아무것도 렌더링되지 않는다", () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={false} close={mockClose} />
      )

      expect(screen.queryByRole("dialog")).toBeNull()
    })

    it("isOpen이 true일 때 body overflow가 hidden으로 설정되어 보이지 않게 된다.", () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      expect(document.body.style.overflow).toBe("hidden")
    })
  })

  describe("받는 사람 추가", () => {
    it("추가하기 버튼을 클릭하면 새로운 입력 폼이 추가된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      const addButton = screen.getByText("추가하기")
      fireEvent.click(addButton)

      await waitFor(() => {
        expect(screen.getByText("받는 사람 1")).toBeInTheDocument()
        expect(
          screen.getAllByPlaceholderText("이름을 입력하세요.")
        ).toHaveLength(1)
        expect(
          screen.getAllByPlaceholderText("전화번호를 입력하세요.")
        ).toHaveLength(1)
        expect(screen.getAllByPlaceholderText("수량")).toHaveLength(1)
      })
    })

    it("최대 10명까지만 추가할 수 있다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      const addButton = screen.getByText("추가하기")

      for (let i = 0; i < 10; i++) {
        fireEvent.click(addButton)
      }

      await waitFor(() => {
        expect(screen.getByText("받는 사람 10")).toBeInTheDocument()
      })

      fireEvent.click(addButton)

      expect(global.alert).toHaveBeenCalledWith(
        "받는 사람은 최대 10명까지 입력 가능합니다."
      )

      expect(screen.queryByText("받는 사람 11")).not.toBeInTheDocument()
    })

    it("X 버튼을 클릭하면 해당 받는 사람이 삭제된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      const addButton = screen.getByText("추가하기")
      fireEvent.click(addButton)

      await waitFor(() => {
        expect(screen.getByText("받는 사람 1")).toBeInTheDocument()
      })

      const deleteButton = screen.getByText("✕")
      fireEvent.click(deleteButton)

      await waitFor(() => {
        expect(screen.queryByText("받는 사람 1")).not.toBeInTheDocument()
      })
    })
  })

  describe("입력값에 대해 검증하는 과정이 있다.", () => {
    it("이름이 비어있으면 에러 메시지가 표시된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      fireEvent.click(screen.getByText("추가하기"))

      const completeButton = screen.getByText("1명 완료")
      fireEvent.click(completeButton)

      await waitFor(() => {
        expect(screen.getByText("이름을 입력해 주세요.")).toBeInTheDocument()
      })
    })

    it("전화번호가 비어있으면 에러 메시지가 표시된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      fireEvent.click(screen.getByText("추가하기"))

      const nameInput = screen.getByPlaceholderText("이름을 입력하세요.")
      fireEvent.change(nameInput, { target: { value: "김춘식" } })

      const completeButton = screen.getByText("1명 완료")
      fireEvent.click(completeButton)

      await waitFor(() => {
        expect(
          screen.getByText("전화번호를 입력해 주세요.")
        ).toBeInTheDocument()
      })
    })

    it("올바르지 않은 전화번호 형식이면 에러 메시지가 표시된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      fireEvent.click(screen.getByText("추가하기"))

      const phoneInput = screen.getByPlaceholderText("전화번호를 입력하세요.")
      fireEvent.change(phoneInput, { target: { value: "123456" } })

      const completeButton = screen.getByText("1명 완료")
      fireEvent.click(completeButton)

      await waitFor(() => {
        expect(
          screen.getByText("올바른 전화번호 형식이 아닙니다.")
        ).toBeInTheDocument()
      })
    })

    it("중복된 전화번호가 있으면 에러 메시지가 표시된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      fireEvent.click(screen.getByText("추가하기"))
      const nameInput1 = screen.getAllByPlaceholderText("이름을 입력하세요.")[0]
      const phoneInput1 =
        screen.getAllByPlaceholderText("전화번호를 입력하세요.")[0]

      fireEvent.change(nameInput1, { target: { value: "김춘식" } })
      fireEvent.change(phoneInput1, { target: { value: "01012345678" } })

      fireEvent.click(screen.getByText("추가하기"))
      const nameInput2 = screen.getAllByPlaceholderText("이름을 입력하세요.")[1]
      const phoneInput2 =
        screen.getAllByPlaceholderText("전화번호를 입력하세요.")[1]

      fireEvent.change(nameInput2, { target: { value: "이라이언" } })
      fireEvent.change(phoneInput2, { target: { value: "01012345678" } })

      const completeButton = screen.getByText("2명 완료")
      fireEvent.click(completeButton)

      await waitFor(() => {
        const errorMessages = screen.getAllByText("중복된 전화번호가 있습니다.")
        expect(errorMessages).toHaveLength(2)
      })
    })

    it("수량이 1 미만이면 에러 메시지가 표시된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      fireEvent.click(screen.getByText("추가하기"))

      const quantityInput = screen.getByPlaceholderText("수량")
      fireEvent.change(quantityInput, { target: { value: "0" } })

      const completeButton = screen.getByText("1명 완료")
      fireEvent.click(completeButton)

      await waitFor(() => {
        expect(
          screen.getByText("수량은 1개 이상이어야 합니다.")
        ).toBeInTheDocument()
      })
    })
  })

  describe("모달 액션", () => {
    it("취소 버튼을 클릭하면 모달이 닫힌다", () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      const cancelButton = screen.getByText("취소")
      fireEvent.click(cancelButton)

      expect(mockClose).toHaveBeenCalled()
    })

    it("모든 검증을 통과하면 완료 버튼 클릭 시 모달이 닫힌다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      fireEvent.click(screen.getByText("추가하기"))

      const nameInput = screen.getByPlaceholderText("이름을 입력하세요.")
      const phoneInput = screen.getByPlaceholderText("전화번호를 입력하세요.")
      const quantityInput = screen.getByPlaceholderText("수량")

      fireEvent.change(nameInput, { target: { value: "김춘식" } })
      fireEvent.change(phoneInput, { target: { value: "01012345678" } })
      fireEvent.change(quantityInput, { target: { value: "2" } })

      const completeButton = screen.getByText("1명 완료")
      fireEvent.click(completeButton)

      await waitFor(() => {
        expect(mockClose).toHaveBeenCalled()
      })
    })

    it("완료 버튼의 텍스트가 받는 사람 수에 따라 변경된다", async () => {
      renderWithFormDefaultProviders(
        <ReceiverModal isOpen={true} close={mockClose} />
      )

      expect(screen.getByText("0명 완료")).toBeInTheDocument()

      fireEvent.click(screen.getByText("추가하기"))
      await waitFor(() => {
        expect(screen.getByText("1명 완료")).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText("추가하기"))
      await waitFor(() => {
        expect(screen.getByText("2명 완료")).toBeInTheDocument()
      })
    })
  })
})
