import type { ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/Theme';
import { LoginProvider } from '@/contexts/LoginProvider';

// QueryClient 설정
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  });

// 커스텀 렌더 함수
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  route?: string;
}

const customRender = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { route: _ = '/', ...renderOptions } = options;
  
  const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
    const queryClient = createTestQueryClient();
    
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <LoginProvider>
            <BrowserRouter>
              {children}
            </BrowserRouter>
          </LoginProvider>
        </ThemeProvider>
      </QueryClientProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// 재내보내기
export {
  screen,
  waitFor,
  fireEvent,
  within,
  waitForElementToBeRemoved,
  findByText,
  findByRole,
  findByTestId,
  queryByText,
  queryByRole,
  queryByTestId,
  getByText,
  getByRole,
  getByTestId,
  getAllByText,
  getAllByRole,
  getAllByTestId,
  act,
  cleanup,
  renderHook,
} from '@testing-library/react';
export { customRender as render }; 