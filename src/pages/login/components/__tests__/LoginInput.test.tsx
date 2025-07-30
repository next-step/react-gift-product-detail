import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginInput from "../LoginInput";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("LoginInput", () => {
  it("렌더링 테스트", () => {
    renderWithTheme(
      <LoginInput
        type="email"
        placeholder="이메일"
        value="test@example.com"
        onChange={() => {}}
      />,
    );

    const input = screen.getByPlaceholderText("이메일") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("test@example.com");
  });

  it("입력 이벤트 테스트", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <LoginInput
        type="text"
        placeholder="이름"
        value=""
        onChange={handleChange}
      />,
    );

    const input = screen.getByPlaceholderText("이름");
    fireEvent.change(input, { target: { value: "홍길동" } });

    expect(handleChange).toHaveBeenCalled();
  });

  it("블러 이벤트 테스트", () => {
    const handleBlur = vi.fn();
    renderWithTheme(
      <LoginInput
        type="text"
        placeholder="이름"
        value=""
        onChange={() => {}}
        onBlur={handleBlur}
      />,
    );

    const input = screen.getByPlaceholderText("이름");
    fireEvent.blur(input);

    expect(handleBlur).toHaveBeenCalled();
  });

  it("에러 렌더링 테스트", () => {
    renderWithTheme(
      <LoginInput
        type="text"
        placeholder="이메일"
        value=""
        onChange={() => {}}
        error="이메일 형식이 올바르지 않습니다"
      />,
    );

    expect(
      screen.getByText("이메일 형식이 올바르지 않습니다"),
    ).toBeInTheDocument();
  });
});
