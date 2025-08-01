import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';

const renderWithTheme = (ui: React.ReactElement, options = {}) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

export * from '@testing-library/react';
export { renderWithTheme as render };
