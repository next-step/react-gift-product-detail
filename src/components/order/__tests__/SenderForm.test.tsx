import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SenderForm from "@/components/order/SenderForm";

describe("SenderForm", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    error: false,
  };

  it("value 전달", () => {
    // Given: value에 "가나다"가 전달된 경우
    const testValue = "가나다";
    render(<SenderForm {...defaultProps} value={testValue} />);

    // Then: 해당 값이 textarea에 표시되어야 함
    const input = screen.getByPlaceholderText(
      "이름을 입력하세요.",
    ) as HTMLTextAreaElement;
    expect(input.value).toBe(testValue);
  });

  it("onChange 호출", () => {
    // Given: mock onChange 핸들러
    const mockOnChange = vi.fn();
    render(<SenderForm {...defaultProps} onChange={mockOnChange} />);

    // When: 사용자가 textarea에 값을 입력하면
    const input = screen.getByPlaceholderText("이름을 입력하세요.");
    fireEvent.change(input, { target: { value: "테스트" } });

    // Then: onChange가 한 번 호출되어야 함
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("error가 true일 때 에러 메시지 표시", () => {
    // Given: error가 true인 경우
    render(<SenderForm {...defaultProps} error={true} />);

    // Then: 에러 메세지 표시되어야 함
    expect(
      screen.getByText("보내는 사람 이름을 입력해주세요."),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(
        "* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.",
      ),
    ).not.toBeInTheDocument();
  });
});
