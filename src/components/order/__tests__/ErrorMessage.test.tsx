import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ErrorMessage from "@/components/order/ErrorMessage";

describe("ErrorMessage", () => {
  it("에러 메시지 올바르게 표시", () => {
    const testCases = [
      "이름을 입력해주세요.",
      "전화번호 형식이 올바르지 않습니다.",
      "수량은 1개 이상이어야 합니다.",
      "올바른 이메일 주소를 입력해주세요.",
    ];

    testCases.forEach((message) => {
      const { unmount } = render(<ErrorMessage>{message}</ErrorMessage>);
      expect(screen.getByText(message)).toBeInTheDocument();
      unmount();
    });
  });
});
