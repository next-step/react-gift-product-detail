// test-utils.tsx
import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { MemoryRouter, MemoryRouterProps } from 'react-router-dom';
import { theme } from '@/styles/theme';

interface CustomRenderOptions extends Omit<RenderOptions, 'queries'> {
  queryClientOptions?: Partial<ConstructorParameters<typeof QueryClient>[0]>;
  routerProps?: MemoryRouterProps;
}

/**
 * 공통 프로바이더로 감싸서 렌더링해 주는 헬퍼.
 * @param ui 테스트할 React 요소
 * @param options react-query, 라우터 등을 커스터마이징하는 옵션
 */
export function renderWithProviders(
  ui: ReactElement,
  {
    queryClientOptions,
    routerProps,
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      ...queryClientOptions?.defaultOptions,
    },
    ...queryClientOptions,
  });

  const wrapper = ({ children }: { children?: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter {...routerProps}>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );

  return render(ui, { wrapper, ...renderOptions });
}
