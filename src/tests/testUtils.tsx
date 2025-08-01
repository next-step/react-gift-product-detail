import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import type { ReactNode } from 'react';

export const renderCustom = (ui: ReactNode) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};
