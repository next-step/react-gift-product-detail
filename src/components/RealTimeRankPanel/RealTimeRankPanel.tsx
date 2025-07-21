import { Suspense } from "react";
import RealTimeRankContents from "./RealTimeRankContents";
import { ErrorBoundary } from "react-error-boundary";
import styled from "@emotion/styled";
import theme from "@src/styles/kakaoTheme";
import PendingSpinner from "../shared/PendingSpinner";

function RealTimeRankPanel() {
  return (
    <ErrorBoundary
      fallbackRender={({ error }) => {
        return <NoProduct>목록을 불러올 수 없습니다.</NoProduct>;
      }}
    >
      <Suspense fallback={<PendingSpinner />}>
        <RealTimeRankContents />
      </Suspense>
    </ErrorBoundary>
  );
}

const NoProduct = styled.div`
  margin: 20px;
  padding: 20px;
  width: calc(100% - 2 * 20px - 2 * 20px);
  border: 1px solid ${theme.colors.gray.gray300};
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default RealTimeRankPanel;
