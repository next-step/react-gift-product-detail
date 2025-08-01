import { render } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import theme from '@/styles/theme';
import { UserInfoProvider } from '@/contexts/UserInfoContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();
const renderWithProviders = (ui: React.ReactElement, options = {}) =>
  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <UserInfoProvider>{ui}</UserInfoProvider>
      </ThemeProvider>
    </QueryClientProvider>,
    options
  );

export * from '@testing-library/react';
export { renderWithProviders as render };
