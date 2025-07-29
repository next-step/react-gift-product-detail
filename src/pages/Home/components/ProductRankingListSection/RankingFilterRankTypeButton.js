import { jsx as _jsx } from "react/jsx-runtime";
import styled from '@emotion/styled';
export const RankingFilterRankTypeButton = ({ label, value, selected, onClick }) => {
    return (_jsx(Wrapper, { selected: selected, onClick: () => onClick(value), children: label }));
};
const Wrapper = styled.button(({ theme, selected }) => ({
    all: 'unset', // margin, padding, border, background 등 모두 초기화
    boxSizing: 'border-box',
    cursor: 'pointer',
    width: '100%',
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    ...(selected ? theme.typography.label1Bold : theme.typography.label1Regular),
    color: selected ? theme.colors.scale.blue700 : theme.colors.scale.blue500,
    transition: 'color 200ms, font-weight 200ms',
}));
