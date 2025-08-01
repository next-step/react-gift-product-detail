// src/test/utils/renderWithProviders.tsx

import { AuthProvider } from '@contexts/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@styles/tokens';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

export function renderWithProviders(ui: React.ReactElement) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000 * 5,
        gcTime: 1000 * 60 * 5,
        retry: false,
        /**
         * @todo 실제로는 retry: 1을 사용중이지만 test 환경에서 suspense를 잘 인식하지 못하는 것 같아 false를 적용했습니다.
         * 에러 커포넌트가 나올 때까지 기다리는게 아닌 로딩 컴포넌트에서 끝나버립니다.
         * 추후 테스트 환경에서 요소를 찾는 방식을 변경하여 retry: 1로 변경할 예정입니다.
         */
      },
      mutations: {
        retry: 0,
      },
    },
  });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <AuthProvider>{ui}</AuthProvider>
          <ToastContainer position="top-center" autoClose={3000} />
        </ThemeProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
}
