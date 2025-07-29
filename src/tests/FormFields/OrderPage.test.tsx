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
import userEvent from "@testing-library/user-event";

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => <div>Toast</div>
}));

const renderOrderPage = () => {
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
};

describe("OrderPage.tsx 페이지 테스트", () => {
  it("상품 id로 받아온 상품 정보가 렌더링됩니다.", async () => {
    // When
    renderOrderPage();

    // Then
    await waitFor(() => {
      expect(screen.getByText(PRODUCT_SUMMARY_NAME)).toBeInTheDocument();
    });
  });

  it("주문하기 버튼이 렌더링됩니다.", () => {
    // When
    renderOrderPage();

    const submitButton = screen
      .getAllByRole("button")
      .find((btn) => btn.getAttribute("type") === "submit");

    // Then
    expect(submitButton).toBeInTheDocument();
  });

  it("메세지 필드가 비어있으면 유효성 오류 메세지를 띄웁니다.", async () => {
    // Given
    renderOrderPage();
    const messageInput = screen.getByPlaceholderText("메세지를 입력해주세요.");
    const submitButton = screen
      .getAllByRole("button")
      .find((btn) => btn.getAttribute("type") === "submit");

    if (!submitButton) throw new Error("주문하기 버튼이 없습니다.");

    // When
    await userEvent.clear(messageInput);
    await userEvent.click(submitButton);

    // Then
    await waitFor(() => {
      expect(screen.queryByText("메세지를 입력해주세요.")).toBeInTheDocument();
    });

    //When
    await userEvent.type(messageInput, "테스트 메세지");
    await userEvent.click(submitButton);

    // Then
    await waitFor(() => {
      expect(
        screen.queryByText("메세지를 입력해주세요.")
      ).not.toBeInTheDocument();
    });
  });

  it("보내는 사람 필드가 비어있으면 유효성 오류 메세지를 띄웁니다.", async () => {
    // Given
    renderOrderPage();
    const senderInput = screen.getByPlaceholderText("이름을 입력하세요.");
    const submitButton = screen
      .getAllByRole("button")
      .find((btn) => btn.getAttribute("type") === "submit");

    if (!submitButton) throw new Error("주문하기 버튼이 없습니다.");

    // When
    await userEvent.clear(senderInput);
    await userEvent.click(submitButton);

    // Then
    await waitFor(() => {
      expect(screen.getByText("이름을 입력해주세요.")).toBeInTheDocument();
    });

    //When
    await userEvent.type(senderInput, "테스트 사용자");
    await userEvent.click(submitButton);

    // Then
    await waitFor(() => {
      expect(
        screen.queryByText("이름을 입력해주세요.")
      ).not.toBeInTheDocument();
    });
  });
});
