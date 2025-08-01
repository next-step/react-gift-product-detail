import { screen, fireEvent, waitFor } from "@testing-library/react"
import { FormProvider, useForm } from "react-hook-form"
import PresentGiverForm from "./PresentGiverForm"
import { describe, it, expect } from "vitest"
import { FormData } from "@/pages/OrderPage"
import { renderWithTheme } from "./InputForm.test"

function FormWrapper({ children }: { children: React.ReactNode }) {
  const methods = useForm<FormData>({
    defaultValues: { senderName: "" },
    mode: "onChange",
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(() => {})}>{children}</form>
    </FormProvider>
  )
}

function renderWithProviders(ui: React.ReactElement) {
  return renderWithTheme(<FormWrapper>{ui}</FormWrapper>)
}

describe("PresentGiverForm", () => {
  it("placeholder와 설명이 정상적으로 렌더링된다", () => {
    renderWithProviders(<PresentGiverForm />)

    expect(
      screen.getByPlaceholderText("이름을 입력하세요.")
    ).toBeInTheDocument()
    expect(
      screen.getByText(
        "* 실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다."
      )
    ).toBeInTheDocument()
  })

  it("값이 비어 있으면 제출 시 에러 메시지가 나온다", async () => {
    renderWithProviders(<PresentGiverForm />)

    const form = document.querySelector("form")
    if (form) {
      fireEvent.submit(form)
    }

    await waitFor(() => {
      expect(screen.getByText("이름을 입력해주세요.")).toBeInTheDocument()
    })
  })

  it("입력 후 blur 하면 value 가 정상적으로 반영된다", async () => {
    renderWithProviders(<PresentGiverForm />)

    const input = screen.getByPlaceholderText(
      "이름을 입력하세요."
    ) as HTMLInputElement

    fireEvent.change(input, { target: { value: "김춘식" } })
    fireEvent.blur(input)

    await waitFor(() => {
      expect(input.value).toBe("김춘식")
    })
  })
})
