import { Typography } from "@/components/common/Typography";
import styled from "@emotion/styled";

export const KakaoTechCampusBanner = () => {
  return (
    <Container>
      <Typography
        as="div"
        typo="body2Regular"
        color="colorScale.gray.gray800"
        style={{ marginBottom: 4 }}
      >
        카카오테크 캠퍼스 3기
      </Typography>
      <Typography as="strong" typo="body1Bold">
        프론트엔드 2단계 과제 화이팅!
      </Typography>
    </Container>
  );
};

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.brand.kakao.yellow};
  color: ${({ theme }) => theme.colors.colorScale.gray.gray1000};
  padding: 16px;
  margin: 16px;
  border-radius: 12px;
  text-align: left;
`;
