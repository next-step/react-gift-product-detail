/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";

export const Wrapper = styled.div`
  padding-bottom: 90px;
`;

export const Image = styled.img`
  width: 100%;
  height: auto;
`;

export const Info = styled.div`
  padding: 20px;
`;

export const Brand = styled.div`
  font-size: 14px;
  color: #666;
`;

export const Name = styled.h2`
  font-size: 18px;
  margin: 4px 0;
`;

export const Price = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
export const BrandInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing3};

  padding: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) =>
  theme.spacing.spacing4};

  border-top: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-bottom: 10px solid ${({ theme }) => theme.colors.borderDefault};

  img {
    width: 35px;
    height: 35px;
    border-radius: 50%;
  }

  span {
    font-size: ${({ theme }) => theme.typography.subtitle1Regular};
    color: ${({ theme }) => theme.colors.gray1000};
  }
`;



export const StickyFooter = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill={filled ? "#FF5A5A" : "none"}
    stroke={filled ? "#FF5A5A" : "#999"}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export const FooterInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.spacing3};
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
`;

export const WishBox = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: none;
  border: none;
  cursor: pointer;

  .icon {
    font-size: 20px;
  }

  .count {
    font-size: ${({ theme }) => theme.typography.title1Regular};
    color: ${({ theme }) => theme.colors.textDefault};
    margin-top: 2px;
  }
`;

export const OrderButton = styled.button`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3};
  background-color: ${({ theme }) => theme.colors.kakaoYellow};
  color: ${({ theme }) => theme.colors.textDefault};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  border-radius: 2px;
`;
