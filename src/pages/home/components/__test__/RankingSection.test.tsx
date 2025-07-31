import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";
import { Suspense } from "react";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import { RankingSection } from "../RankingSection";
import { Spinner } from "@/components/common/Spinner";
import { AuthProvider } from "@/contexts/AuthProvider";

const renderWithProviders = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <AuthProvider>
            <Suspense fallback={<Spinner />}>{ui}</Suspense>
          </AuthProvider>
        </MemoryRouter>
      </QueryClientProvider>
    </ThemeProvider>,
  );
};

describe("<RankingSection />", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("초기 렌더링 테스트", async () => {
    renderWithProviders(<RankingSection />);

    expect(screen.getByText("로딩중...")).toBeInTheDocument();

    const firstItem = await screen.findByText("스트로베리 요거트 생크림");
    expect(firstItem).toBeInTheDocument();
    expect(screen.getByText("실시간 급상승 선물랭킹")).toBeInTheDocument();

    expect(screen.queryByText("여성을 위한 립스틱")).not.toBeInTheDocument();
    expect(screen.queryByText("5만원권")).not.toBeInTheDocument();
  });

  it("'남성', '위시로 받은' 필터를 적용하면 테스트", async () => {
    const user = userEvent.setup();

    renderWithProviders(<RankingSection />);
    await screen.findByText("스트로베리 요거트 생크림");

    await user.click(screen.getByRole("button", { name: "남성" }));
    await user.click(screen.getByRole("button", { name: "위시로 받은" }));

    const result = await screen.findByText("행운 가득 복 케이크");
    expect(result).toBeInTheDocument();

    expect(screen.queryByText("여성을 위한 립스틱")).not.toBeInTheDocument();
    expect(screen.queryByText("5만원권")).not.toBeInTheDocument();
  });

  it("'더보기' '접기' 버튼 테스트", async () => {
    const user = userEvent.setup();
    renderWithProviders(<RankingSection />);

    await screen.findByText(
      "마이넘버원 초코생크림 조각케이크+마이넘버원 고구마 조각케이크 +아이스 아메리카노 2잔",
    );
    expect(
      screen.queryByText("위시캣 아이냥 케이크(픽업가능)"),
    ).not.toBeInTheDocument();

    const moreButton = screen.getByRole("button", { name: "더보기" });
    await user.click(moreButton);
    const expandedItem =
      await screen.findByText("위시캣 아이냥 케이크(픽업가능)");
    expect(expandedItem).toBeInTheDocument();

    const collapseButton = screen.getByRole("button", { name: "접기" });
    await user.click(collapseButton);
    await waitFor(() => {
      expect(
        screen.queryByText("위시캣 아이냥 케이크(픽업가능)"),
      ).not.toBeInTheDocument();
    });
  });
});
