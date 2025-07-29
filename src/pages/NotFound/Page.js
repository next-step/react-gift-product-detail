import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from '../Routes';
const NotFoundPage = () => {
    return (_jsxs(Wrapper, { children: [_jsx(Image, { src: 'https://gift-s.kakaocdn.net/dn/gift/webapp/images/m640/img_not_found.png', alt: 'not found' }), _jsx(HorizontalSpacing, { size: 'spacing7' }), _jsx(Typography, { as: 'h3', variant: 'title1Bold', children: "\uC798\uBABB\uB41C \uC811\uADFC\uC785\uB2C8\uB2E4." }), _jsx(HorizontalSpacing, { size: 'spacing2' }), _jsx(Typography, { as: 'p', variant: 'body1Regular', color: 'gray700', children: "\uCC3E\uC73C\uC2DC\uB294 \uD398\uC774\uC9C0\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4." }), _jsx(HorizontalSpacing, { size: 'spacing12' }), _jsx(Link, { to: ROUTE_PATH.HOME, children: _jsx(Button, { children: "\uD648\uC73C\uB85C" }) })] }));
};
export default NotFoundPage;
const Wrapper = styled.main(({ theme }) => ({
    width: '100%',
    height: 'calc(100vh - 2.75rem)',
    backgroundColor: theme.colors.scale.gray200,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '5rem 1.25rem',
}));
const Image = styled.img `
  width: 150px;
  height: 150px;
  object-fit: cover;
`;
const Button = styled.button(({ theme }) => ({
    width: '160px',
    height: '48px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.semantic.brand.kakaoYellow,
    color: theme.colors.semantic.text.default,
    ...theme.typography.body1Regular,
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.colors.semantic.brand.kakaoYellowHover,
    },
    '&:active': {
        backgroundColor: theme.colors.semantic.brand.kakaoYellowActive,
    },
}));
