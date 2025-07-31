import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GiftCardSelector from "@/components/order/GiftCardSelector";

describe("GiftCardSelector", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    error: false,
  };

  it("카드 이미지 렌더링", () => {
    render(<GiftCardSelector {...defaultProps} />);
    expect(screen.getAllByRole("img").length).toBeGreaterThan(1);
  });

  it("카드 클릭 시 메세지 변경", () => {
    const mockOnChange = vi.fn();
    render(<GiftCardSelector {...defaultProps} onChange={mockOnChange} />);
    const cards = screen.getAllByRole("img");
    fireEvent.click(cards[1]);
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0].target.value).toBe("기본 메시지 2");
  });

  it("선택된 카드의 이미지로 표시", () => {
    render(<GiftCardSelector {...defaultProps} />);
    expect(screen.getByAltText("message-card")).toHaveAttribute(
      "src",
      "image1.png",
    );
  });

  it("메시지 입력 textarea 렌더링", () => {
    render(<GiftCardSelector {...defaultProps} />);
    expect(
      screen.getByPlaceholderText("메시지를 입력해주세요."),
    ).toBeInTheDocument();
  });

  it("textarea에 value 제대로 들어가야 함", () => {
    render(<GiftCardSelector {...defaultProps} value="테스트 메시지" />);
    const textarea = screen.getByPlaceholderText(
      "메시지를 입력해주세요.",
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("테스트 메시지");
  });

  it("textarea onChange 호출", () => {
    const mockOnChange = vi.fn();
    render(<GiftCardSelector {...defaultProps} onChange={mockOnChange} />);
    const textarea = screen.getByPlaceholderText("메시지를 입력해주세요.");
    fireEvent.change(textarea, { target: { value: "새 메시지" } });
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("error가 true일 때 에러 메시지 표시", () => {
    render(<GiftCardSelector {...defaultProps} error={true} />);
    expect(screen.getByText("메시지를 입력해주세요.")).toBeInTheDocument();
  });
});
