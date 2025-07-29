import { jsx as _jsx } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { BaseNavigation } from './BaseNavigation';
import logo from '@/resources/images/navigation_logo.webp';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, UserRound } from 'lucide-react';
import { ROUTE_PATH } from '@/pages/Routes';
export const Navigation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleBackClick = () => {
        navigate(-1);
    };
    const isLoginPage = location.pathname === ROUTE_PATH.LOGIN;
    return (_jsx(BaseNavigation, { left: _jsx("button", { onClick: handleBackClick, children: _jsx(ChevronLeft, { size: 28, strokeWidth: 1.8 }) }), center: _jsx(Link, { to: ROUTE_PATH.HOME, children: _jsx(Logo, { src: logo, alt: '\uCE74\uCE74\uC624 \uC120\uBB3C\uD558\uAE30 \uB85C\uACE0' }) }), right: isLoginPage ? (_jsx(UserRound, {})) : (_jsx(Link, { to: `${ROUTE_PATH.LOGIN}?=${encodeURIComponent(window.location.pathname)}`, children: _jsx(UserRound, {}) })) }));
};
const Logo = styled.img(() => ({
    height: '2.75rem',
}));
