import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorField from "@/components/order/ErrorField";

describe("ErrorField", () => {
  it("error가 없을 때 null 반환", () => {
    const { container } = render(<ErrorField />);
    expect(container.firstChild).toBeNull();
  });

  it("error.message가 없을 때 null 반환", () => {
    const { container } = render(<ErrorField error={{}} />);
    expect(container.firstChild).toBeNull();
  });

  it("에러 메시지가 올바르게 표시", () => {
    const testCases = [
      "이름을 입력해주세요.",
      "전화번호 형식이 올바르지 않습니다.",
      "수량은 1개 이상이어야 합니다.",
    ];

    testCases.forEach((message) => {
      const { unmount } = render(<ErrorField error={{ message }} />);
      expect(screen.getByText(message)).toBeInTheDocument();
      unmount();
    });
  });
});
