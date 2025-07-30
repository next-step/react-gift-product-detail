import styled from '@emotion/styled';
export const MainWrapper = styled.div`
  max-width: 720px;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  background-color: rgba(255, 18, 18, 1);
  padding-top: 2.75rem;
`;
export const MainSection = styled.section``;
export const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: rgb(243, 244, 245);
`;
export const DetailSection = styled.section`
  width: 100%;
`;
export const GrayLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgb(238, 239, 241);
`;
export const BrandSection = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
`;
export const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;
export const DetailButton = styled.button`
  position: relative;
  padding: 16px 20px;
  background: none;
  border: none;
  cursor: pointer;
  opacity: 1;
  transition: 0.2s;
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex: 1 1 0%;
`;

export const BottemLine = styled.div`
  position: absolute;
  bottom: -1px;
  left: 0px;
  right: 0px;
  height: 2px;
  background-color: rgb(42, 48, 56);
`;
