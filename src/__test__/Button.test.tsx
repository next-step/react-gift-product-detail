import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, vi, test } from "vitest";
import { Button } from "../components/common/Button";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("버튼 컴포넌트 테스트", () => {
  test("버튼 텍스트를 올바르게 렌더링해야 한다.", () => {
    renderWithTheme(
      <Button variant="primary" size="medium" width="auto">
        버튼텍스트
      </Button>,
    );

    expect(
      screen.getByRole("button", { name: "버튼텍스트" }),
    ).toBeInTheDocument();
  });

  test("버튼 클릭 시 onClick 핸들러가 호출되어야 한다.", () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button
        variant="primary"
        size="medium"
        width="auto"
        onClick={handleClick}
      >
        클릭
      </Button>,
    );

    const buttonElement = screen.getByRole("button", { name: "클릭" });
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("disabled 상태일 때 버튼이 비활성화되고 클릭되지 않아야 한다.", () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button
        variant="primary"
        size="medium"
        width="auto"
        onClick={handleClick}
        disabled
      >
        비활성 버튼
      </Button>,
    );

    const buttonElement = screen.getByRole("button", { name: "비활성 버튼" });
    expect(buttonElement).toBeDisabled();

    fireEvent.click(buttonElement);
    expect(handleClick).not.toHaveBeenCalled();
  });
});
