import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/index";
import RankingSection from "@/pages/Home/components/RankingSection/RankingSection";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("Typography 테스트", () => {
  test("theme 객체의 typography 속성이 올바르게 정의되어 있다", () => {
    expect(theme.typography).toBeDefined();
    expect(theme.typography.title1Bold).toBeDefined();
    expect(theme.typography.title1Regular).toBeDefined();
    expect(theme.typography.body1Bold).toBeDefined();
    expect(theme.typography.body1Regular).toBeDefined();
  });

  test("title1Bold typography 스타일이 올바르게 정의되어 있다", () => {
    expect(theme.typography.title1Bold.fontSize).toBe("1.25rem");
    expect(theme.typography.title1Bold.fontWeight).toBe(700);
    expect(theme.typography.title1Bold.lineHeight).toBe("1.6875rem");
  });

  test("body1Regular typography 스타일이 올바르게 정의되어 있다", () => {
    expect(theme.typography.body1Regular.fontSize).toBe("1rem");
    expect(theme.typography.body1Regular.fontWeight).toBe(400);
    expect(theme.typography.body1Regular.lineHeight).toBe("1.375rem");
  });

  test("모든 typography 변형이 올바르게 정의되어 있다", () => {
    const typographyKeys = [
      "title1Bold",
      "title1Regular",
      "title2Bold",
      "title2Regular",
      "subtitle1Bold",
      "subtitle1Regular",
      "subtitle2Bold",
      "subtitle2Regular",
      "body1Bold",
      "body1Regular",
      "body2Bold",
      "body2Regular",
      "label1Bold",
      "label1Regular",
      "label2Bold",
      "label2Regular",
    ];

    typographyKeys.forEach((key) => {
      const style = (theme.typography as any)[key];
      expect(style).toBeDefined();
      expect(style.fontSize).toBeDefined();
      expect(style.fontWeight).toBeDefined();
      expect(style.lineHeight).toBeDefined();
    });
  });

  test("RankingSection 컴포넌트가 올바른 typography를 사용한다", async () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    const title = screen.getByText("실시간 급상승 선물랭킹");
    expect(title).toBeInTheDocument();

    const computedStyle = window.getComputedStyle(title);

    expect(computedStyle.fontSize).toBeDefined();
    expect(computedStyle.fontWeight).toBeDefined();
  });

  test("Typography 스타일이 일관성 있게 적용된다", () => {
    Object.values(theme.typography).forEach((style) => {
      expect(style).toHaveProperty("fontSize");
      expect(style).toHaveProperty("fontWeight");
      expect(style).toHaveProperty("lineHeight");

      expect(typeof style.fontSize).toBe("string");
      expect(style.fontSize.includes("rem")).toBe(true);

      expect(typeof style.fontWeight).toBe("number");

      expect(typeof style.lineHeight).toBe("string");
    });
  });

  test("Typography 크기 순서가 올바르다", () => {
    const fontSizeOrder = [
      "title1Bold",
      "title1Regular",
      "title2Bold",
      "title2Regular",
      "subtitle1Bold",
      "subtitle1Regular",
      "subtitle2Bold",
      "subtitle2Regular",
      "body1Bold",
      "body1Regular",
      "body2Bold",
      "body2Regular",
      "label1Bold",
      "label1Regular",
      "label2Bold",
      "label2Regular",
    ];

    const fontSizeValues = fontSizeOrder.map((key) =>
      parseFloat((theme.typography as any)[key].fontSize.replace("rem", ""))
    );

    expect(fontSizeValues[0]).toBeGreaterThan(
      fontSizeValues[fontSizeValues.length - 1]
    );
  });

  test("Bold와 Regular 변형이 올바르게 구분된다", () => {
    Object.entries(theme.typography).forEach(([key, style]) => {
      if (key.includes("Bold")) {
        expect(style.fontWeight).toBe(700);
      } else if (key.includes("Regular")) {
        expect(style.fontWeight).toBe(400);
      }
    });
  });
});
