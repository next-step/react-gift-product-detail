// src/test/utils/renderWithTheme.ts
import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/tokens';
import type { ReactElement } from 'react';

export function renderWithTheme(ui: ReactElement) {
  // return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>  );
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}
