import styled from '@emotion/styled';
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
`;
export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
export const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20px;
`;
export const ProductName = styled.div`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: 8px;
  margin-left: 16px;
`;
export const ProductPrice = styled.div`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-bottom: 16px;
  margin-left: 16px;
`;
export const Line = styled.div`
  width: 100%;
  height: 2px;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
`;
export const BigLine = styled.div`
  width: 100%;
  height: 8px;
  background-color: ${({ theme }) => theme.colors.gray.gray200};
`;
export const ProductBrandInfo = styled.div`
  height: 42px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 16px;
  margin-top: 12px;
  margin-bottom: 12px;
`;
export const ProductBrandImage = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 12px;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
`;
export const ProductBrand = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  font: ${({ theme }) => theme.typography.body1Regular};
`;

export const ButtonContainer = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  width: 720px;
  height: 50px;
  background: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  z-index: 100;
`;

export const OrderButton = styled.button`
  font: ${({ theme }) => theme.typography.body1Bold};
  width: 720px;
  height: 50px;
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  border: none;
  cursor: pointer;
`;

export const TabButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.semantic.borderDefault};
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 0;
  font: ${({ theme }) => theme.typography.body1Regular};
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ active, theme }) =>
      active ? theme.colors.semantic.textDefault : 'transparent'};
  color: ${({ active, theme }) =>
    active ? theme.colors.semantic.textDefault : theme.colors.gray.gray600};
  cursor: pointer;
  transition:
    border-bottom 0.2s,
    color 0.2s;
`;

export const TabContent = styled.div`
  min-height: 200px;
  padding: 20px;
  margin-bottom: 60px;
`;

export const DescriptionWrapper = styled.div`
  width: 100%;
  max-width: 720px;
  overflow-x: auto;
  word-break: break-all;
  img {
    max-width: 100%;
    height: auto;
    display: block;
    margin: 0 auto;
  }
`;
export const Reviews = styled.div`
  width: 100%;
  max-width: 720px;
  overflow-x: auto;
  word-break: break-all;
  padding-top: 16px;
`;
export const ReviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
export const AuthorName = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
  margin-bottom: 8px;
`;
export const ReviewContent = styled.span`
  font: ${({ theme }) => theme.typography.body1Regular};
  white-space: pre-line;
`;
export const Details = styled.div`
  width: 100%;
  max-width: 720px;
  padding-top: 12px;
  overflow-x: auto;
  word-break: break-all;
`;
export const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
export const DetailName = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
  margin-bottom: 8px;
`;
export const DetailValue = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;
export const Heart = styled.button`
  width: 4rem;
  height: 50px;
  background-color: ${({ theme }) => theme.colors.semantic.backgroundDefault};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: none;
  cursor: pointer;
`;
export const HeartIcon = styled.svg<{ liked: boolean }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  transition: fill 0.2s;
  fill: ${({ liked }) => (liked ? '#FF4500' : 'none')};
  stroke: ${({ theme }) => theme.colors.semantic.textDefault};
  stroke-width: ${({ liked }) => (liked ? 0 : 1.5)};
`;
export const HeartPath = styled.path``;
export const HeartCount = styled.div`
  font: ${({ theme }) => theme.typography.label2Regular};
  font-size: 0.625rem;
`;
