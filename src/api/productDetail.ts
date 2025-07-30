import { client } from "./client";

export interface Announcement {
  name: string;
  value: string;
  displayOrder: number;
}

export interface ProductDetail {
  description: string;
  announcements: Announcement[];
}

export const getProductDetail = async (
  productId: number
): Promise<ProductDetail> => {
  const res = await client.get(`/api/products/${productId}/detail`);
  return res.data.data;
};
