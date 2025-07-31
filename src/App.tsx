import { Global } from '@emotion/react';
import { globalStyle } from '@/styles/GlobalStyle';
import { RouterProvider } from 'react-router-dom';
import { UserProvider } from '@/contexts/UserContext';
import Router from '@/routes/Router';
import { ToastContainer } from 'react-toastify';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const App = () => {
  return (
    <>
      <Global styles={globalStyle} />
      <UserProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={Router} />
        </QueryClientProvider>
        <RouterProvider router={Router} />
      </UserProvider>
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
      />
    </>
  );
};

export default App;
