import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import OrderButton from "../OrderButton";
import { renderWithTheme } from "@/test/test-utils";
import { theme } from "@/styles/theme/theme";

describe("OrderButton", () => {
  it("주문 금액이 형식에 맞게 렌더링된다", () => {
    renderWithTheme(<OrderButton amount={10000} />);
    expect(screen.getByRole("button")).toHaveTextContent("10,000원 주문하기");
  });

  it("클릭 이벤트가 호출된다", () => {
    const handleClick = vi.fn();
    renderWithTheme(<OrderButton amount={5000} onClick={handleClick} />);
    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalled();
  });

  it("버튼 type이 submit으로 설정될 수 있다", () => {
    renderWithTheme(<OrderButton amount={5000} type="submit" />);
    expect(screen.getByRole("button")).toHaveAttribute("type", "submit");
  });

  it("size가 large일 때 스타일이 적용된다", () => {
    renderWithTheme(<OrderButton amount={1000} size="large" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      fontSize: "16px",
      padding: "14px",
    });
  });

  it("size가 small일 때 스타일이 적용된다", () => {
    renderWithTheme(<OrderButton amount={1000} size="small" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      fontSize: "14px",
      padding: "8px 12px",
    });
  });

  it("theme 색상이 정상적으로 적용된다", () => {
    renderWithTheme(<OrderButton amount={5000} color="red500" />);
    const button = screen.getByRole("button");
    expect(button).toHaveStyle({
      backgroundColor: theme.colors.red500,
    });
  });

  it("amount가 NaN이면 0원으로 출력된다", () => {
    renderWithTheme(<OrderButton amount={NaN} />);
    expect(screen.getByText("0원 주문하기")).toBeInTheDocument();
  });
});
