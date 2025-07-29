import { jsx as _jsx } from "react/jsx-runtime";
import styled from '@emotion/styled';
export const HorizontalSpacing = ({ size, color = 'transparent', ...rest }) => {
    return _jsx(StyledDiv, { spacingKey: size, colorKey: color, ...rest });
};
const StyledDiv = styled.div(({ spacingKey, colorKey, theme }) => ({
    width: '100%',
    height: theme.spacing[spacingKey],
    backgroundColor: getColor(colorKey, theme),
}));
const getColor = (colorKey, theme) => {
    if (colorKey === 'transparent') {
        return 'transparent';
    }
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
    return 'transparent';
};
