import { client } from "./client";

export interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export const getProductDetail = async (
  productId: number
): Promise<ProductDetail> => {
  const res = await client.get(`/api/products/${productId}/detail`);
  return res.data.data;
};
