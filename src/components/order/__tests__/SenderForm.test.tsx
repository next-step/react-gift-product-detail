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
    const testValue = "가나다";
    render(<SenderForm {...defaultProps} value={testValue} />);

    const input = screen.getByPlaceholderText(
      "이름을 입력하세요.",
    ) as HTMLTextAreaElement;
    expect(input.value).toBe(testValue);
  });

  it("onChange 호출", () => {
    const mockOnChange = vi.fn();
    render(<SenderForm {...defaultProps} onChange={mockOnChange} />);

    const input = screen.getByPlaceholderText("이름을 입력하세요.");
    fireEvent.change(input, { target: { value: "테스트" } });

    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });

  it("error가 true일 때 에러 메시지 표시", () => {
    render(<SenderForm {...defaultProps} error={true} />);

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
