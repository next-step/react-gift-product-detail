import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AuthContext } from '@/context/AuthContext';
import { ArrowLeft, User } from 'lucide-react';
export function Navigation() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const handleAuthClick = () => {
        // 로그인 여부에 따라 이동할 경로만 달라집니다.
        navigate(user ? '/my' : '/login');
    };
    return (_jsxs(NavBar, { children: [_jsx(BackButton, { onClick: () => navigate(-1), children: _jsx(ArrowLeft, { size: 20 }) }), _jsx(Spacer, {}), _jsx(Title, { onClick: () => navigate('/'), children: "\uC120\uBB3C\uD558\uAE30" }), _jsx(Spacer, {}), _jsx(IconButton, { onClick: handleAuthClick, children: _jsx(User, { size: 20 }) })] }));
}
const NavBar = styled.nav `
position: 'relative';
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.colors.semantic.background.default};
`;
const BackButton = styled.button(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    marginRight: theme.spacing.spacing4,
}));
const Title = styled.h1(({ theme }) => ({
    margin: 0,
    fontSize: theme.typography.title1Bold.fontSize,
    cursor: 'pointer',
}));
const Spacer = styled.div `
  flex: 1;
`;
const IconButton = styled.button(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    color: theme.colors.semantic.text.default,
}));
