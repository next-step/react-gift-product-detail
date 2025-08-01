import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { test, expect } from "vitest";
import { theme } from "@/styles/theme";
import GiftsRanking from "@/components/main/GiftsRanking";
import { server } from "@/mocks/server";
import { http, HttpResponse } from "msw";
import { API_PATHS } from "@/api/apiPaths";
import { GIFT_RANKING_DATA } from "@/mocks/giftRanking.mock";
import { MemoryRouter } from "react-router";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

test("선물랭킹 섹션이 올바르게 렌더링되는지 확인", async () => {
  render(
    <TestWrapper>
      <GiftsRanking />
    </TestWrapper>,
  );

  expect(screen.getByText("실시간 급상승 선물랭킹")).toBeInTheDocument();
});

test("타겟 타입 필터를 변경했을 때 API가 올바른 파라미터로 호출되는지 확인", async () => {
  let requestUrl = "";
  server.use(
    http.get(`${BASE_URL}${API_PATHS.PRODUCTS.RANKING}`, ({ request }) => {
      requestUrl = request.url;
      return HttpResponse.json({
        data: GIFT_RANKING_DATA,
      });
    }),
  );

  render(
    <TestWrapper>
      <GiftsRanking />
    </TestWrapper>,
  );

  await waitFor(() => {
    expect(screen.getByText("5만원권")).toBeInTheDocument();
  });

  const femaleFilter = screen.getByText("여성이");
  fireEvent.click(femaleFilter);

  await waitFor(() => {
    expect(requestUrl).toContain("targetType=FEMALE");
  });
});

test("랭킹 타입 필터를 변경했을 때 API가 올바른 파라미터로 호출되는지 확인", async () => {
  let requestUrl = "";
  server.use(
    http.get(`${BASE_URL}${API_PATHS.PRODUCTS.RANKING}`, ({ request }) => {
      requestUrl = request.url;
      return HttpResponse.json({
        data: GIFT_RANKING_DATA,
      });
    }),
  );

  render(
    <TestWrapper>
      <GiftsRanking />
    </TestWrapper>,
  );

  await waitFor(() => {
    expect(screen.getByText("5만원권")).toBeInTheDocument();
  });

  const giftFilter = screen.getByText("많이 선물한");
  fireEvent.click(giftFilter);

  await waitFor(() => {
    expect(requestUrl).toContain("rankType=MANY_RECEIVE");
  });
});

test("선물 데이터가 비어있을 때 적절한 메시지가 표시되는지 확인", async () => {
  server.use(
    http.get(`${BASE_URL}${API_PATHS.PRODUCTS.RANKING}`, () => {
      return HttpResponse.json({
        data: [],
      });
    }),
  );

  render(
    <TestWrapper>
      <GiftsRanking />
    </TestWrapper>,
  );

  await waitFor(() => {
    expect(screen.getByText("상품이 없습니다.")).toBeInTheDocument();
  });
});
