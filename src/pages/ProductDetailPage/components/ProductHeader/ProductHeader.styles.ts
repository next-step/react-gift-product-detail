import styled from "@emotion/styled";

export const Divider = styled.div`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.gray[300]};
`;

export const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) =>
    theme.colors.background["background-default"]};
`;

export const ProductImage = styled.img`
  width: 100%;
  object-fit: contain;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.typography.title.title1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title1Bold.fontWeight};
  color: ${({ theme }) => theme.colors.text["text-default"]};
`;

export const BrandInfoContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  padding: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const BrandImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  object-fit: contain;
`;
