import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { RankingProductListItem } from '@/components/ProductListItem/Ranking';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
const ProductRankingList = ({ products }) => {
    const [isMore, setIsMore] = useState(false);
    const navigate = useNavigate();
    const currentList = isMore ? products : products.slice(0, 6);
    return (_jsxs(Wrapper, { children: [_jsx(List, { children: currentList.map((p, idx) => (_jsx(Item, { onClick: () => navigate(`/order/${p.id}`), children: _jsx(RankingProductListItem, { rankingIndex: idx + 1, imageSrc: p.imageURL, title: p.name, subtitle: p.brandInfo.name, amount: p.price.sellingPrice }) }, p.id))) }), products.length > 6 && (_jsxs(_Fragment, { children: [_jsx(HorizontalSpacing, { size: "spacing8" }), _jsx(ButtonWrapper, { children: _jsx(ToggleButton, { onClick: () => setIsMore(!isMore), children: _jsx(Typography, { variant: "label1Regular", color: "default", textAlign: "center", children: isMore ? '접기' : '더보기' }) }) })] }))] }));
};
export default ProductRankingList;
const Wrapper = styled.div `width: 100%;`;
const Item = styled.div `cursor: pointer;`;
const List = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: `${theme.spacing.spacing6} ${theme.spacing.spacing2}`,
}));
const ButtonWrapper = styled.div `
  display: flex;
  justify-content: center;
  width: 100%;
`;
const ToggleButton = styled.button(({ theme }) => ({
    maxWidth: '30rem',
    width: '100%',
    padding: theme.spacing.spacing3,
    borderRadius: '4px',
    border: `1px solid ${theme.colors.scale.gray400}`,
    backgroundColor: theme.colors.scale.gray00,
}));
