import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';
export const AdListSection = () => {
    return (_jsx(Section, { children: _jsxs(Wrapper, { children: [_jsx(Typography, { as: 'p', variant: 'label2Regular', color: 'gray700', children: "\uCE74\uCE74\uC624\uD14C\uD06C \uCEA0\uD37C\uC2A4 3\uAE30\uC5EC\uB7EC\uBD84" }), _jsx(Typography, { as: 'p', variant: 'label1Bold', color: 'gray900', children: "\uD504\uB860\uD2B8\uC5D4\uB4DC 2\uB2E8\uACC4 \uACFC\uC81C \uD654\uC774\uD305! \uD83C\uDF89" })] }) }));
};
const Section = styled.section(({ theme }) => ({
    padding: `0 ${theme.spacing.spacing4}`,
}));
const Wrapper = styled.div(({ theme }) => ({
    width: '100%',
    borderRadius: '1rem',
    backgroundColor: theme.colors.semantic.brand.kakaoYellow,
    padding: theme.spacing.spacing4,
    display: 'flex',
    flexDirection: 'column',
}));
