import { Typography } from "@/components/common/Typography";
import { useAuth } from "@/hooks/useAuth";
import styled from "@emotion/styled";
import { FiPlus } from "react-icons/fi";

export const FriendBanner = () => {
  const { user, isLoggedIn } = useAuth();

  return (
    <OuterWrapper>
      <InnerBox>
        <IconBox>
          <FiPlus size={20} />
        </IconBox>
        <Typography typo="body1Bold">
          {isLoggedIn && user ? `${user.name}님, ` : ""}선물할 친구를 선택해
          주세요.
        </Typography>
      </InnerBox>
    </OuterWrapper>
  );
};

const OuterWrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.colorScale.gray.gray100};
  padding: 12px 16px;
`;

const InnerBox = styled.div`
  background-color: ${({ theme }) => theme.colors.colorScale.gray.gray00};
  padding: 12px 16px;
  border-radius: 12px;
  display: flex;
  align-items: center;
`;

const IconBox = styled.div`
  background-color: ${({ theme }) => theme.colors.brand.kakao.yellow};
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;

  svg {
    color: ${({ theme }) => theme.colors.colorScale.gray.gray1000};
  }
`;
