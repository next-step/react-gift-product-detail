import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
export const BaseNavigation = ({ center, left, right }) => {
    return (_jsxs(NavContainer, { children: [_jsx(LeftSection, { children: left }), _jsx(CenterSection, { children: center }), _jsx(RightSection, { children: right })] }));
};
const NavContainer = styled.nav(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    height: '2.75rem',
    paddingLeft: theme.spacing.spacing2,
    paddingRight: theme.spacing.spacing2,
    backgroundColor: theme.colors.semantic.background.default,
    gap: theme.spacing.spacing1,
}));
const LeftSection = styled.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
});
const CenterSection = styled.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});
const RightSection = styled.div({
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
});
