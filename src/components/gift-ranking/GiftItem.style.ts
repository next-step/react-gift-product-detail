import styled from '@emotion/styled';

export const Card = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;
`;

export const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

export const RankBadge = styled.div`
  position: absolute;
  top: 4px;
  left: 4px;
  background: ${({ theme }) => theme.color.red.red600};
  color: ${({ theme }) => theme.color.gray.gray00};
  font-size: 14px;
  font-weight: bold;
  padding: 2px 6px;
  border-radius: 50%;
`;

export const Brand = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.color.gray.gray700};
`;

export const ProductName = styled.div`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.semantic.text.default};
  text-align: center;
`;

export const Price = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: ${({ theme }) => theme.color.semantic.text.default};
`;