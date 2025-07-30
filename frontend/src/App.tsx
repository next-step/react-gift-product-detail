import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Global, ThemeProvider } from '@emotion/react';
import Login from '@/pages/Login/Login';
import globalStyle from '@/styles/global';
import { theme } from '@/styles/theme';
import NotFound from '@/pages/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import My from '@/pages/My/My.tsx';
import Order from '@/pages/Order/Order.tsx';
import ThemeItems from '@/pages/ThemeItem/ThemeItems.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { QueryClientConfig } from '@tanstack/react-query';
import Home from '@/pages/Home.tsx';
import ProductDetail from '@/pages/ProductDetail/ProductDetail.tsx';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Global styles={globalStyle} />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my" element={<My />} />
            <Route path="/order/:id" element={<Order />} />
            <Route path="/themes/:id" element={<ThemeItems />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
      <ToastContainer position="top-center" />
    </QueryClientProvider>
  );
};

export default App;
