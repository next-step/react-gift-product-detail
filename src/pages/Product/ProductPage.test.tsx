import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import ProductPage from "@/pages/Product/ProductPage";
import { TestWrapper } from "@/tests/TestWrapper";
import * as ReactRouter from "react-router-dom";
import theme from "@/styles/theme/theme";

// 테스트 시나리오 흐름
// Given: 제품 상세 페이지(로그인 상태)에 접근하고
// When: 사용자가 주문하기 버튼을 클릭하면
// Then: 주문 성공 시 홈 페이지로 이동하며 주문 성공 토스트 메시지가 표시된다.

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
}));

describe("ProductPage 통합 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  vi.spyOn(ReactRouter, "useParams").mockReturnValue({ productId: "123" });

  test("제품 상세 페이지에서 주문하기 버튼 클릭 시 주문하기 페이지로 이동", async () => {
    // Given: 제품 상세 페이지 접근
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // When: 주문하기 버튼을 클릭하면
    await waitFor(() => {
      const orderButton = screen.getByRole("link", { name: "주문하기" });
      fireEvent.click(orderButton);
    });

    // Then: 주문하기 버튼을 클릭하면 주문하기 페이지로 이동한다.
    await waitFor(() => {
      expect(window.location.pathname).toBe("/order/123");
    });
  });
});

describe("ProductPage 단위 테스트", () => {
  afterEach(() => {
    cleanup();
  });

  vi.spyOn(ReactRouter, "useParams").mockReturnValue({ productId: "123" });

  test("제품 상세 페이지 렌더링", async () => {
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(screen.getByText("주문하기")).toBeInTheDocument();
    });
  });

  test("제품 상세 페이지 탭 전환", async () => {
    // Given: 제품 상세 페이지 접근
    render(
      <TestWrapper>
        <ProductPage />
      </TestWrapper>,
    );

    // When: 사용자가 선물후기 탭을 클릭하면
    await waitFor(() => {
      const reviewTab = screen.getByRole("button", { name: "선물후기" });
      // 선물후기 탭이 비활성화된 상태
      expect(reviewTab).not.toHaveStyle({color: theme.color.gray1000});

      // 선물후기 탭을 클릭하면
      fireEvent.click(reviewTab);

      // Then: 선물후기 탭이 활성화된다.
      expect(reviewTab).toHaveStyle({color: theme.color.gray1000});
    });
  });
});
