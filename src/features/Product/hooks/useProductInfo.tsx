import { useSuspenseQuery } from '@tanstack/react-query';
import { apiGet } from '@/lib/axios';

export interface ProductPrice {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

export interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export interface ProductInfo {
  id: number;
  name: string;
  price: ProductPrice;
  imageURL: string;
  brandInfo: BrandInfo;
}

const fetchProductInfo = async (
  productId: number | null
): Promise<ProductInfo | null> => {
  const res = await apiGet<ProductInfo>(`/products/${productId}`);
  return res;
};

const useProductInfo = (productId: number | null) => {
  if (!productId) return null;

  const { data: ProductInfo } = useSuspenseQuery<ProductInfo | null>({
    queryKey: ['productId', productId],
    queryFn: () => fetchProductInfo(productId),
  });

  return ProductInfo;
};

export default useProductInfo;
