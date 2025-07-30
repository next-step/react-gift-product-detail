import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { BaseLayout } from './components/Layout/BaseLayout';
import { Navigation } from './components/Layout/Navigation';

import { BrowserRouter } from 'react-router';
import { Routes } from './pages/Routes';
import { UserInfoProvider } from './providers/UserInfo';
import { ModalProvider } from './providers/Modal';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './utils/query';
import ErrorBoundary from './components/common/ErrorBoundary';

const App = () => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <UserInfoProvider>
              <ModalProvider>
                <BaseLayout header={<Navigation />}>
                  <Routes />
                </BaseLayout>
              </ModalProvider>
            </UserInfoProvider>
          </BrowserRouter>
          <ToastContainer
            position='bottom-center'
            autoClose={3000}
            hideProgressBar
            closeOnClick
            newestOnTop
          />
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
