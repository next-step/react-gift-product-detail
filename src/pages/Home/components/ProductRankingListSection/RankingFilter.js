import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { RankingFilterTargetTypeButton } from './RankingFilterTargetTypeButton';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { RankingFilterRankTypeButton } from './RankingFilterRankTypeButton';
export const ProductRankingFilter = ({ option, onOptionChange }) => {
    const handleOptionChange = (key, value) => {
        onOptionChange({ ...option, [key]: value });
    };
    return (_jsxs(Wrapper, { children: [_jsxs(TargetTypeWrapper, { children: [_jsx(RankingFilterTargetTypeButton, { value: 'ALL', selected: option.targetType === 'ALL', onClick: () => handleOptionChange('targetType', 'ALL') }), _jsx(RankingFilterTargetTypeButton, { value: 'FEMALE', selected: option.targetType === 'FEMALE', onClick: () => handleOptionChange('targetType', 'FEMALE') }), _jsx(RankingFilterTargetTypeButton, { value: 'MALE', selected: option.targetType === 'MALE', onClick: () => handleOptionChange('targetType', 'MALE') }), _jsx(RankingFilterTargetTypeButton, { value: 'TEEN', selected: option.targetType === 'TEEN', onClick: () => handleOptionChange('targetType', 'TEEN') })] }), _jsx(HorizontalSpacing, { size: 'spacing4' }), _jsxs(RankTypeWrapper, { children: [_jsx(RankingFilterRankTypeButton, { label: '\uBC1B\uACE0 \uC2F6\uC5B4\uD55C', value: 'MANY_WISH', selected: option.rankType === 'MANY_WISH', onClick: () => handleOptionChange('rankType', 'MANY_WISH') }), _jsx(RankingFilterRankTypeButton, { label: '\uB9CE\uC774 \uC120\uBB3C\uD55C', value: 'MANY_RECEIVE', selected: option.rankType === 'MANY_RECEIVE', onClick: () => handleOptionChange('rankType', 'MANY_RECEIVE') }), _jsx(RankingFilterRankTypeButton, { label: '\uC704\uC2DC\uB85C \uBC1B\uC740', value: 'MANY_WISH_RECEIVE', selected: option.rankType === 'MANY_WISH_RECEIVE', onClick: () => handleOptionChange('rankType', 'MANY_WISH_RECEIVE') })] })] }));
};
const Wrapper = styled.div(({ theme }) => ({
    borderRadius: '1rem',
    backgroundColor: theme.colors.semantic.background.default,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
}));
const TargetTypeWrapper = styled.div(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    gap: theme.spacing.spacing2,
}));
const RankTypeWrapper = styled.div(({ theme }) => ({
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    border: '1px solid rgba(70, 132, 233, 0.1)',
    backgroundColor: theme.colors.semantic.info.background,
    borderRadius: '0.5rem',
    padding: `${theme.spacing.spacing3} ${theme.spacing.spacing4}`,
}));
