import styled from "@emotion/styled";

export const Container = styled.header`
    width: 100%;
`;

export const ProductImage = styled.img`
    display: block;

    width: 100%;
    aspect-ratio: 1/1;
`;

export const ProductInfo = styled.article`
    display: flex;
    flex-direction: column;
    gap: 8px;

    padding: 16px;
`;

export const ProductName = styled.h1`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.size};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.weight};
`;

export const PriceInfo = styled.h1`
    font-size: ${({ theme }) => theme.typography.title.title1Bold.size};
    font-weight: ${({ theme }) => theme.typography.title.title1Bold.weight};
`;

export const BrandInfoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;

    border-top: 1px solid ${({ theme }) => theme.colors.gray.gray300};
    padding: 16px;
`;

export const BrandImage = styled.img`
    width: 32px;
    height: 32px;

    border-radius: 50%;
    overflow: hidden;
`;

export const BrandName = styled.p`
    font-size: ${({ theme }) => theme.typography.body.body1Regular.size};
    font-weight: ${({ theme }) => theme.typography.body.body1Regular.weight};
`;
