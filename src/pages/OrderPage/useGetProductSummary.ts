import { useParams } from 'react-router-dom';
import { useQueryApi } from '@/apis/useQueryApi';

interface ProductSummary {
  id: number;
  name: string;
  brandName: string;
  price: number;
  imageURL: string;
}

const useGetProductSummary = () => {
  const { productId } = useParams<{ productId: string }>();
  const { data } = useQueryApi<{ data: ProductSummary }>(
    ['product', 'summary', productId || ''],
    productId ? `/products/${productId}/summary` : '',
    { enabled: !!productId, suspense: true }
  );

  const product = data?.data || null;
  return { product };
};

export default useGetProductSummary;
