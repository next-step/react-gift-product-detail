import styled from '@emotion/styled';
import { theme } from '@/styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${theme.colors.colorScale.gray[0]};
  padding-bottom: ${theme.spacing[5]};
`;

export const ProductImage = styled.img`
  width: 100%;
  height: auto;
  margin-bottom: ${theme.spacing[4]};
`;

export const ProductName = styled.div`
  ${theme.typography.title1Bold};
  margin-bottom: ${theme.spacing[2]};
  margin-left: ${theme.spacing[3]};
`;

export const ProductPrice = styled.div`
  ${theme.typography.title1Bold};
  color: ${theme.colors.semanticColor.textColor.default};
  margin-bottom: ${theme.spacing[3]};
  margin-left: ${theme.spacing[3]};
`;

export const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing[3]};
  margin: ${theme.spacing[2]} ${theme.spacing[3]};
`;

export const BrandImage = styled.img`
  width: ${theme.spacing[8]};
  height: ${theme.spacing[8]};
  border-radius: 50%;
  object-fit: cover;
`;

export const BrandName = styled.div`
  ${theme.typography.title2Regular};
`;

export const Divider = styled.div`
  width: calc(100% - ${theme.spacing[4]} * 2);
  height: 1px;
  background-color: ${theme.colors.colorScale.gray[400]};
  margin: ${theme.spacing[2]} ${theme.spacing[4]};
`;
