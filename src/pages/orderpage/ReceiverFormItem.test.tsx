import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { FormProvider, useForm } from "react-hook-form";
import React, { type FC, type PropsWithChildren, useEffect } from "react"; // useEffect import 추가
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import ReceiverFormItem from "./ReceiverFormItem";
import type { ReceiverFormValues } from "@/utils/validator";

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<{ receivers: ReceiverFormValues[] }>();
  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

const AllTheProvidersWithErrors: FC<PropsWithChildren> = ({ children }) => {
  const methods = useForm<{ receivers: ReceiverFormValues[] }>();

  useEffect(() => {
    methods.setError("receivers.0.name", {
      type: "manual",
      message: "이름은 필수입니다.",
    });
  }, [methods]);

  return (
    <ThemeProvider theme={theme}>
      <FormProvider {...methods}>{children}</FormProvider>
    </ThemeProvider>
  );
};

describe("ReceiverFormItem 컴포넌트", () => {
  const user = userEvent.setup();
  const mockField = {
    id: "test-id-1",
    name: "김선물",
    phoneNumber: "010-1234-5678",
    quantity: 1,
  };
  let mockOnRemove: () => void;

  beforeEach(() => {
    mockOnRemove = vi.fn();
  });

  it("props로 받은 데이터가 올바르게 렌더링되고, 사용자 입력이 반영된다", async () => {
    // Given
    render(
      <AllTheProviders>
        <ReceiverFormItem field={mockField} index={0} onRemove={mockOnRemove} />
      </AllTheProviders>
    );

    const nameInput = screen.getByLabelText("이름");
    const phoneInput = screen.getByLabelText("전화번호");
    const quantityInput = screen.getByLabelText("수량");

    // Then
    expect(nameInput).toHaveValue(mockField.name);
    expect(phoneInput).toHaveValue(mockField.phoneNumber);
    expect(quantityInput).toHaveValue(mockField.quantity);

    // When
    const newName = "이선물";
    await user.clear(nameInput);
    await user.type(nameInput, newName);

    // Then
    expect(nameInput).toHaveValue(newName);
  });

  it("삭제 버튼을 클릭하면 onRemove 함수가 호출된다", async () => {
    // Given
    render(
      <AllTheProviders>
        <ReceiverFormItem field={mockField} index={0} onRemove={mockOnRemove} />
      </AllTheProviders>
    );

    const removeButton = screen.getByRole("button", { name: "삭제" });

    // When
    await user.click(removeButton);

    // Then
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });

  it("errors prop이 전달되면 에러 메시지를 표시한다", async () => {
    // Given
    render(
      <AllTheProvidersWithErrors>
        <ReceiverFormItem
          field={{ ...mockField, name: "" }}
          index={0}
          onRemove={mockOnRemove}
        />
      </AllTheProvidersWithErrors>
    );

    // Then
    const errorMessage = await screen.findByText("이름은 필수입니다.");
    expect(errorMessage).toBeInTheDocument();
  });
});
