import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import Ranking from "@/pages/Gift/components/Ranking";
import { TestWrapper } from "@/tests/TestWrapper";
import theme from "@/styles/theme/theme";

// 테스트 시나리오 흐름
// Given: 사용자가 로그인 페이지에 접속했을 때 이메일, 비밀번호 입력 창과 로그인 버튼을 본다.
// When: 사용자가 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
// Then: 로그인 성공 시 메인 페이지로 이동하며 auth 정보가 저장되어야 한다.

describe("Ranking 단위 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  test("선물하기 페이지 실시간 급상승 선물 랭킹 렌더링", async () => {
    // Given: 실시간 급상승 선물 랭킹 페이지 렌더링
    render(
      <TestWrapper>
        <Ranking />
      </TestWrapper>,
    );

    // When: 실시간 급상승 선물 랭킹 페이지 렌더링

    // Then: 실시간 급상승 선물 랭킹이 렌더링되어야 한다.
    expect(screen.getByText("실시간 급상승 선물랭킹")).toBeInTheDocument();

    // 랭킹 아이템들이 렌더링되는지 확인 (여러 개이므로 getAllByTestId 사용)
    await waitFor(() => {
      const rankingItems = screen.getAllByTestId("ranking-list-item");
      expect(rankingItems.length).toBeGreaterThan(0);
    });
  });

  test("선물하기 페이지 카테고리 선택 시 카테고리 변경", () => {
    // When: 실시간 급상승 선물 랭킹 페이지 렌더링
    render(
      <TestWrapper>
        <Ranking />
      </TestWrapper>,
    );

    // 변경하고 싶은 카테고리 설정
    const targetType = screen.getByText("여성이");
    const rankType = screen.getByText("많이 선물한");

    // 카테고리 선택 확인 (선택되지 않은 상태의 색상)
    expect(targetType).toHaveStyle({ color: theme.color.gray500 });
    expect(rankType).toHaveStyle({ color: theme.color.blue400 });

    // When: 카테고리를 클릭하면
    fireEvent.click(targetType);
    fireEvent.click(rankType);

    // Then: 선택된 카테고리가 변경되어야 한다 (선택된 상태의 색상)
    expect(targetType).toHaveStyle({ color: theme.color.blue600 });
    expect(rankType).toHaveStyle({ color: theme.color.blue600 });
  });

  test("더보기 버튼 클릭 시 더보기 버튼 텍스트 변경", async () => {
    // Given: 실시간 급상승 선물 랭킹 페이지 렌더링
    render(
      <TestWrapper>
        <Ranking />
      </TestWrapper>,
    );

    // 더보기 버튼 확인
    const moreButton = await screen.findByRole("button", { name: "더보기" });

    // When: 더보기 버튼을 클릭하면
    fireEvent.click(moreButton);

    // Then: 더보기 버튼 텍스트가 변경되어야 한다
    expect(moreButton).toHaveTextContent("접기");
  });

  test("더보기 버튼 클릭 시 실시간 선물 랭킹 목록 추가 렌더링", async () => {
    // Given: 실시간 급상승 선물 랭킹 페이지 렌더링
    render(
      <TestWrapper>
        <Ranking />
      </TestWrapper>,
    );

    // 실시간 선물 랭킹 목록이 렌더링되는지 확인 ( 6개 이하 )
    await waitFor(() => {
      const rankingItems = screen.getAllByTestId("ranking-list-item");
      expect(rankingItems.length).toBeGreaterThan(0);
      expect(rankingItems.length).toBeLessThanOrEqual(6);
    });

    // 더보기 버튼 확인
    const moreButton = await screen.findByRole("button", { name: "더보기" });

    // When: 더보기 버튼을 클릭하면
    fireEvent.click(moreButton);

    // Then: 실시간 선물 랭킹 목록이 추가로 렌더링되어야 한다 ( 기본 6개 )
    expect(screen.getAllByTestId("ranking-list-item").length).toBeGreaterThan(6);
  });
});
