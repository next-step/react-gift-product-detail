import { useParams } from 'react-router-dom';
import { useSuspenseQueryApi } from '@/apis/useQueryApi';

interface Product {
  id: number;
  name: string;
  brandName: string;
  price: {
    originalPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
}

const useProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: Product }>(
    ['product', productId || ''],
    productId ? `/products/${productId}` : '',
    { enabled: !!productId }
  );
  const product = data.data;
  return { product };
};

interface ProductDetail {
  description: string;
  announcements: {
    name: string;
    value: string;
    displayOrder: number;
  }[];
}

export const useProductDetailDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useSuspenseQueryApi<{ data: ProductDetail }>(
    ['product', productId || '', 'detail'],
    productId ? `/products/${productId}/detail` : '',
    { enabled: !!productId }
  );
  return data.data;
};

export default useProductDetail;
