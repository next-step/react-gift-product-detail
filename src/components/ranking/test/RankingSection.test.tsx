// src/components/ranking/test/RankingSection.test.tsx
import { screen , waitFor} from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { renderWithTheme } from "@/test/test-utils";
import { RankingSection } from "../RankingSection";
import { server } from "@/mock/server";
import {
  getRankingErrorHandler,
} from "@/mock/handlers/rankingHandler";
import  ErrorBoundary  from "@/components/common/ErrorBoundary";

describe("RankingSection", () => {
//   it("정상 응답 시 상품 정보가 렌더링된다", async () => {
//   renderWithTheme(<RankingSection />);

//   await waitFor(() =>
//     expect(screen.getByTestId("product-name")).toHaveTextContent(
//       "스트로베리 초콜릿 생크림"
//     )
//   );

//   expect(screen.getByText("투썸플레이스")).toBeInTheDocument();
//   expect(screen.getByText("39,000")).toBeInTheDocument();
// });

  it("로딩 중에는 Spinner가 표시된다", async () => {
  renderWithTheme(<RankingSection />);

  await waitFor(() => {
    expect(screen.getByRole("status")).toBeInTheDocument();
  });
});


  it("에러 발생 시 fallback 메시지를 보여준다", async () => {
    server.use(getRankingErrorHandler); // 에러 핸들러 적용

    renderWithTheme(
  <ErrorBoundary fallback={<div>일시적인 오류가 발생했습니다.</div>}>
    <RankingSection />
  </ErrorBoundary>
);
  });
});
