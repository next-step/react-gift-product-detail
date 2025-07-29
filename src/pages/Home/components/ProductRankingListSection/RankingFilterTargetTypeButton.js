import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';
export const RankingFilterTargetTypeButton = ({ value, selected, onClick }) => {
    return (_jsxs(Wrapper, { onClick: () => onClick(value), children: [_jsx(Icon, { selected: selected, children: TARGET_TYPE_TEXT[value].icon }), _jsx(Typography, { as: 'p', variant: selected ? 'label1Bold' : 'label1Regular', color: selected ? 'blue700' : 'gray700', children: TARGET_TYPE_TEXT[value].label })] }));
};
const Wrapper = styled.button(({ theme }) => ({
    all: 'unset', // margin, padding, border, background 등 모두 초기화
    boxSizing: 'border-box',
    cursor: 'pointer',
    width: '3.625rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.spacing1,
}));
const TARGET_TYPE_TEXT = {
    ALL: {
        icon: 'ALL',
        label: '전체',
    },
    FEMALE: {
        icon: '👩🏻',
        label: '여성이',
    },
    MALE: {
        icon: '👨🏻',
        label: '남성이',
    },
    TEEN: {
        icon: '👦🏻',
        label: '청소년이',
    },
};
const Icon = styled.div(({ theme, selected }) => ({
    width: '2.75rem',
    height: '2.75rem',
    borderRadius: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: selected ? theme.colors.scale.gray00 : theme.colors.scale.blue400,
    ...theme.typography.subtitle2Bold,
    backgroundColor: selected
        ? theme.colors.semantic.info.default
        : theme.colors.semantic.info.background,
    transition: 'background-color 200ms',
}));
