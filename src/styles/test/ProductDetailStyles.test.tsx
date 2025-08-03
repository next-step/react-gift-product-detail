import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as S from "../ProductDetailStyles";
import { renderWithTheme } from "@/test/test-utils";

describe("ProductDetail 스타일 컴포넌트", () => {
  it("OrderButton은 시각적으로 보여야 하고 버튼 역할을 가진다", () => {
    renderWithTheme(<S.OrderButton>주문</S.OrderButton>);
    const button = screen.getByRole("button", { name: "주문" });

    expect(button).toBeVisible();
    expect(button).toHaveAccessibleName("주문");
  });

  it("WishBox는 버튼이며 count 텍스트를 보여준다", () => {
    renderWithTheme(
      <S.WishBox>
        <span className="count">123</span>
      </S.WishBox>
    );
    const count = screen.getByText("123");
    expect(count).toBeVisible();
  });

  it("BrandInfo는 브랜드 이미지와 텍스트를 함께 보여준다", () => {
    renderWithTheme(
      <S.BrandInfo>
        <img src="logo.png" alt="브랜드 로고" />
        <span>카카오</span>
      </S.BrandInfo>
    );

    expect(screen.getByAltText("브랜드 로고")).toBeInTheDocument();
    expect(screen.getByText("카카오")).toBeVisible();
  });

  it("HeartIcon filled true일 때 붉은색 하트로 렌더링된다", () => {
    renderWithTheme(<S.HeartIcon filled />);
    const heart = screen.getByRole("img", { hidden: true });

    expect(heart).toHaveAttribute("fill", "#FF5A5A");
    expect(heart).toHaveAttribute("stroke", "#FF5A5A");
  });

  it("HeartIcon filled false일 때 빈 하트로 렌더링된다", () => {
    renderWithTheme(<S.HeartIcon filled={false} />);
    const heart = screen.getByRole("img", { hidden: true });

    expect(heart).toHaveAttribute("fill", "none");
    expect(heart).toHaveAttribute("stroke", "#999");
  });
});
