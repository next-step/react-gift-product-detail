import type { RankingProduct } from "@/entities/product";

export interface Theme {
    themeId: number,
    name: string,
    image: string,
}

export interface ThemeInfo {
    themeId: number;
    name: string;
    title: string;
    description: string;
    backgroundColor: string;
}

export interface ThemeProductsResponse {
    list: RankingProduct[];
    cursor: number;
    hasMoreList: boolean;
}