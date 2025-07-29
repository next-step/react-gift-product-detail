import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
export const BaseLayout = ({ maxWidth = 720, header, children }) => {
    return (_jsxs(Wrapper, { children: [header && _jsx(FixedHeader, { maxWidth: maxWidth, children: header }), _jsx(Container, { maxWidth: maxWidth, hasHeader: !!header, children: children })] }));
};
const Wrapper = styled.div(({ theme }) => ({
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.colors.scale.gray100,
}));
const FixedHeader = styled.div(({ maxWidth, theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    margin: '0 auto',
    maxWidth: `${maxWidth}px`,
    width: '100%',
    backgroundColor: theme.colors.semantic.background.default,
    zIndex: 1000,
}));
const Container = styled.div(({ maxWidth, hasHeader, theme }) => ({
    maxWidth: `${maxWidth}px`,
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    backgroundColor: theme.colors.semantic.background.default,
    paddingTop: hasHeader ? '2.75rem' : '0',
}));
