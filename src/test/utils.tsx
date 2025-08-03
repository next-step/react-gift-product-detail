import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../styles/theme';

export function customRender(ui: React.ReactElement) {
  const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <ThemeProvider theme={theme}>{children}</ThemeProvider>
  );

  return render(ui, { wrapper: Wrapper });
}
