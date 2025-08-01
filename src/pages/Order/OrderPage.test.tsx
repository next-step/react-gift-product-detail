import { render, screen, cleanup, fireEvent, waitFor, within } from "@testing-library/react";
import OrderPage from "@/pages/Order/OrderPage";
import { TestWrapper } from "@/tests/TestWrapper";
import * as ReactRouter from "react-router-dom";
import { clearCookieValue, setCookieValue } from "@/utils/cookie";
import { AUTH_COOKIE_KEY_EMAIL, AUTH_COOKIE_KEY_NAME, AUTH_COOKIE_KEY_TOKEN } from "@/contexts/authContext";

// 테스트 시나리오 흐름
// Given: 주문하기 페이지에 접근했을 때
// When: 사용자가 상품 정보를 입력하고 주문 버튼을 클릭하면
// Then: 주문 성공 시 홈 페이지로 이동하며 주문 성공 토스트 메시지가 표시된다.

vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual("react-router-dom")),
}));

describe("OrderPage 통합 테스트", () => {
  beforeEach(() => {
    // 로그인 상태 설정
    setCookieValue(AUTH_COOKIE_KEY_EMAIL, "test@kakao.com");
    setCookieValue(AUTH_COOKIE_KEY_NAME, "test");
    setCookieValue(AUTH_COOKIE_KEY_TOKEN, "dummy-token");
  });

  afterEach(() => {
    cleanup();
  });

  vi.spyOn(ReactRouter, "useParams").mockReturnValue({ productId: "123" });

  test("주문하기 시나리오 테스트(정상 케이스)", async () => {
    // Given: 주문하기 페이지 렌더링 (로그인 상태)
    render(
      <TestWrapper>
        <OrderPage />
      </TestWrapper>,
    );

    // When: 사용자가 상품 정보를 입력하고 주문 버튼을 클릭하면
    await waitFor(() => {
      const messageInput = screen.getByPlaceholderText("메시지를 입력해주세요.");
      const ordererSection = screen.getByText("보내는 사람").parentElement;
      const ordererNameInput = within(ordererSection!).getByPlaceholderText("이름을 입력하세요.");
      const receiversAddButton = screen.getByRole("button", { name: "추가" });

      fireEvent.change(messageInput, { target: { value: "축하해요~~~" } });
      fireEvent.change(ordererNameInput, { target: { value: "홍길동1" } });

      // 받는 사람 추가 버튼 클릭
      fireEvent.click(receiversAddButton);
    });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "추가하기" })).toBeInTheDocument();
    });

    const receiverAddButton = screen.getByRole("button", { name: "추가하기" });
    fireEvent.click(receiverAddButton);

    await waitFor(() => {
      expect(screen.getByText(/^받는 사람 1$/i)).toBeInTheDocument();
    });

    const receiverSection = screen.getByText(/^받는 사람 1$/i).closest("div")!.parentElement!;
    const receiverNameInput = within(receiverSection).getByPlaceholderText("이름을 입력하세요.");
    const receiverPhoneNumberInput = within(receiverSection).getByPlaceholderText("전화번호를 입력하세요.");
    const receiverQuantityInput = within(receiverSection).getByPlaceholderText("수량을 입력하세요.");

    // 받는 사람 정보 입력
    fireEvent.change(receiverNameInput, { target: { value: "홍길동2" } });
    fireEvent.change(receiverPhoneNumberInput, { target: { value: "01012345678" } });
    fireEvent.change(receiverQuantityInput, { target: { value: "2" } });

    // 받는 사람 완료 버튼 클릭
    const receiverCompleteButton = screen.getByRole("button", { name: /완료/i });
    fireEvent.click(receiverCompleteButton);

    // 주문 버튼 클릭
    const orderButton = screen.getByRole("button", { name: /주문하기/i });
    fireEvent.click(orderButton);

    // Then: 주문 성공 시 홈 페이지로 이동하며 주문 성공 토스트 메시지가 표시된다.
    await waitFor(() => {
      expect(screen.getByText("주문에 성공했습니다.")).toBeInTheDocument();
    });
  });

  test("주문하기 시나리오 테스트(인증 토큰이 없는 경우)", async () => {
    // Given: 주문하기 페이지 렌더링(인증 토큰이 없는 경우)
    clearCookieValue(AUTH_COOKIE_KEY_TOKEN);

    render(
      <TestWrapper>
        <OrderPage />
      </TestWrapper>,
    );

    // When: 사용자가 상품 정보를 입력하고 주문 버튼을 클릭하면
    await waitFor(() => {
      const messageInput = screen.getByPlaceholderText("메시지를 입력해주세요.");
      const ordererSection = screen.getByText("보내는 사람").parentElement;
      const ordererNameInput = within(ordererSection!).getByPlaceholderText("이름을 입력하세요.");
      const receiversAddButton = screen.getByRole("button", { name: "추가" });

      fireEvent.change(messageInput, { target: { value: "축하해요~~~" } });
      fireEvent.change(ordererNameInput, { target: { value: "홍길동1" } });

      // 받는 사람 추가 버튼 클릭
      fireEvent.click(receiversAddButton);
    });
    await waitFor(() => {
      expect(screen.getByRole("button", { name: "추가하기" })).toBeInTheDocument();
    });

    const receiverAddButton = screen.getByRole("button", { name: "추가하기" });
    fireEvent.click(receiverAddButton);

    await waitFor(() => {
      expect(screen.getByText(/^받는 사람 1$/i)).toBeInTheDocument();
    });

    const receiverSection = screen.getByText(/^받는 사람 1$/i).closest("div")!.parentElement!;
    const receiverNameInput = within(receiverSection).getByPlaceholderText("이름을 입력하세요.");
    const receiverPhoneNumberInput = within(receiverSection).getByPlaceholderText("전화번호를 입력하세요.");
    const receiverQuantityInput = within(receiverSection).getByPlaceholderText("수량을 입력하세요.");

    // 받는 사람 정보 입력
    fireEvent.change(receiverNameInput, { target: { value: "홍길동2" } });
    fireEvent.change(receiverPhoneNumberInput, { target: { value: "01012345678" } });
    fireEvent.change(receiverQuantityInput, { target: { value: "2" } });

    // 받는 사람 완료 버튼 클릭
    const receiverCompleteButton = screen.getByRole("button", { name: /완료/i });
    fireEvent.click(receiverCompleteButton);

    // 주문 버튼 클릭
    const orderButton = screen.getByRole("button", { name: /주문하기/i });
    fireEvent.click(orderButton);

    // Then: 주문 실패 후 토스트 메시지와 로그인 페이지로 이동한다.
    await waitFor(() => {
      expect(screen.getByText("로그인이 필요합니다.")).toBeInTheDocument();
      expect(window.location.pathname).toBe("/login");
    });
  });
});
