import styled from "@emotion/styled";
import Loading from "@/components/common/Loading";
import { Suspense } from "react";
import ThemesList from "./ThemesList";

const Themes = () => {
  return (
    <Container>
      <Title>선물 테마</Title>
      <Suspense fallback={<Loading height="250px" />}>
        <ThemesList />
      </Suspense>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.spacing1};
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
`;
const Title = styled.div`
  padding-left: ${({ theme }) => theme.spacing.spacing2};
  padding-top: 0;
  padding-right: ${({ theme }) => theme.spacing.spacing2};
  padding-bottom: ${({ theme }) => theme.spacing.spacing5};
  margin-right: auto;
  font: ${({ theme }) => theme.typography.title1Bold};
`;

export default Themes;
