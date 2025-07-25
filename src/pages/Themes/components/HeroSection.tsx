import Loading from "@/components/common/Loading";
import { ROUTE_PATH } from "@/components/routes/routePath";
import getThemeInfo from "@/apis/themes/getThemeInfo";
import { showFetchErrorToast } from "@/utils/showFetchToast";
import styled from "@emotion/styled";
import { useQuery } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";

const HeroSection = () => {
  const navigate = useNavigate();
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);
  const { themeId } = useParams();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["theme", themeId],
    queryFn: () => getThemeInfo({ themeId: themeId ?? "" }),
    select: (data) => data.data.data,
  });

  useEffect(() => {
    if (isError && axios.isAxiosError<ApiErrorResponse>(error)) {
      const statusCode = error.response?.data.data.statusCode as number;
      const message = error.response?.data.data.message as string;
      if (statusCode === 404) {
        showFetchErrorToast(statusCode, message, goHome);
      } else {
        showFetchErrorToast(statusCode, "잠시 후 다시 시도해주세요.", goHome);
      }
    }
  }, [isError, error, goHome]);

  if (isPending) {
    return <Loading height="127.2px" />;
  }

  if (isError || !data) {
    return null;
  }

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
