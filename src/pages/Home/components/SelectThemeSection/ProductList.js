import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { ProductCard } from './ProductCard';
import { useFetchThemeProducts } from '@/hooks/useFetchThemeProducts';
export const ProductList = ({ themeId }) => {
    const { products, hasMore, loading, observerRef } = useFetchThemeProducts(themeId);
    if (!loading && products.length === 0) {
        return (_jsx(Section, { children: _jsx(Typography, { children: "\uB4F1\uB85D\uB41C \uC0C1\uD488\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." }) }));
    }
    return (_jsxs(_Fragment, { children: [_jsx(Grid, { children: products.map(p => (_jsx(ProductCard, { image: p.imageURL, name: p.name, price: p.price.sellingPrice, brandName: p.brandInfo.name }, p.id))) }), _jsx("div", { ref: observerRef }), loading && (_jsx(Section, { children: _jsx(Typography, { children: "\uB85C\uB529 \uC911\u2026" }) }))] }));
};
const Grid = styled.div(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: theme.spacing.spacing3,
}));
const Section = styled.section(({ theme }) => ({
    padding: `${theme.spacing.spacing4} ${theme.spacing.spacing2}`,
    textAlign: 'center',
}));
