import { http, HttpResponse } from "msw";

const mockRankingGifts = [
    {
        id: 1,
        name: "스트로베리 초콜릿 생크림 케이크",
        price: {
            basicPrice: 39000,
            sellingPrice: 35000,
            discountRate: 10,
        },
        imageURL: "https://example.com/cake1.jpg",
        brandInfo: {
            id: 1,
            name: "투썸플레이스",
            imageURL: "https://example.com/brand1.jpg",
        },
    },
    {
        id: 2,
        name: "바닐라 라떼",
        price: {
            basicPrice: 5000,
            sellingPrice: 4500,
            discountRate: 10,
        },
        imageURL: "https://example.com/latte.jpg",
        brandInfo: {
            id: 2,
            name: "스타벅스",
            imageURL: "https://example.com/brand2.jpg",
        },
    },
    {
        id: 3,
        name: "치킨 세트",
        price: {
            basicPrice: 25000,
            sellingPrice: 22000,
            discountRate: 12,
        },
        imageURL: "https://example.com/chicken.jpg",
        brandInfo: {
            id: 3,
            name: "BBQ",
            imageURL: "https://example.com/brand3.jpg",
        },
    },
    {
        id: 4,
        name: "피자 라지",
        price: {
            basicPrice: 30000,
            sellingPrice: 25000,
            discountRate: 17,
        },
        imageURL: "https://example.com/pizza.jpg",
        brandInfo: {
            id: 4,
            name: "도미노피자",
            imageURL: "https://example.com/brand4.jpg",
        },
    },
    {
        id: 5,
        name: "햄버거 세트",
        price: {
            basicPrice: 12000,
            sellingPrice: 10000,
            discountRate: 17,
        },
        imageURL: "https://example.com/burger.jpg",
        brandInfo: {
            id: 5,
            name: "맥도날드",
            imageURL: "https://example.com/brand5.jpg",
        },
    },
    {
        id: 6,
        name: "아이스크림 세트",
        price: {
            basicPrice: 15000,
            sellingPrice: 13000,
            discountRate: 13,
        },
        imageURL: "https://example.com/icecream.jpg",
        brandInfo: {
            id: 6,
            name: "베스킨라빈스",
            imageURL: "https://example.com/brand6.jpg",
        },
    },
    {
        id: 7,
        name: "와인 세트",
        price: {
            basicPrice: 50000,
            sellingPrice: 45000,
            discountRate: 10,
        },
        imageURL: "https://example.com/wine.jpg",
        brandInfo: {
            id: 7,
            name: "와인플러스",
            imageURL: "https://example.com/brand7.jpg",
        },
    },
    {
        id: 8,
        name: "꽃다발",
        price: {
            basicPrice: 35000,
            sellingPrice: 30000,
            discountRate: 14,
        },
        imageURL: "https://example.com/flower.jpg",
        brandInfo: {
            id: 8,
            name: "플라워샵",
            imageURL: "https://example.com/brand8.jpg",
        },
    },
];

export const giftHandlers = [
    http.get(`/products/ranking`, ({ request }) => {
        const url = new URL(request.url);
        const targetType = url.searchParams.get("targetType") || "ALL";
        const rankType = url.searchParams.get("rankType") || "MANY_WISH";

        const validTargetTypes = ["ALL", "FEMALE", "MALE", "TEEN"];
        const validRankTypes = ["MANY_WISH", "MANY_RECEIVE", "MANY_WISH_RECEIVE"];

        if (!validTargetTypes.includes(targetType) || !validRankTypes.includes(rankType)) {
            return HttpResponse.json(
                {
                    data: {
                        status: "BAD_REQUEST",
                        statusCode: 400,
                        message: "잘못된 targetType 또는 rankType입니다.",
                    },
                },
                { status: 400 },
            );
        }

        return HttpResponse.json({
            data: mockRankingGifts,
        });
    }),
];
