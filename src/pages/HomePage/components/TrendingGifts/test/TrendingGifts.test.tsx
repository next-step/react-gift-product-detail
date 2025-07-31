// src/pages/HomePage/components/TrendingGifts/__tests__/TrendingGifts.test.tsx
import "@/setupTests"; // setupTests.ts 에서 server.listen(), jest-dom 등 세팅
import { renderWithTheme, server } from "@/setupTests";
import { describe, beforeEach, it, expect } from "vitest";
import TrendingGifts from "../TrendingGifts";
import { screen, within, fireEvent, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { trendingGiftsMockData } from "@/data/trendingGfitsMockData";

describe("실시간 급상승 선물랭킹", () => {
  describe("UI", () => {
    beforeEach(() => {
      server.use(
        http.get("/api/products/ranking", async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          return HttpResponse.json({ data: trendingGiftsMockData });
        })
      );

      renderWithTheme(<TrendingGifts />);
    });

    it("상단 탭 UI 가 표시된다", () => {
      // given
      // when
      const mainTab = screen.getByTestId("main-tab");

      // then
      expect(mainTab).toBeInTheDocument();
    });

    it("하단 탭 UI 가  표시된다", () => {
      // given
      // when
      const subTab = screen.getByTestId("sub-tab");

      // then
      expect(subTab).toBeInTheDocument();
    });

    it("로딩 후 그리드 UI 가 표시된다", async () => {
      // given
      const loading = screen.getByTestId("loading");

      expect(loading).toBeInTheDocument();

      await waitFor(() => {
        expect(loading).not.toBeInTheDocument();
      });

      // when
      const grid = await screen.findByTestId("grid");

      // then
      expect(grid).toBeInTheDocument();
    });

    it("카드 정보 UI 가 표시된다", async () => {
      const grid = await screen.findByTestId("grid");
      const cards = within(grid).getAllByTestId("grid-card");
      expect(cards.length).toBeGreaterThan(0);

      const first = cards[0];
      expect(within(first).getByTestId("product-image")).toBeInTheDocument();
      expect(within(first).getByTestId("brand-name")).toBeInTheDocument();
      expect(within(first).getByTestId("product-name")).toBeInTheDocument();
      expect(within(first).getByTestId("product-price")).toBeInTheDocument();
    });
  });

  describe("빈 상품", () => {
    beforeEach(() => {
      server.use(
        http.get("/api/products/ranking", () => HttpResponse.json({ data: [] }))
      );
      renderWithTheme(<TrendingGifts />);
    });

    it("상품이 없을 시, 빈 상태 UI 가 표시된다", async () => {
      // given
      // when
      const emptyMessage = await screen.findByTestId("loading");

      // then
      expect(emptyMessage).toBeInTheDocument();
    });
  });

  describe("에러 상태", () => {
    beforeEach(() => {
      server.use(http.get("/api/products/ranking", () => HttpResponse.error()));

      renderWithTheme(<TrendingGifts />);
    });

    it("에러 상태 시, 에러 UI 가 표시된다", async () => {
      // given
      // when
      const errorMessage = await screen.findByTestId("error-message");

      // then
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe("탭 별 API 호출", () => {
    let targetType: string | null = null;
    let rankType: string | null = null;

    beforeEach(() => {
      server.use(
        http.get("/api/products/ranking", async ({ request }) => {
          const url = new URL(request.url.toString());
          targetType = url.searchParams.get("targetType");
          rankType = url.searchParams.get("rankType");

          return HttpResponse.json({ data: trendingGiftsMockData });
        })
      );

      renderWithTheme(<TrendingGifts />);
    });

    it("초기 진입 시 기본 탭에 대한 API가 호출된다", async () => {
      // given
      // when
      await screen.findByTestId("grid");

      // then
      expect(targetType).toBe("ALL");
      expect(rankType).toBe("MANY_WISH");
    });

    it("탭 클릭 시 해당 탭에 대한 API가 호출된다", async () => {
      // given
      const mainButtons = within(screen.getByTestId("main-tab")).getAllByRole(
        "button"
      );
      const subButtons = within(screen.getByTestId("sub-tab")).getAllByRole(
        "button"
      );

      // when
      fireEvent.click(mainButtons[1]);
      fireEvent.click(subButtons[1]);

      await screen.findByTestId("grid");

      // then
      expect(targetType).toBe("FEMALE");
      expect(rankType).toBe("MANY_RECEIVE");
    });
  });
});
