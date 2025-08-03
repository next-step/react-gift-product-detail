import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { FormField } from "@/components/order/FormField";
import { renderWithTheme } from "@/test/test-utils";

describe("FormField 컴포넌트", () => {
  it("label과 input을 렌더링한다", () => {
    renderWithTheme(
      <FormField label="이름" htmlFor="name">
        <input id="name" placeholder="이름 입력" />
      </FormField>,
    );

    expect(screen.getByLabelText("이름")).toBeInTheDocument();
  });

  it("에러 메시지를 렌더링한다", () => {
    renderWithTheme(
      <FormField label="이메일" htmlFor="email" error="필수 항목입니다.">
        <input id="email" placeholder="이메일 입력" />      </FormField>,
    );

    expect(screen.getByText("필수 항목입니다.")).toBeInTheDocument();
  });

  it("에러 메시지가 없으면 렌더링되지 않는다", () => {
    renderWithTheme(
      <FormField label="전화번호" htmlFor="phone">
        <input id="phone"  placeholder="전화번호 입력" />
      </FormField>,
    );

    const errorElement = screen.queryByText(/필수 항목/);
    expect(errorElement).not.toBeInTheDocument();
  });
});
