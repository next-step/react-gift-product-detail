import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ReceiverForm from "@/components/order/ReceiverForm";
import type { Receiver } from "@/types/order";

describe("ReceiverForm", () => {
  const ReceiverList: Receiver[] = [
    { name: "가나다", phone: "010-1234-5678", quantity: 1 },
    { name: "마바사", phone: "010-9876-5432", quantity: 2 },
  ];

  const defaultProps = {
    receiverList: [] as Receiver[],
    setReceiverList: vi.fn(),
  };

  it("받는 사람 목록이 비어있을 때 비어있다는 메세지 표시", () => {
    // Given
    render(<ReceiverForm {...defaultProps} />);

    // Then
    expect(screen.getByText((content) => content.includes("받는 사람이 없습니다."))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("받는 사람을 추가해주세요."))).toBeInTheDocument();
  });

  it("받는 사람 목록이 있을 때 받는 사람 리스트 표로 표시", () => {
    // Given
    render(<ReceiverForm {...defaultProps} receiverList={ReceiverList} />);

    // Then
    expect(screen.getByText("이름")).toBeInTheDocument();
    expect(screen.getByText("전화번호")).toBeInTheDocument();
    expect(screen.getByText("수량")).toBeInTheDocument();

    expect(screen.getByText("가나다")).toBeInTheDocument();
    expect(screen.getByText("010-1234-5678")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();

    expect(screen.getByText("마바사")).toBeInTheDocument();
    expect(screen.getByText("010-9876-5432")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("받는 사람 목록이 있을 때 버튼이 '수정'으로 변경", () => {
    // Given
    render(<ReceiverForm {...defaultProps} receiverList={ReceiverList} />);

    // Then
    expect(screen.getByText("수정")).toBeInTheDocument();
    expect(screen.queryByText("추가")).not.toBeInTheDocument();
  });

  it("추가 버튼을 클릭하면 모달 열림", () => {
    // Given
    render(<ReceiverForm {...defaultProps} />);

    // When
    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    // Then
    expect(screen.getByTestId("receiver-modal")).toBeInTheDocument();
  });

  it("수정 버튼을 클릭하면 모달 열림", () => {
    // Given
    render(<ReceiverForm {...defaultProps} receiverList={ReceiverList} />);

    // When
    const editButton = screen.getByText("수정");
    fireEvent.click(editButton);

    // Then
    expect(screen.getByTestId("receiver-modal")).toBeInTheDocument();
  });

  it("모달에서 닫기 버튼을 클릭하면 모달 닫힘", () => {
    //Given
    render(<ReceiverForm {...defaultProps} />);

    const addButton = screen.getByText("추가");
    fireEvent.click(addButton);

    expect(screen.getByTestId("receiver-modal")).toBeInTheDocument();

    // When
    const closeButton = screen.getByText("취소");
    fireEvent.click(closeButton);

    // Then
    expect(screen.queryByTestId("receiver-modal")).not.toBeInTheDocument();
  });
});
