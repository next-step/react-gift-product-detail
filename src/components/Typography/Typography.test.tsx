import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@emotion/react";
import { Typography, type Props } from "./Typography";
import { theme } from "@/styles/theme";

describe("Typography 컴포넌트", () => {
  it("모든 주요 속성이 적용된 Typography가 정상적으로 렌더링된다", () => {
    // given
    const props: Props = {
      as: "h3",
      variant: "subtitle1Bold",
      color: "brand-kakaoYellow",
      width: "300px",
      textAlign: "center",
      children: "통합 테스트",
    };

    const expectedStyle = theme.typography.subtitle.subtitle1Bold;
    const expectedColor = theme.colors.brand["brand-kakaoYellow"];

    // when
    render(
      <ThemeProvider theme={theme}>
        <Typography {...props}>{props.children}</Typography>
      </ThemeProvider>
    );
    const el = screen.getByText(props.children as string);

    // then
    expect(el.tagName.toLowerCase()).toBe("h3");
    expect(el).toHaveStyle({
      fontSize: expectedStyle.fontSize,
      fontWeight: expectedStyle.fontWeight.toString(),
      lineHeight: expectedStyle.lineHeight,
      color: expectedColor,
      width: props.width,
      textAlign: props.textAlign,
    });
  });

  describe("variant 속성", () => {
    it("variant를 지정하지 않으면 기본 body1Regular 폰트 스타일이 적용된다", () => {
      // given
      const expected = theme.typography.body.body1Regular;

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography>Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle(expected);
    });

    it("variant='title1Bold'이면 해당 폰트 스타일이 적용된다", () => {
      // given
      const expected = theme.typography.title.title1Bold;

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography variant="title1Bold">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle(expected);
    });

    it("variant='subtitle1Bold'이면 해당 폰트 스타일이 적용된다", () => {
      // given
      const expected = theme.typography.subtitle.subtitle1Bold;

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography variant="subtitle1Bold">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle(expected);
    });

    it("variant='body1Bold'이면 해당 폰트 스타일이 적용된다", () => {
      // given
      const expected = theme.typography.body.body1Bold;

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography variant="body1Bold">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle(expected);
    });

    it("variant='label1Bold'이면 해당 폰트 스타일이 적용된다", () => {
      // given
      const expected = theme.typography.label.label1Bold;

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography variant="label1Bold">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle(expected);
    });
  });

  describe("color 속성", () => {
    it("color를 지정하지 않으면 기본 text-default 색상이 적용된다", () => {
      // given
      const color = theme.colors.text["text-default"];

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography>Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle({ color });
    });

    it("color='brand-kakaoYellow'이면 해당 브랜드 색상이 적용된다", () => {
      // given
      const color = theme.colors.brand["brand-kakaoYellow"];

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography color="brand-kakaoYellow">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle({ color });
    });

    it("color='text-default'이면 기본 텍스트 색상이 적용된다", () => {
      // given
      const color = theme.colors.text["text-default"];

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography color="text-default">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle({ color });
    });

    it("color='status-critical'이면 상태 색상이 적용된다", () => {
      // given
      const color = theme.colors.status["status-critical"];

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography color="status-critical">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle({ color });
    });

    it("color='border-default'이면 border 색상이 적용된다", () => {
      // given
      const color = theme.colors.border["border-default"];

      // when
      render(
        <ThemeProvider theme={theme}>
          <Typography color="border-default">Test</Typography>
        </ThemeProvider>
      );
      const el = screen.getByText("Test");

      // then
      expect(el).toHaveStyle({ color });
    });
  });
});
