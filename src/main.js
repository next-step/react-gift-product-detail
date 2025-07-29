import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from '@/App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsxs(BrowserRouter, { children: ["                     ", _jsx(AuthProvider, { children: _jsx(ThemeProvider, { theme: theme, children: _jsx(App, {}) }) })] }) }));
