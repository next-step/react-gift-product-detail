import axios from 'axios';
import type { Product } from '@/types/product';
import type { BaseResponse } from '@/types/common';

export async function fetchProductRanking(): Promise<Product[]> {
  const res = await axios.get<BaseResponse<Product[]>>('/api/products/ranking');
  return res.data.data;
}
