import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import MockApp from "../MockApp";
import OrderPage from "@src/pages/OrderPage";
import { PATH } from "@src/router/Router";
import { Route, Routes } from "react-router-dom";
import {
  PRODUCT_SUMMARY_ID,
  PRODUCT_SUMMARY_NAME
} from "@src/mock/msw/entries/productSummary";

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => <div>Toast</div>
}));

describe("OrderPage.tsx 페이지 테스트", () => {
  it("상품 id로 받아온 상품 정보가 렌더링 됩니다.", async () => {
    render(
      <MockApp
        children={
          <Routes>
            <Route path="/order/:id" element={<OrderPage />} />
          </Routes>
        }
        initialEntries={[PATH.ORDER + `/${PRODUCT_SUMMARY_ID}`]}
      />
    );

    await waitFor(() => {
      expect(screen.getByText(PRODUCT_SUMMARY_NAME)).toBeInTheDocument();
    });
  });
});
