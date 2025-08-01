import '@testing-library/jest-dom';
import { expect } from 'vitest';
import { render } from '@testing-library/react';
import type { RenderOptions, RenderResult } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';
import type { ReactElement, ReactNode } from 'react';
import '@testing-library/jest-dom';

export { expect };

Object.defineProperty(import.meta, 'env', {
  value: {
    ...import.meta.env,
    VITE_BASE_URL: 'http://localhost:3000/api',
  },
});

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult => {
  return render(ui, {
    wrapper: ({ children }: { children?: ReactNode }) => (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    ),
    ...options,
  });
};

declare global {
  var render: typeof customRender;
}

globalThis.render = customRender;
