import styled from "@emotion/styled";

export const ProductCardContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.layout.grid.gaps.sm};
  margin-bottom: ${({ theme }) => theme.spacing[5]};
  cursor: pointer;
`;

export const RankBadge = styled.div<{ isTopThree: boolean }>`
  position: absolute;
  top: ${({ theme }) => theme.spacing[1]};
  left: ${({ theme }) => theme.spacing[1]};

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ isTopThree, theme }) =>
    isTopThree ? theme.colors.red[600] : theme.colors.gray[600]};
  color: white;

  width: ${({ theme }) => theme.spacing[4]};
  height: ${({ theme }) => theme.spacing[4]};
  padding: 2px;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
  font-size: ${({ theme }) => theme.typography.label.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label2Bold.fontWeight};
`;

export const ProductImage = styled.img`
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.borderRadius.xs};
`;

export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const ProductPrice = styled.p`
  font-size: ${({ theme }) => theme.typography.subtitle.subtitle1Bold.fontSize};
`;
