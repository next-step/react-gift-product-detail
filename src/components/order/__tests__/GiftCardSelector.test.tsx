import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import GiftCardSelector from "@/components/order/GiftCardSelector";
import { ordercard } from "@/data/ordercard";

describe("GiftCardSelector", () => {
  const defaultProps = {
    value: "",
    onChange: vi.fn(),
    error: false,
  };

  it("카드 이미지 렌더링", () => {
    // Given
    render(<GiftCardSelector {...defaultProps} />);

    // Then
    expect(screen.getAllByRole("img").length).toBeGreaterThan(1);
  });

  it("카드 클릭 시 메세지 변경", () => {
    // Given
    const mockOnChange = vi.fn();
    render(<GiftCardSelector {...defaultProps} onChange={mockOnChange} />);
    // When
    const cards = screen.getAllByRole("img");
    fireEvent.click(cards[1]);
    // Then
    expect(mockOnChange).toHaveBeenCalled();
    expect(mockOnChange.mock.calls[0][0].target.value).toBe(ordercard[0].defaultTextMessage);
  });

  it("선택된 카드의 이미지로 표시", () => {
    // Given
    render(<GiftCardSelector {...defaultProps} />);

    // Then
    expect(screen.getByAltText("message-card")).toHaveAttribute(
      "src",
      ordercard[0].imageUrl,
    );
  });

  it("메시지 입력 textarea 렌더링", () => {
    // Given
    render(<GiftCardSelector {...defaultProps} />);
    // Then
    expect(
      screen.getByPlaceholderText("메시지를 입력해주세요."),
    ).toBeInTheDocument();
  });

  it("textarea에 value 제대로 들어가야 함", () => {
    // Given
    render(<GiftCardSelector {...defaultProps} value="테스트 메시지" />);
    // Then
    const textarea = screen.getByPlaceholderText(
      "메시지를 입력해주세요.",
    ) as HTMLTextAreaElement;
    expect(textarea.value).toBe("테스트 메시지");
  });

  it("textarea onChange 호출", () => {
    // Given
    const mockOnChange = vi.fn();
    render(<GiftCardSelector {...defaultProps} onChange={mockOnChange} />);

    // When
    const textarea = screen.getByPlaceholderText("메시지를 입력해주세요.");
    fireEvent.change(textarea, { target: { value: "새 메시지" } });

    // Then
    expect(mockOnChange).toHaveBeenCalled();
  });

  it("error가 true일 때 에러 메시지 표시", () => {
    // Given
    render(<GiftCardSelector {...defaultProps} error={true} />);

    // Then
    expect(screen.getByText("메시지를 입력해주세요.")).toBeInTheDocument();
  });
});
