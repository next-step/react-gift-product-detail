import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import HomePage from './Home/Page';
import NotFoundPage from './NotFound/Page';
import LoginPage from './Login/LoginPage';
export const Routes = () => {
    return (_jsxs(RouterRoutes, { children: [_jsx(Route, { path: ROUTE_PATH.HOME, element: _jsx(HomePage, {}) }), _jsx(Route, { path: ROUTE_PATH.LOGIN, element: _jsx(LoginPage, {}) }), _jsx(Route, { path: ROUTE_PATH.NOT_FOUND, element: _jsx(NotFoundPage, {}) })] }));
};
export const ROUTE_PATH = {
    HOME: '/',
    LOGIN: '/login',
    NOT_FOUND: '*',
};
