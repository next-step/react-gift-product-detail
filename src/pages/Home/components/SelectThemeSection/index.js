import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { useFetch } from '@/hooks/useFetch';
import { SelectThemeSectionListItem } from './ListItem';
import { Typography } from '@/components/common/Typography';
export const SelectThemeSection = () => {
    const navigate = useNavigate();
    const { data, loading, error } = useFetch({ url: '/api/themes', method: 'get' }, [] // 빈 배열: 마운트 시 한 번 실행
    );
    // 로딩 중
    if (loading) {
        return (_jsx(Section, { children: _jsx(SpinWrapper, { children: _jsx(Loader, {}) }) }));
    }
    // 에러나 빈 데이터면 렌더 하지 않음
    if (error || !data?.data.length)
        return null;
    const themes = data.data;
    return (_jsxs(Section, { children: [_jsx(TitleWrapper, { children: _jsx(Typography, { as: "h3", variant: "title1Bold", color: "default", children: "\uC120\uBB3C \uD14C\uB9C8" }) }), _jsx(Wrapper, { children: themes.map(theme => (_jsx(SelectThemeSectionListItem, { image: theme.image, label: theme.name, onClick: () => navigate(`/themes/${theme.themeId}/products`) }, theme.themeId))) })] }));
};
const spin = keyframes ` to { transform: rotate(360deg); } `;
const Loader = styled.div ` width:48px; height:48px; border:4px solid rgba(0,0,0,0.1); border-top-color:rgba(0,0,0,0.7); border-radius:50%; animation:${spin} 1s linear infinite; `;
const SpinWrapper = styled.div ` display:flex; align-items:center; justify-content:center; height:150px; `;
const Section = styled.section(({ theme }) => ({ padding: `0 ${theme.spacing.spacing2}`, }));
const TitleWrapper = styled.div(({ theme }) => ({ padding: `0 ${theme.spacing.spacing2} ${theme.spacing.spacing5}`, }));
const Wrapper = styled.div(({ theme }) => ({ width: '100%', display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: `${theme.spacing.spacing5} ${theme.spacing.spacing1}`, }));
