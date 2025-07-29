import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';
export const UnderlineInputField = ({ invalid, disabled, message, ...props }) => {
    return (_jsxs("div", { children: [_jsx(Input, { invalid: invalid, disabled: disabled, ...props }), message && (_jsxs(_Fragment, { children: [_jsx(HorizontalSpacing, { size: 'spacing1' }), _jsx(Typography, { variant: 'label2Regular', color: invalid ? 'critical' : 'gray600', children: message })] }))] }));
};
const Input = styled.input(({ theme, invalid }) => ({
    width: '100%',
    boxSizing: 'border-box',
    color: theme.colors.semantic.text.default,
    transition: 'border-color 200ms',
    borderStyle: 'solid',
    '&:focus': {
        outline: 'none',
        borderColor: theme.colors.scale.gray700,
    },
    '&:disabled': {
        color: theme.colors.scale.gray600,
        cursor: 'not-allowed',
    },
    '&::placeholder': {
        color: theme.colors.scale.gray600,
    },
    minHeight: '2.75rem',
    ...theme.typography.body1Regular,
    padding: `${theme.spacing.spacing2} 0`,
    borderWidth: '0 0 1px',
    borderColor: invalid ? theme.colors.semantic.critical.default : theme.colors.scale.gray400,
}));
