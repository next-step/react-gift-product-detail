import { jsx as _jsx } from "react/jsx-runtime";
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';
export function RequireAuth({ children }) {
    const { token } = useContext(AuthContext);
    const { pathname } = useLocation();
    if (!token) {
        return _jsx(Navigate, { to: `/login?redirect=${encodeURIComponent(pathname)}`, replace: true });
    }
    return children;
}
