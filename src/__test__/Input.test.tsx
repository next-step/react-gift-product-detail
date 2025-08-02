import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi, test } from "vitest";
import { Input } from "../components/common/Input";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import { createRef } from "react";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("인풋 컴포넌트 테스트", () => {
  test("placeholder가 올바르게 렌더링되어야 한다.", () => {
    renderWithTheme(<Input placeholder="이름을 입력하세요" />);
    expect(
      screen.getByPlaceholderText("이름을 입력하세요"),
    ).toBeInTheDocument();
  });

  test("사용자가 텍스트를 입력하면 값이 변경되어야 한다.", () => {
    const handleChange = vi.fn();
    renderWithTheme(<Input placeholder="테스트" onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText(
      "테스트",
    ) as HTMLInputElement;
    fireEvent.change(inputElement, { target: { value: "새로운 값" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("ref가 input 엘리먼트로 전달되어야 한다.", () => {
    const ref = createRef<HTMLInputElement>();
    renderWithTheme(<Input placeholder="ref 테스트" ref={ref} />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
