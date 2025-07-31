import { describe, it, expect, beforeEach } from "vitest";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import { mockProducts } from "@/mocks/handlers";
import { theme } from "@/styles/theme";
import RisingSection from "@/pages/homepage/RisingSection/RisingSection";
import { Suspense } from "react";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallback from "@/components/common/ErrorFallback";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={["/"]}>
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Suspense fallback={<LoadingSpinner />}>{ui}</Suspense>
          </ErrorBoundary>
          <Routes>
            <Route path="/" element={<div></div>} />
            <Route path="/product/:id" element={<div>상품 상세 페이지</div>} />
          </Routes>
        </MemoryRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("RisingSection 컴포넌트", () => {
  beforeEach(() => {
    queryClient.clear();
    server.resetHandlers();
  });

  it("초기 렌더링 시 제목, 필터 버튼, 로딩 스피너가 표시된다", async () => {
    // Given
    renderWithProviders(<RisingSection />);

    // When
    // Then
    expect(screen.getByText("실시간 급상승 선물 랭킹")).toBeInTheDocument();
    expect(screen.getByText("전체")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByTestId("loading-spinner")).toBeInTheDocument()
    );
  });

  it("데이터 로딩 성공 시 상품 목록이 표시된다", async () => {
    // Given

    // When
    renderWithProviders(<RisingSection />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // Then
    const productItems = await screen.findAllByRole("listitem");
    expect(productItems).toHaveLength(mockProducts.data.length);

    expect(screen.getByText("부드러운 고구마 라떼 케이크")).toBeInTheDocument();
    expect(screen.queryByText("더보기")).not.toBeInTheDocument();
  });

  it("데이터 로딩 실패 시 에러 메시지가 표시된다", async () => {
    // Given
    server.use(
      http.get(API_ENDPOINTS.RANKING, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    // When
    renderWithProviders(<RisingSection />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // Then
    expect(await screen.findByText("에러가 발생했습니다")).toBeInTheDocument();
  });

  it("필터 버튼 클릭 시 API가 다시 호출된다", async () => {
    // Given
    let requestUrl = "";
    server.use(
      http.get(API_ENDPOINTS.RANKING, ({ request }) => {
        requestUrl = request.url;
        return HttpResponse.json(mockProducts);
      })
    );

    renderWithProviders(<RisingSection />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    // When
    fireEvent.click(screen.getByText("여성이"));

    // Then
    await waitFor(() => {
      expect(requestUrl).toContain("targetType=FEMALE");
    });

    // When
    fireEvent.click(screen.getByText("많이 선물한"));

    // Then
    await waitFor(() => {
      expect(requestUrl).toContain("rankType=MANY_RECEIVE");
    });
  });

  it("상품 클릭 시 상품 상세 페이지로 이동한다", async () => {
    // Given

    // When
    renderWithProviders(<RisingSection />);

    const productLink = await screen.findByText("부드러운 고구마 라떼 케이크");
    fireEvent.click(productLink);

    // Then
    expect(await screen.findByText("상품 상세 페이지")).toBeInTheDocument();
  });
});
