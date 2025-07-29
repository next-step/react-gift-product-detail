// src/setupTests.ts
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

export const renderWithTheme = (children: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{children}</ThemeProvider>);
};