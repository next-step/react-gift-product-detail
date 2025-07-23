/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import FilterButtons from "@/pages/homepage/RisingSection/FilterButtons";
import RisingList from "@/pages/homepage/RisingSection/RisingList";
import { Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";

export default function RisingSection() {
  return (
    <Container>
      <Title>실시간 급상승 선물 랭킹</Title>
      <FilterButtons />
      <Suspense fallback={<LoadingSpinner />}>
        <RisingList />
      </Suspense>
    </Container>
  );
}

const Container = styled.section`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.div`
  font-size: ${({ theme }) => theme.typography.title1Regular.fontSize};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.gray1000};
  margin-bottom: 30px;
  margin-top: 10px;
  margin-left: 16px;
`;
