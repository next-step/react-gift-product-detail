import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import type { FC, PropsWithChildren } from "react";
import Typography from "@/components/common/Typography";

const AllTheProviders: FC<PropsWithChildren> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("Typography 컴포넌트", () => {
  it("children으로 전달된 텍스트를 올바르게 렌더링한다", () => {
    // Given
    const testMessage = "이것은 타이포그래피 테스트입니다.";

    // When
    render(
      <AllTheProviders>
        <Typography>{testMessage}</Typography>
      </AllTheProviders>
    );

    // Then
    const textElement = screen.getByText(testMessage);
    expect(textElement).toBeInTheDocument();
  });
});
