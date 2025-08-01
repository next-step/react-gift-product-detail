import type { ProductBasicInfo } from './productDTO';
export type Themetype = {
  themeId: number;
  name: string;
  image: string;
};

export interface ThemeInfoResponseDTO {
  backgroundColor: string;
  description: string;
  name: string;
  themeId: number;
  title: string;
}

export interface ThemeProductsResponseDTO {
  list: ProductBasicInfo[];
  cursor: number;
  hasMoreList: boolean;
}
