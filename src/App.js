import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import ThemeProductsPage from '@/pages/ThemeProductsPage';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
import { BaseLayout } from './components/Layout/BaseLayout';
import { Navigation } from './components/Layout/Navigation';
import HomePage from '@/pages/Home/Page';
import LoginPage from '@/pages/Login/LoginPage';
import OrderPage from '@/pages/Home/OrderPage';
import MyPage from '@/pages/MyPage/MyPage';
import NotFound from '@/pages/NotFound/Page';
import { RequireAuth } from '@/components/RequireAuth';
// React Toastify 스타일 & 컨테이너
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
const App = () => {
    return (_jsxs(ThemeProvider, { theme: theme, children: [_jsx(BaseLayout, { header: _jsx(Navigation, {}), children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "themes/:themeId/products", element: _jsx(ThemeProductsPage, {}) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/order/:id", element: _jsx(OrderPage, {}) }), _jsx(Route, { path: "/my", element: _jsx(RequireAuth, { children: _jsx(MyPage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(NotFound, {}) })] }) }), _jsx(ToastContainer, { position: "top-right", autoClose: 3000, hideProgressBar: false, newestOnTop: false, closeOnClick: true, rtl: false, pauseOnFocusLoss: true, draggable: true, pauseOnHover: true })] }));
};
export default App;
