import styled from '@emotion/styled';

export const Container = styled.div`
  width: 720px;
  margin: 0 auto;
  background: #fff;
  min-height: 100vh;
  padding-bottom: 30px;
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 685px;
  padding-top: 10px;
  background: #f5f6fa;
`;

export const ProductInfo = styled.div`
  padding: 20px 16px;
`;

export const ProductName = styled.h1`
  font-size: 20px;
  font-weight: 700;
  color: #222;
  margin: 0 0 8px 0;
`;

export const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #222;
  margin-bottom: 12px;
`;

export const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
`;

export const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

export const BrandName = styled.span`
  font-size: 14px;
  color: #666;
`;

export const TabNavigation = styled.div`
  display: flex;
  border-bottom: 1px solid #eee;
  background: #fff;
`;

export const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px;
  border: none;
  background: none;
  font-size: 14px;
  font-weight: ${({ active }) => (active ? '700' : '500')};
  color: ${({ active }) => (active ? '#222' : '#666')};
  border-bottom: 2px solid ${({ active }) => (active ? '#222' : 'transparent')};
  cursor: pointer;
`;

export const TabContent = styled.div`
  padding: 20px 0;
  min-height: 300px;
  background: #fafbfc;
`;

export const ProductDescription = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #222;
  margin-bottom: 20px;
`;

export const ReviewList = styled.div`
  padding: 0 20px;
`;

export const ReviewItem = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #eee;
`;

export const ReviewAuthor = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
`;

export const ReviewContent = styled.div`
  font-size: 14px;
  line-height: 1.5;
  color: #666;
`;

export const AnnouncementList = styled.div`
  padding: 0 20px;
`;

export const AnnouncementItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
`;

export const AnnouncementName = styled.span`
  font-size: 14px;
  color: #666;
`;

export const AnnouncementValue = styled.span`
  font-size: 14px;
  color: #222;
`;

export const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #666;
  font-size: 16px;
`;

export const ErrorMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #ff3b30;
  font-size: 16px;
`;

export const WishButton = styled.button<{ isWished: boolean }>`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-360px);
  width: 80px;
  height: 56px;
  background: #f5f6fa;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 0 0 0 18px;
`;

export const WishIcon = styled.div<{ isWished: boolean }>`
  font-size: 20px;
  color: ${({ isWished }) => (isWished ? '#ff3b30' : '#666')};
  transition: all 0.2s;
`;

export const WishCount = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

export const OrderButton = styled.button`
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-280px);
  width: 640px;
  height: 56px;
  background: #ffe812;
  color: #222;
  font-size: 18px;
  font-weight: bold;
  border: none;
  border-radius: 0 0 18px 0;
  cursor: pointer;
  z-index: 100;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
`;
