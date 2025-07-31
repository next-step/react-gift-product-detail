import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { theme } from "@/styles/theme";
import { ThemeProvider } from "@emotion/react";
import type { TypographyProps } from "../Typography";
import type { JSX } from "react";

export const renderComponent = async <
  T extends keyof JSX.IntrinsicElements = "span",
>(
  props: Partial<TypographyProps<T>> = {},
) => {
  const mod = await import("../Typography");
  const Typography = mod.Typography;

  const {
    typo = "body1Regular",
    children = "테스트 텍스트",
    ...restProps
  } = props;

  return render(
    <ThemeProvider theme={theme}>
      <Typography typo={typo} {...restProps}>
        {children}
      </Typography>
    </ThemeProvider>,
  );
};

describe("Typography", () => {
  it("기본 태그 렌더링 테스트", async () => {
    await renderComponent({ children: "Hello" });
    const el = screen.getByText("Hello");
    expect(el.tagName.toLowerCase()).toBe("span");
  });

  it("h1 렌더링 테스트", async () => {
    await renderComponent({
      as: "h1",
      typo: "title1Bold",
      children: "Heading",
    });
    const el = screen.getByText("Heading");
    expect(el.tagName.toLowerCase()).toBe("h1");
  });

  it("전달된 typo에 맞는 스타일이 적용", async () => {
    const typoStyle = theme.typography.title1Bold;
    await renderComponent({
      typo: "title1Bold",
      children: "Styled Text",
    });
    const el = screen.getByText("Styled Text");

    expect(el).toHaveStyle({
      fontSize: typoStyle.fontSize,
      fontWeight: `${typoStyle.fontWeight}`,
      lineHeight: typoStyle.lineHeight,
    });
  });

  it("기본 색상은 테스트", async () => {
    const color = theme.colors.semantic.text.default;
    await renderComponent({ children: "Color" });
    const el = screen.getByText("Color");

    expect(el).toHaveStyle({ color });
  });

  it("color='brand.kakao.yellow' - 특정 색상 테스트", async () => {
    const color = theme.colors.brand.kakao.yellow;
    await renderComponent({
      color: "brand.kakao.yellow",
      children: "Kakao",
    });
    const el = screen.getByText("Kakao");

    expect(el).toHaveStyle({ color });
  });

  it("존재하지 않는 색상 키 적용 테스트", async () => {
    await renderComponent({
      color: "brand.kakao.wrong" as unknown as TypographyProps["color"],
      children: "Wrong Color",
    });
    const el = screen.getByText("Wrong Color");

    expect(el).toHaveStyle({ color: theme.colors.semantic.text.default });
  });

  it("기타 props 적용 테스트", async () => {
    await renderComponent({
      children: "Centered",
      style: { textAlign: "center" },
    });
    const el = screen.getByText("Centered");

    expect(el).toHaveStyle({ textAlign: "center" });
  });
});
