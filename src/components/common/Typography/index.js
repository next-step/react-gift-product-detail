import { jsx as _jsx } from "react/jsx-runtime";
import styled from '@emotion/styled';
export const Typography = ({ children, variant = 'body1Regular', color = 'default', as = 'p', width, textAlign, ...rest }) => {
    return (_jsx(StyledTypography, { as: as, variant: variant, colorKey: color, width: width, textAlign: textAlign, ...rest, children: children }));
};
const StyledTypography = styled.p(({ variant, colorKey, theme, width, textAlign = 'left' }) => ({
    ...theme.typography[variant],
    color: getColor(colorKey, theme),
    margin: 0,
    width,
    textAlign,
}));
const getColor = (colorKey, theme) => {
    if (colorKey in theme.colors.scale) {
        return theme.colors.scale[colorKey];
    }
    if (colorKey in theme.colors.semantic.brand) {
        return theme.colors.semantic.brand[colorKey];
    }
    if (colorKey in theme.colors.semantic.text) {
        return theme.colors.semantic.text[colorKey];
    }
    if (colorKey === 'critical') {
        return theme.colors.semantic.critical.default;
    }
    if (colorKey === 'info') {
        return theme.colors.semantic.info.default;
    }
    return theme.colors.semantic.text.default;
};
