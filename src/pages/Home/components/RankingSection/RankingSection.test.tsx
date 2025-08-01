import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RankingSection from "@/pages/Home/components/RankingSection/RankingSection";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, beforeEach } from "vitest";
import { server } from "@/test/RankingSectionTest/mockServer";
import { http, HttpResponse } from "msw";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/index";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: 0,
      },
      mutations: {
        retry: false,
      },
    },
  });

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = createTestQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter>{children}</MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("RankingSection", () => {
  beforeEach(() => {
    server.resetHandlers();
  });

  test("정상 응답 시 카드 리스트가 표시된다", async () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText("부드러운 고구마 라떼 케이크")
      ).toBeInTheDocument();
    });

    expect(screen.getByText("5만원권")).toBeInTheDocument();
  });

  test("더보기 버튼 클릭 시 모든 카드가 보인다", async () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText("부드러운 고구마 라떼 케이크")
      ).toBeInTheDocument();
    });

    const moreButton = screen.getByRole("button", { name: "더보기" });
    expect(moreButton).toBeInTheDocument();

    fireEvent.click(moreButton);

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "접기" })).toBeInTheDocument();
    });
  });

  test("서버 오류 시 에러 메시지가 표시된다", async () => {
    server.use(
      http.get("*/products/ranking*", () => {
        return HttpResponse.json({ message: "서버 오류" }, { status: 500 });
      })
    );

    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText("데이터를 불러오는 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("네트워크 오류 시 에러 메시지가 표시된다", async () => {
    server.use(
      http.get("*/products/ranking*", () => {
        return HttpResponse.error();
      })
    );

    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText("데이터를 불러오는 중 오류가 발생했습니다.")
      ).toBeInTheDocument();
    });
  });

  test("상품 카드 클릭 시 상세 페이지로 이동한다", async () => {
    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(
        screen.getByText("부드러운 고구마 라떼 케이크")
      ).toBeInTheDocument();
    });

    const productCard = screen
      .getByText("부드러운 고구마 라떼 케이크")
      .closest("div");
    expect(productCard).toBeInTheDocument();

    if (productCard) {
      fireEvent.click(productCard);
    }
  });

  test("빈 데이터 시 메시지가 표시된다", async () => {
    server.use(
      http.get("*/products/ranking*", () => {
        return HttpResponse.json({ data: [] });
      })
    );

    render(
      <TestWrapper>
        <RankingSection />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText("상품이 없습니다.")).toBeInTheDocument();
    });
  });
});
