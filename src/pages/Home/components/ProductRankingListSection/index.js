import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Typography } from '@/components/common/Typography';
import { ProductRankingFilter } from './RankingFilter';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import ProductRankingList from './ProductRankingList';
const ProductRankingListSection = () => {
    // 필터 상태 관리
    const [filterOption, setFilterOption] = useState({
        targetType: 'ALL',
        rankType: 'MANY_WISH',
    });
    // API 데이터 & 상태
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    // 랭킹 조회 함수
    const fetchRanking = () => {
        setLoading(true);
        setError(false);
        axios
            .get('/api/products/ranking', { params: filterOption })
            .then((res) => {
            setProducts(res.data.data ?? []);
            setLoading(false);
        })
            .catch((err) => {
            console.error('랭킹 조회 실패:', err);
            setError(true);
            setLoading(false);
        });
    };
    // 필터가 바뀔 때마다 재조회
    useEffect(fetchRanking, [filterOption]);
    return (_jsxs(Section, { children: [_jsx(Typography, { as: "h3", variant: "title1Bold", color: "default", children: "\uC2E4\uC2DC\uAC04 \uAE09\uC0C1\uC2B9 \uC120\uBB3C\uB7AD\uD0B9" }), _jsx(HorizontalSpacing, { size: "spacing5" }), _jsx(ProductRankingFilter, { option: filterOption, onOptionChange: opt => setFilterOption(opt) }), _jsx(HorizontalSpacing, { size: "spacing4" }), loading && (_jsx(Typography, { as: "p", variant: "body1Regular", color: "default", children: "\uB85C\uB529 \uC911\u2026" })), !loading && error && (_jsx(Typography, { as: "p", variant: "body1Regular", color: "default", children: "\uB7AD\uD0B9\uC744 \uBD88\uB7EC\uC624\uB294 \uC911 \uC624\uB958\uAC00 \uBC1C\uC0DD\uD588\uC2B5\uB2C8\uB2E4." })), !loading && !error && products.length === 0 && (_jsx(Typography, { as: "p", variant: "body1Regular", color: "default", children: "\uD604\uC7AC \uAE09\uC0C1\uC2B9 \uC120\uBB3C\uC774 \uC5C6\uC2B5\uB2C8\uB2E4." })), !loading && !error && products.length > 0 && (_jsx(ProductRankingList, { products: products }))] }));
};
export default ProductRankingListSection;
const Section = styled.section(({ theme }) => ({
    padding: `0 ${theme.spacing.spacing4}`,
    width: '100%',
}));
