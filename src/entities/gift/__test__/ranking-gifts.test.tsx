import { describe, it, expect, beforeEach, vi } from "vitest";

import { RankingGifts } from "@/entities/gift/ui/RankingGifts";

import { render } from "@/__test__/test-utils";
import { screen, waitFor, fireEvent } from "@testing-library/react";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual("react-router-dom");
    return {
        ...actual,
        useNavigate: () => mockNavigate,
    };
});

describe("RankingGifts 컴포넌트", () => {
    beforeEach(() => {
        mockNavigate.mockClear();
    });

    it("선물 랭킹 데이터가 정상적으로 렌더링된다", async () => {
        render(<RankingGifts />);

        await waitFor(
            () => {
                expect(screen.getByText("스트로베리 초콜릿 생크림 케이크")).toBeInTheDocument();
            },
            { timeout: 3000 },
        );

        expect(screen.getByText("바닐라 라떼")).toBeInTheDocument();
        expect(screen.getByText("치킨 세트")).toBeInTheDocument();
        expect(screen.getByText("피자 라지")).toBeInTheDocument();
        expect(screen.getByText("햄버거 세트")).toBeInTheDocument();
        expect(screen.getByText("아이스크림 세트")).toBeInTheDocument();

        // 브랜드 정보도 표시되는지 확인
        expect(screen.getByText("투썸플레이스")).toBeInTheDocument();
        expect(screen.getByText("스타벅스")).toBeInTheDocument();
        expect(screen.getByText("BBQ")).toBeInTheDocument();
    });

    it("초기에는 6개의 상품만 표시되고 더보기 버튼이 있다", async () => {
        render(<RankingGifts />);

        await waitFor(() => {
            expect(screen.getByText("스트로베리 초콜릿 생크림 케이크")).toBeInTheDocument();
        });

        const giftCards = screen.getAllByText(
            /투썸플레이스|스타벅스|BBQ|도미노피자|맥도날드|베스킨라빈스/,
        );
        expect(giftCards).toHaveLength(6);

        expect(screen.queryByText("와인 세트")).not.toBeInTheDocument();
        expect(screen.queryByText("꽃다발")).not.toBeInTheDocument();

        expect(screen.getByText("더보기")).toBeInTheDocument();
    });

    it("더보기 버튼을 클릭하면 모든 상품이 표시된다", async () => {
        render(<RankingGifts />);

        await waitFor(() => {
            expect(screen.getByText("스트로베리 초콜릿 생크림 케이크")).toBeInTheDocument();
        });

        const moreButton = screen.getByText("더보기");
        fireEvent.click(moreButton);

        await waitFor(() => {
            expect(screen.getByText("와인 세트")).toBeInTheDocument();
            expect(screen.getByText("꽃다발")).toBeInTheDocument();
        });

        expect(screen.queryByText("더보기")).not.toBeInTheDocument();
    });

    it("선물 카드를 클릭하면 상품 상세 페이지로 이동한다", async () => {
        render(<RankingGifts />);

        await waitFor(() => {
            expect(screen.getByText("스트로베리 초콜릿 생크림 케이크")).toBeInTheDocument();
        });

        const firstGiftCard = screen.getByText("스트로베리 초콜릿 생크림 케이크").closest("div");
        if (firstGiftCard) {
            fireEvent.click(firstGiftCard);
        }

        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith("/product/1");
        });
    });

    it("상품의 가격 정보가 올바르게 표시된다", async () => {
        render(<RankingGifts />);

        await waitFor(() => {
            expect(screen.getByText("스트로베리 초콜릿 생크림 케이크")).toBeInTheDocument();
        });

        expect(screen.getByText("35000 원")).toBeInTheDocument();
    });

    it("순위가 올바르게 표시된다", async () => {
        render(<RankingGifts />);

        await waitFor(() => {
            expect(screen.getByText("스트로베리 초콜릿 생크림 케이크")).toBeInTheDocument();
        });

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("6")).toBeInTheDocument();
    });
});
