import styled from "@emotion/styled";

export const EventBannerSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-direction: column;

  width: 95%;
  height: 4rem;

  box-sizing: border-box;
  padding: ${({ theme }) => theme.spacing[4]};
  gap: 5px;

  background-color: ${({ theme }) => theme.colors.brand.kakaoYellow};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;
