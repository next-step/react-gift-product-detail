import getThemeInfo from "@/apis/themes/getThemeInfo";
import styled from "@emotion/styled";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { QUERY_KEYS } from "@/constants/queryKeys";

const HeroSection = () => {
  const { themeId } = useParams();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.THEME_INFO(themeId ?? ""),
    queryFn: () => getThemeInfo({ themeId: themeId ?? "" }),
  });

  return (
    <Container $backgroundColor={data.backgroundColor}>
      <Name>{data.name}</Name>
      <Title>{data.title}</Title>
      <Description>{data.description}</Description>
    </Container>
  );
};

export default HeroSection;

const Container = styled.section<{ $backgroundColor: string }>`
  width: 100%;
  padding: 1.625rem 1rem 1.375rem;
  background-color: ${({ $backgroundColor }) => $backgroundColor};
  color: ${({ theme }) => theme.color.gray100};
`;
const Name = styled.p`
  font: ${({ theme }) => theme.typography.label1Bold};
`;
const Title = styled.h3`
  font: ${({ theme }) => theme.typography.title1Bold};
  margin-top: 0.5rem;
  margin-bottom: 0.2rem;
`;
const Description = styled.p`
  font: ${({ theme }) => theme.typography.body1Regular};
`;
