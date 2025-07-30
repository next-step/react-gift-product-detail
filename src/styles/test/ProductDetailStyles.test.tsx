import { screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import * as S from "../ProductDetailStyles";
import { renderWithTheme } from "@/test/test-utils";
import { theme } from "@/styles/theme/theme";

describe("ProductDetail 스타일 컴포넌트", () => {
  it("OrderButton 스타일이 theme 기반으로 렌더링된다", () => {
    renderWithTheme(<S.OrderButton>주문</S.OrderButton>);
    const button = screen.getByText("주문");
    expect(button).toHaveStyle({
      backgroundColor: theme.colors.kakaoYellow,
      color: theme.colors.textDefault,
      fontSize: theme.typography.body1Bold.fontSize,
      fontWeight: String(theme.typography.body1Bold.fontWeight),
    });
  });

  it("WishBox 내부 count가 title1Regular 스타일을 따른다", () => {
    renderWithTheme(
      <S.WishBox>
        <span className="count">123</span>
      </S.WishBox>,
    );
    const count = screen.getByText("123");
    expect(count).toHaveStyle({
      fontSize: theme.typography.title1Regular,
      color: theme.colors.textDefault,
    });
  });

  it("BrandInfo 안의 span 스타일과 img 사이즈가 정상이다", () => {
    renderWithTheme(
      <S.BrandInfo>
        <img src="logo.png" alt="brand" />
        <span>카카오</span>
      </S.BrandInfo>,
    );

    const img = screen.getByAltText("brand");
    const text = screen.getByText("카카오");

    expect(img).toHaveStyle({
      width: "35px",
      height: "35px",
      borderRadius: "50%",
    });

    expect(text).toHaveStyle({
      fontSize: theme.typography.subtitle1Regular,
      color: theme.colors.gray1000,
    });
  });

  it("HeartIcon filled true일 때 색상이 FF5A5A로 채워진다", () => {
    renderWithTheme(<S.HeartIcon filled />);
    const heart = screen.getByRole("img", { hidden: true });
    expect(heart).toHaveAttribute("fill", "#FF5A5A");
    expect(heart).toHaveAttribute("stroke", "#FF5A5A");
  });

  it("HeartIcon filled false일 때 색상이 none / #999로 설정된다", () => {
    renderWithTheme(<S.HeartIcon filled={false} />);
    const heart = screen.getByRole("img", { hidden: true });
    expect(heart).toHaveAttribute("fill", "none");
    expect(heart).toHaveAttribute("stroke", "#999");
  });
});
